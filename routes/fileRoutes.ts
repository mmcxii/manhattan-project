import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import sharp from 'sharp';
import { BadRequest, ServerError, Status, SendStatus } from './Status';
import { s3methods } from '../util/AWS';
// Define image resize width
const IMG_WIDTH = 350;

// File router
export const FileRoutes = Router().post('/images', async (req, res) => {
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

    const success = await s3methods.uploadImg('nich', resized);
    if (success) {
      return SendStatus(res, Status.Created);
    } else {
      return res.sendStatus(500);
    }
  } catch (error) {
    return ServerError(res, error);
  }
});
