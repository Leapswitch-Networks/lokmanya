import nextConnect from 'next-connect';
import db from '@/configs/database';
import { recaptchverify } from '@/app/controllers/AuthController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await recaptchverify(req, res);
});

export default handler;