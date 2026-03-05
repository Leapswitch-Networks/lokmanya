import nextConnect from 'next-connect';
import db from '@/configs/database';
import { deleteblog } from '@/app/controllers/BlogController';

const handler = nextConnect();
handler.delete(async (req, res) => {
  try {
    // Connect to the DB
    await db.sync();

    // Call the controller method
    await deleteblog(req, res);
  } catch (error) {
    console.error('Error in DELETE handler:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;
