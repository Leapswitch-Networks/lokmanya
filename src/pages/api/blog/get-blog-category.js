import nextConnect from 'next-connect';
import db from '@/configs/database';
import { categoryList } from '@/app/controllers/BlogController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    await categoryList(req, res);
});

export default handler;