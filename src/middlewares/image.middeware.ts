import { HttpException } from '@/httpModals/httpException';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});

/**
 * @author: Edward
 * @name ImageMiddleware
 * @description Allows use of decorator and non-decorator based validation
 */
export const ImageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload.single('image')(req, res, (err: any) => {
    if (err instanceof multer.MulterError || err instanceof Error || err) {
      // Multer error occurred when uploading.
      next(new HttpException({ statusCode: 400, message: err }));
    }

    // Check if there is a file in the request body
    if (!req.file) {
      next(new HttpException({ statusCode: 400, message: 'No image found in request body' }));
    }

    req.body.image = req.file.buffer;
  });
};
