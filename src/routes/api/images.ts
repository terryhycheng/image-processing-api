import express from 'express';
import sharp from 'sharp';
import { promises as fs } from 'fs';

const images = express.Router();

images.get('/', async (req, res) => {
  //Check if query contains a file name
  if (req.query.filename) {
    const { filename, width, height } = req.query;
    const width_number: number = parseInt(width as string);
    const height_number: number = parseInt(height as string);
    const file: sharp.Sharp = sharp(`./images/full/${filename}.jpg`);
    try {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      const data = await toBuffer(
        width_number,
        height_number,
        file,
        filename as string
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
  if (!width || !height || width <= 0 || height <= 0) {
    return file.jpeg().toBuffer();
  } else {
    const data = file.resize(width, height).jpeg().toBuffer();
    toOutput(await data, filename, width, height);
    return data;
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
