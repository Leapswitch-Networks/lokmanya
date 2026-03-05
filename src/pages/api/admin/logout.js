import nextConnect from 'next-connect';
import db from '@/configs/database';
import { logout } from '@/app/controllers/AuthController';
import { checkAccess } from '@/app/middleware';

const handler = nextConnect();

// Apply middleware before defining the route
handler.use(checkAccess([]));

handler.post(async (req, res) => {
    await db.sync();    
    await logout(req, res);
});

export default handler;
