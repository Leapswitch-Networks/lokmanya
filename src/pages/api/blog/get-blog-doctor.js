import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getDoctorsblog } from '@/app/controllers/BlogController';


const handler = nextConnect();

handler.get(async (req, res) => {
    await db.sync();
    await getDoctorsblog(req, res);
});

export default handler;