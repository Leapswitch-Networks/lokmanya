import nextConnect from 'next-connect';
import db from '@/configs/database';
import { exportDataLead } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await exportDataLead(req, res);
});

export default handler;