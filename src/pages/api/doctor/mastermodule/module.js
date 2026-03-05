import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addmaster } from '@/app/controllers/DoctorController';


const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();
    
    await addmaster(req, res);
});

export default handler;