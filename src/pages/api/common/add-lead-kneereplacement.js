import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addLeadkneereplacement } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addLeadkneereplacement(req, res);
});

export default handler;