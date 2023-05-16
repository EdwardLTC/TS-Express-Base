import { AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_CONTAINER_NAME } from '@/config';
import { HttpException } from '@/httpModals';
import { MediaService } from '@/services/apis/media';
import { slugify } from '@/utils/slugify';
import { BlobServiceClient } from '@azure/storage-blob';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class MediaController {
  //singleton
  private static instance: MediaController;
  public getInstance(): MediaController {
    if (!MediaController.instance) {
      MediaController.instance = new MediaController();
    }
    return MediaController.instance;
  }

  public media = Container.get(MediaService);
  public upload = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploadBlobResponse = await this.uploadImageToAzure(req.file, next);
      if (!uploadBlobResponse) {
        next(new HttpException({ statusCode: 400, message: 'Missing file' }));
      }
      const media = await this.media.insertMedia(uploadBlobResponse);
      res.status(media.statusCode).json(media);
    } catch (error) {
      next(new HttpException(error));
    }
  };

  private uploadImageToAzure = async (file: Express.Multer.File, next: NextFunction): Promise<Express.Multer.File> => {
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
      const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
      const fileOriginalName = slugify(file.originalname);
      const blobName = `${new Date().getTime()}-${fileOriginalName}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.upload(file.buffer, file.buffer.length, {
        blobHTTPHeaders: { blobContentType: file.mimetype },
      });
      //image url
      const imageUrl = `https://edwardltc.blob.core.windows.net/upload/${blobName}`;

      return { ...file, path: imageUrl };
    } catch (error) {
      next(new HttpException({ statusCode: 500, message: error.message }));
    }
  };
}
