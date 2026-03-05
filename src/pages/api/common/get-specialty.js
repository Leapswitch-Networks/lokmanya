import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getSpecialty } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getSpecialty(req, res);
});

export default handler;