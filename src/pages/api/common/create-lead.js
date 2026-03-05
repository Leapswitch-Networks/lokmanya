import nextConnect from 'next-connect';
import db from '@/configs/database';
import { createLead } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await createLead(req, res);
});

export default handler;