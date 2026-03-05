import nextConnect from 'next-connect';
import db from '@/configs/database';
import { addBlog } from '@/app/controllers/BlogController';
import { checkAccess } from '@/app/middleware'; // ✅ Ensure path is correct

const handler = nextConnect();

// Apply access control middleware
handler.use(checkAccess([]));

handler.post(async (req, res) => {
  try {
    await db.sync();    
    await addBlog(req, res);
  } catch (error) {
    console.error('Error in addBlog:', error);
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
