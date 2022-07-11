// import express from "express";
import sharp from 'sharp';
// import { promises as fs } from "fs";
import { toBuffer } from '../routes/api/images';

describe('Testing images.ts', () => {
  it('toBuffer() should return a resized image Buffer with width & height value', async () => {
    const filename = 'fjord';
    const file: sharp.Sharp = sharp(`./images/full/${filename}.jpg`);
    expect(await toBuffer(300, 200, file, filename)).toEqual(
      await sharp(`./images/full/${filename}.jpg`)
        .resize(300, 200)
        .jpeg()
        .toBuffer()
    );
  });
  it('toBuffer() should return the original image without copping', async () => {
    const filename = 'fjord';
    const file: sharp.Sharp = sharp(`./images/full/${filename}.jpg`);
    expect(await toBuffer(NaN, NaN, file, filename)).toEqual(
      await sharp(`./images/full/${filename}.jpg`).jpeg().toBuffer()
    );
  });
});
