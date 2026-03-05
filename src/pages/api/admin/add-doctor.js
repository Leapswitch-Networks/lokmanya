import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addDoctor } from '@/app/controllers/DoctorController';
import { checkAccess } from '@/app/middleware'; // ✅ Ensure path is correct

const handler = nextConnect();

// Apply access control middleware
handler.use(checkAccess([]));

handler.post(async (req, res) => {
  try {
    await db.sync();    
    await addDoctor(req, res);
  } catch (error) {
    console.error('Error in addDoctor:', error);
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
