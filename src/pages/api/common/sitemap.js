import nextConnect from 'next-connect';
import db from '@/configs/database';
import { generateSitemap } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();    
    await generateSitemap(req, res);
});

export default handler;