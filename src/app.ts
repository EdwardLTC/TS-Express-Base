import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import mongoose, { ConnectOptions, connect, set } from 'mongoose';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from './database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import path from 'path';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public host: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.host = this.env === 'development' ? `http://localhost:${this.port}` : 'https://edward.com';

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} ========`);
      logger.info(`🚀 App listening on ${this.host}`);
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
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  private initializeRoutes(routes: Routes[]) {
    logger.info(`🚀 Initializing routes`);
    const mappedAPI = [];
    routes.forEach(route => {
      this.app.use('/api', route.router);
      route.router.stack.map(stack =>
        mappedAPI.push({
          path: `${this.host}/api${stack.route.path}`,
          method: Object.keys(stack.route.methods)[0].toUpperCase(),
        }),
      );
    });
    console.table(mappedAPI);
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
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    logger.info(`✔️  Swagger docs: http://localhost:${this.port}/api-docs`);
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
