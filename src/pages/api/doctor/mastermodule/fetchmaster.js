import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getMasters } from '@/app/controllers/DoctorController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    
    await getMasters(req, res);
});

export default handler;