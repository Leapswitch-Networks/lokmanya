import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getvideosbackend } from '@/app/controllers/VideosControllery';
import { checkAccess } from '@/app/middleware'; // ✅ Ensure the import path is correct

const handler = nextConnect();

// Apply access control middleware
handler.use(checkAccess([]));

handler.get(async (req, res) => {
  try {
    await db.sync();    
    await getvideosbackend(req, res);
  } catch (error) {
    console.error('Error in get videos backend:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;
