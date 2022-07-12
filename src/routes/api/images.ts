import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const images: express.Router = express.Router();
const full_files: string[] = [];
const thumb_files: string[] = [];

images.use('/', async (req, res, next): Promise<void> => {
  //Loop over the 'images/full' dir and create an array including all file names.
  const full_dir = await fs.opendir(`./images/full`);
  for await (const dirent of full_dir) {
    full_files.push(dirent.name);
  }
  //Loop over the 'images/thumb' dir and create an array including all file names.
  const thumb_dir = await fs.opendir(`./images/thumb`);
  for await (const dirent of thumb_dir) {
    thumb_files.push(dirent.name);
  }
  next();
});

images.get('/', async (req, res): Promise<void> => {
  //Check if query contains a file name, return an error message if false
  if (full_files.includes(`${req.query.filename}.jpg`)) {
    const { filename, width, height } = req.query;
    const width_number: number = parseInt(width as string);
    const height_number: number = parseInt(height as string);
    const filename_string: string = filename as unknown as string;
    const file: sharp.Sharp = sharp(`./images/full/${filename_string}.jpg`);
    try {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      const data = await toBuffer(
        width_number,
        height_number,
        file,
        filename_string
      );
      res.end(data);
    } catch (error) {
      console.log('Error from Image GET route', error);
    }
  } else {
    res.status(400).send({
      message: 'No image found. Please make sure the file name is correct.',
    });
  }
});

const toBuffer = async (
  width: number,
  height: number,
  file: sharp.Sharp,
  filename: string
): Promise<Buffer> => {
  //Check if width & height values are not valid, if true, return an original image
  if (!width || !height || width <= 0 || height <= 0) {
    return file.jpeg().toBuffer();
  } else {
    //If false, check if there is any cache with similar file, return that file if it's true.
    if (thumb_files.includes(`${filename}_${width}x${height}.jpg`)) {
      return await fs.readFile(
        `./images/thumb/${filename}_${width}x${height}.jpg`
      );
      //Otherwise, create a new one.
    } else {
      const data = file.resize(width, height).jpeg().toBuffer();
      toOutput(await data, filename, width, height);
      return data;
    }
  }
};

const toOutput = async (
  data: Buffer,
  filename: string,
  width: number,
  height: number
): Promise<void> => {
  try {
    fs.writeFile(`./images/thumb/${filename}_${width}x${height}.jpg`, data, {
      flag: 'w+',
    });
  } catch (error) {
    console.log('Error from toOuput()', error);
  }
};

export { toBuffer, toOutput };

export default images;
