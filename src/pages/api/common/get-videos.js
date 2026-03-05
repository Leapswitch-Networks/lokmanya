import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getvideosbackend } from '@/app/controllers/VideosControllery';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    // Set status to 'published' for public access
    req.query.status = 'published';
    await db.sync();
    await getvideosbackend(req, res);
  } catch (error) {
    console.error('Error in get videos:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;