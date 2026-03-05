import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addLeadBlog } from '@/app/controllers/BlogController';

const handler = nextConnect();

handler.post(async (req, res) => {
    await db.sync();    
    await addLeadBlog(req, res);
});

export default handler;