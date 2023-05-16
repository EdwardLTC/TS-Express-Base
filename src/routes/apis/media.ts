import { MediaController } from '@/controllers/apis/media';
import { Routes } from '@/interfaces/base/routes.interface';
import { CheckToken } from '@/middlewares/auth.middleware';
import { ImageMiddleware } from '@/middlewares/image.middeware';
import { Router } from 'express';

export class MediaRoute implements Routes {
  public path = '/media';
  public router = Router();
  public media = new MediaController().getInstance();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/upload`, [CheckToken(), ImageMiddleware()], this.media.upload);
  }
}
