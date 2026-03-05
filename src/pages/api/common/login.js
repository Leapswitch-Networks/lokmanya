import nextConnect from 'next-connect';
import db from '@/configs/database';
import { Login } from '@/app/controllers/AuthController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await Login(req, res);
});

export default handler;