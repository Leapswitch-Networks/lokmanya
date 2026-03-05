import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getblogById } from '@/app/controllers/BlogController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getblogById(req, res);
});

export default handler;