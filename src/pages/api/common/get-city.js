import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getCity } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getCity(req, res);
});

export default handler;