import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getDoctorslist } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getDoctorslist(req, res);
});

export default handler;