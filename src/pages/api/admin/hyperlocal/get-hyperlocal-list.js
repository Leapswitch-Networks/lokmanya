import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getHyperlocalList } from '@/app/controllers/HyperlocalController';

const handler = nextConnect();

handler.get(async (req, res) => {
  await db.sync();
  await getHyperlocalList(req, res); // `req.query` will include filters
});

export default handler;
