import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addDoctorLead } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addDoctorLead(req, res);
});

export default handler;