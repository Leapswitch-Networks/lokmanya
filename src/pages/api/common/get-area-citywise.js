import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getAreaCitywise } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await getAreaCitywise(req, res);
});

export default handler;