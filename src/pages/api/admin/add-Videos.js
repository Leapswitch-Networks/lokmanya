import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addVideo } from '@/app/controllers/VideosControllery';
import { checkAccess } from '@/app/middleware'; // ✅ Ensure path is correct

const handler = nextConnect();

// Apply access control middleware
handler.use(checkAccess([]));

handler.post(async (req, res) => {
  try {
    await db.sync();    
    await addVideo(req, res);
  } catch (error) {
    console.error('Error in addVideo:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
