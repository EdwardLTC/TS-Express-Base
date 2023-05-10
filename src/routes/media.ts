import { AuthController } from '@/controllers/auth';
import { MediaController } from '@/controllers/media';
import { Routes } from '@/interfaces/routes.interface';
import { ImageMiddleware } from '@/middlewares/image.middeware';
import { Router } from 'express';

export class MediaRoute implements Routes {
  public path = '/media';
  public router = Router();
  public media = new MediaController();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, [this.auth.checkToken, ImageMiddleware], this.media.upload);
  }
}
