import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getDesignation } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getDesignation(req, res);
});

export default handler;