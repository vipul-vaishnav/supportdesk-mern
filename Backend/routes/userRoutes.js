import express from 'express';
import AUTH from './../middlewares/authMiddleware.js';
import { registerUser, loginUser, getMe } from './../controllers/userControllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', AUTH, getMe);

export default router;
