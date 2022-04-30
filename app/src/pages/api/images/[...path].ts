import { NextApiHandler } from 'next';
import { CLOCKWORK_ORIGINS_DOWNLOADS_BASE_URL } from '../../../constants';
import { spineImageService } from '../../../services/SpineImageService';

const handler: NextApiHandler = async function handler(req, res) {
  const path = req.query.path as string[];
  const imageUrl = [CLOCKWORK_ORIGINS_DOWNLOADS_BASE_URL, ...path].join('/');
  const imageBuffer = await spineImageService.loadImage(imageUrl);
  res.setHeader('Content-Type', `image/webp`).send(imageBuffer);
};

export default handler;
