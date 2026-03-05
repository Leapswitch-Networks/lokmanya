import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getDoctorConditions } from '@/app/controllers/DoctorController';

const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    await db.sync();
    await getDoctorConditions(req, res);
  } catch (error) {
    console.error('Error in getDoctorConditions:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default handler;