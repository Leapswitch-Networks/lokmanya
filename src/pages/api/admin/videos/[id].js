import nextConnect from 'next-connect';
import db from '@/configs/database';
import { getvideosById } from '@/app/controllers/VideosControllery';

const handler = nextConnect();
import { updateVideo } from '@/app/controllers/VideosControllery';

handler.get(async (req, res) => {
    await db.sync();
    await getvideosById(req, res);
});

handler.put(async (req, res) => {
    await db.sync();
    await updateVideo(req, res);
});

export default handler;

// Disable default body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};