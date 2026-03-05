import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getLead } from '@/app/controllers/AdminController';
import { checkAccess } from '@/app/middleware'; // ✅ Ensure this path is correct

const handler = nextConnect();

// Add middleware to check access
handler.use(checkAccess([]));

handler.get(async (req, res) => {
  try {
    await db.sync();    
    await getLead(req, res);
  } catch (error) {
    console.error('Error in getLead:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;
