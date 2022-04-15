export interface RawImage {
  File: string;
  Hash: string;
}

export class Image {
  file: string;
  hash: string;

  constructor(image: RawImage) {
    this.file = image.File;
    this.hash = image.Hash;
  }
}
