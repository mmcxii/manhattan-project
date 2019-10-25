import path from 'path';
import fs from 'fs';
import { Router } from 'express';
import { UploadedFile } from 'express-fileupload';
import sharp from 'sharp';

// Define image resize width
const IMG_WIDTH = 350;
// Define upload directory
const UPLOAD_DIR = path.join(__dirname, '../temp/uploads');

// Make sure the upload directory exists
fs.exists(UPLOAD_DIR, (exists) => {
  if (exists) {
    // All good!
    return;
  }

  fs.mkdir(UPLOAD_DIR, { recursive: true }, (err) => {
    if (err) {
      // Throw error... This directory is required for uploads
      console.log('Error creating upload directory:', err.message);
      throw err;
    }
  });
});

// File router
export const FileRoutes = Router().post('/images', async (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files to upload.');
  }

  const file = req.files.file as UploadedFile;
  if (file == null) {
    return res.status(400).send('No valid files to upload.');
  }

  const newFileName = file.name.replace(/\.{1}\w+{3,4}$/, '.png');
  const uploadPath = path.join(UPLOAD_DIR, newFileName);

  try {
    // Resize image and convert to png format
    const resized = await sharp(file.data)
      .resize(IMG_WIDTH, null, { withoutEnlargement: true })
      .png()
      .toBuffer();

    // Write out file from buffer to temp dir
    fs.writeFile(uploadPath, resized, (err) => {
      if (err) {
        throw new Error(`Error writing file ${err}`);
      }
      return res.sendStatus(201);
    });
  } catch (error) {
    console.log('Image upload error:', error);
    return res.status(500).send(error);
  }
});
