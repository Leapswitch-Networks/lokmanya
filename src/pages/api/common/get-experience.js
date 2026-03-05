import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getExperience } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getExperience(req, res);
});

export default handler;