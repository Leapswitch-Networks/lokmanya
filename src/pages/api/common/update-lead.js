import nextConnect from 'next-connect';
import db from '@/configs/database';
import { updateLead } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await updateLead(req, res);
});

export default handler;