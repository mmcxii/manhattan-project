import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import sharp from 'sharp';
import { BadRequest, ServerError, Status, SendStatus, Ok } from './Status';
import { s3methods } from '../util/AWS';
import { IUserRequest } from '../interfaces';
import { Response } from 'express';
// Define image resize width
const IMG_WIDTH = 350;

// File router
export const FileRoutes = Router().post('/images', async (req: IUserRequest, res: Response) => {
  if (!req.files) {
    return BadRequest(res, 'No files to upload.');
  }

  const file = req.files.file as UploadedFile;
  if (file == null) {
    return BadRequest(res, 'No valid files to upload.');
  }

  let newFileName = file.name;
  if (!newFileName.endsWith('.png')) {
    newFileName = file.name.replace(/\.{1}\w{3,4}$/, '.png');
  }

  try {
    // Resize image and convert to png format
    const resized = await sharp(file.data)
      .resize(IMG_WIDTH, null, { withoutEnlargement: true })
      .png()
      .toBuffer();

      return s3methods.uploadImg(req, res, resized);

  } catch (error) {
    return ServerError(res, error);
  }
});
