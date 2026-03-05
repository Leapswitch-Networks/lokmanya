import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addCategory } from '@/app/controllers/BlogController';


const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();
    
    await addCategory(req, res);
});

export default handler;