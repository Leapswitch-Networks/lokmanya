import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addLead } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addLead(req, res);
});

export default handler;