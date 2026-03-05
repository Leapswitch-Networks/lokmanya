import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addLeadDoctor } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addLeadDoctor(req, res);
});

export default handler;