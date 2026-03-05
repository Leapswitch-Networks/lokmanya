import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addLeadcareear } from '@/app/controllers/AdminController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addLeadcareear(req, res);
});

export default handler;

export const config = {
  api: {
    bodyParser: false, // Important for file uploads
  },
};