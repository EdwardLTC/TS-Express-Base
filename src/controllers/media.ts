import { HttpException } from '@/httpModals';
import { MediaService } from '@/services/media';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class MediaController {
  public media = Container.get(MediaService);
  public upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.file.path = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
      if (!req.file) {
        next(new HttpException({ statusCode: 400, message: 'Missing file' }));
      }
      const media = await this.media.insertMedia(req.file);
      res.status(media.statusCode).json(media);
    } catch (error) {
      next(new HttpException(error));
    }
  };
}
