export interface SpineImage {
  File: string;
  Hash: string;
}

export class Image {
  file: string;
  hash: string;

  constructor(image: SpineImage) {
    this.file = image.File;
    this.hash = image.Hash;
  }
}
