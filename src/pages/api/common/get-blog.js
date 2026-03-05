import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getBlog } from '@/app/controllers/BlogController';
import { checkAccess } from '@/app/middleware'; // ✅ Ensure the import path is correct

const handler = nextConnect();

// Apply access control middleware
handler.use(checkAccess([]));

handler.get(async (req, res) => {
  try {
    await db.sync();    
    await getBlog(req, res);
  } catch (error) {
    console.error('Error in getBlog:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;
