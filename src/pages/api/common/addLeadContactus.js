import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addLeadContactus } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addLeadContactus(req, res);
});

export default handler;