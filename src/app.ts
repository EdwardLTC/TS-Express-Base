import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoose, { ConnectOptions, connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, ORIGIN, CREDENTIALS, DOMAIN } from '@config';
import { dbConnection } from './database';
import { Routes } from '@interfaces/base/routes.interface';
import { ErrorMiddleware } from '@/middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import path from 'path';
import { Request } from 'express';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public domain: string;

  constructor(apis: Routes[], cpanel?: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.domain = DOMAIN || 'localhost';

    this.initializeMiddlewares();
    this.initializeRoutes(apis);
    this.initializeCPanel(cpanel);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on ${this.domain}`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }
    mongoose.set('strictQuery', true);
    logger.info(`🚀 Connecting to database`);
    await connect(dbConnection.url, dbConnection.options as ConnectOptions)
      .then(() => {
        logger.info(`✔️  Connected to database`);
      })
      .catch(error => {
        logger.error(`❌  Database connection error: ${error.message}`);
        process.exit(1);
      });
  }

  private initializeMiddlewares() {
    //write header to stream
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
      stream.write(`IP: ${ip} - Menthod: ${req.method} - URL: ${req.url} -User Agent: ${req.headers['user-agent']} \n`);
      next();
    });

    // this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '../public')));
    this.app.set('view engine', 'hbs');
    this.app.set('views', path.join(__dirname, '../views'));
  }

  private initializeRoutes(routes: Routes[]) {
    logger.info(`🚀 Initializing routes`);
    const mappedAPI = [];
    routes.forEach(route => {
      this.app.use('/api', route.router);
      route.router.stack.map(stack =>
        mappedAPI.push({
          path: `${this.domain}/api${stack.route.path}`,
          method: Object.keys(stack.route.methods)[0].toUpperCase(),
        }),
      );
    });
    console.table(mappedAPI);
  }

  private initializeCPanel(cpanel: Routes[]) {
    if (!cpanel) return;
    logger.info(`🚀 Initializing CPanel`);
    const mappedCpanel = [];
    cpanel.forEach(route => {
      this.app.use('/cpanel', route.router);
      route.router.stack.map(stack =>
        mappedCpanel.push({
          path: `${this.domain}/cpanel${stack.route.path}`,
        }),
      );
    });
    console.table(mappedCpanel);
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'Kabar API',
          version: '1.0.0',
          description: 'Edward',
        },
        securityDefinitions: {
          bearerAuth: {
            type: 'apiKey',
            scheme: 'bearer',
            name: 'Authorization',
            in: 'header',
          },
        },
        basePath: '/api',
        host: this.domain,
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    logger.info(`✔️  Swagger docs: ${this.domain}/api-docs`);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
