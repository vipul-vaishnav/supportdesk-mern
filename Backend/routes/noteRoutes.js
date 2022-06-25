import express from 'express';
import { getNotes, addNote } from '../controllers/noteController.js';
import AUTH from './../middlewares/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(AUTH, getNotes).post(AUTH, addNote);

export default router;
