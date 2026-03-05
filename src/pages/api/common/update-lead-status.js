import nextConnect from 'next-connect';
import db from '@/configs/database';
import { updateLeadstatus } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await updateLeadstatus(req, res);
});

export default handler;