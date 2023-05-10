import { HttpException } from '@/httpModals/httpException';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { slugify } from '@/utils/slugify';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(`${__dirname}../../../public/uploads/`);
    //create folder if not exist
    if (!fs.existsSync(dir)) {
      return fs.mkdir(dir, err => cb(err, dir));
    }
    return cb(null, dir);
  },
  filename: (req, file, cb) => {
    const fileOriginalName = slugify(file.originalname);
    cb(null, `${new Date().getTime()}-${fileOriginalName}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
  fileFilter(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return callback(new Error('only upload files with jpg, jpeg, png'));
    }

    callback(undefined, true);
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
      next(new HttpException({ statusCode: 400, message: 'No image found in request body' }));
    }

    // Check if there is a file in the request body
    if (!req.file) {
      next(new HttpException({ statusCode: 400, message: 'No image found in request body' }));
    }

    next();
  });
};
