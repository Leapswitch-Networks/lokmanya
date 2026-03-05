import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getBestTreatmentsHyperlocalFrontend } from '@/app/controllers/HyperlocalController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    console.log('IN');
    
    await getBestTreatmentsHyperlocalFrontend(req, res);
});

export default handler;