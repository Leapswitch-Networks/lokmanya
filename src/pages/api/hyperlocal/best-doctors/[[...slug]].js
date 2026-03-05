import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getBestDoctorsHyperlocalFrontend } from '@/app/controllers/HyperlocalController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    
    await getBestDoctorsHyperlocalFrontend(req, res);
});

export default handler;