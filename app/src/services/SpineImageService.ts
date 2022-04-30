import { SpineApi } from 'spine-api';
import sharp from 'sharp';

export class SpineImageService {
  async loadImage(url: string): Promise<Buffer> {
    const imageArrayBuffer = await SpineApi.loadImage(url);
    const imageBuffer = new Buffer(imageArrayBuffer);
    return await sharp(imageBuffer, {}).webp({ quality: 100 }).toBuffer();
  }
}

export const spineImageService = new SpineImageService();
