import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getDoctorslistSpeciality } from '@/app/controllers/DoctorController';

const handler = nextConnect();
handler.get(async (req, res) => {
    await db.sync();    
    await getDoctorslistSpeciality(req, res);
});

export default handler;