import { SpineApi } from 'spine-api';
import { NextApiHandler } from 'next';

const handler: NextApiHandler = async function handler(req, res) {
  const { project, name } = req.query;
  if (typeof project !== 'string' || typeof name !== 'string') return res.status(401).json({});
  const imageUrl = `https://clockwork-origins.de/Gothic/downloads/mods/${project}/screens/${name}`;
  const fileArrayBuffer = await SpineApi.loadImage(imageUrl);
  const fileBuffer = new Buffer(fileArrayBuffer);
  res.setHeader('Content-Type', `image/png`).send(fileBuffer);
};

export default handler;
