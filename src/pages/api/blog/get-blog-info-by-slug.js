import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getblogsingle } from '@/app/controllers/BlogController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    await getblogsingle(req, res);
});

export default handler;