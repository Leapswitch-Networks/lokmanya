import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getBestAHospitalHyperlocalFrontend } from '@/app/controllers/HyperlocalController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    await getBestAHospitalHyperlocalFrontend(req, res);
});

export default handler;