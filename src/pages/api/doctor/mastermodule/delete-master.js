import nextConnect from 'next-connect';
import db from '@/configs/database';
import { deleteEducation } from '@/app/controllers/DoctorController';


const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();
    
    await deleteEducation(req, res);
});

export default handler;