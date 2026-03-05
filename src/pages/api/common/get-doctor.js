import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getDoctors } from '@/app/controllers/DoctorController';
import { checkAccess } from '@/app/middleware'; // ✅ Make sure this path is correct

const handler = nextConnect();

// Middleware to check access
handler.use(checkAccess([]));

// GET route handler
handler.get(async (req, res) => {
  try {
    await db.sync();    
    await getDoctors(req, res);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;
