import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getBlogList } from '@/app/controllers/BlogController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getBlogList(req, res);
});

export default handler;