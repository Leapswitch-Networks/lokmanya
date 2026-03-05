import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getArea } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getArea(req, res);
});

export default handler;