import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getEducations } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getEducations(req, res);
});

export default handler;