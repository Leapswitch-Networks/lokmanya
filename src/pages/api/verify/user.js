// pages/api/verify.js

import nextConnect from 'next-connect';
import db from '@/configs/database';
import { verify } from '@/app/controllers/AuthController';
import { checkAccess } from '@/app/middleware';

// Create the handler and use the middleware
const handler = nextConnect();

// Apply access control (can be conditional or role-based)
handler.use(checkAccess([]));

// Handle GET requests
handler.get(async (req, res) => {
  try {
    // Ideally, db.sync() should be done at app startup
    await db.sync();
    await verify(req, res);
  } catch (error) {
    console.error('Error in verify API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default handler;
