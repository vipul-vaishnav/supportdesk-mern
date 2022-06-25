import express from 'express';
import AUTH from './../middlewares/authMiddleware.js';
import { getTickets, getTicket, deleteTicket, updateTicket, createTicket } from './../controllers/ticketControllers.js';
import noteRouter from './noteRoutes.js';

const router = express.Router();

router.use('/:ticketId/notes', noteRouter);

router.route('/').get(AUTH, getTickets).post(AUTH, createTicket);

router.route('/:id').get(AUTH, getTicket).delete(AUTH, deleteTicket).put(AUTH, updateTicket);

export default router;
