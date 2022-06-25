import asyncHandler from 'express-async-handler';
import userModel from './../models/userModel.js';
import ticketModel from './../models/ticketModel.js';

// @desc get tickets of currently logged in user
// @route GET /api/v1/tickets
// @access PRIVATE
const getTickets = asyncHandler(async (req, res) => {
  // Get user using id in the jwt token
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await ticketModel.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    message: 'Fetched tickets successfully',
    results: tickets.length,
    tickets: tickets,
  });
});

// @desc get single ticket of currently logged in user
// @route GET /api/v1/tickets/:id
// @access PRIVATE
const getTicket = asyncHandler(async (req, res) => {
  // Get user using id in the jwt token
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  res.status(200).json({
    status: 'success',
    message: 'Ticket fetched successfully',
    ticket: ticket,
  });
});

// @desc delete ticket of currently logged in user
// @route DELETE /api/v1/tickets/:id
// @access PRIVATE
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using id in the jwt token
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  await ticket.remove();

  res.status(200).json({
    status: 'success',
    message: 'Ticket deleted successfully',
  });
});

// @desc update ticket of currently logged in user
// @route PUT /api/v1/tickets/:id
// @access PRIVATE
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using id in the jwt token
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  const updatedTicket = await ticketModel.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json({
    status: 'success',
    message: 'Ticket deleted successfully',
    updatedTicket: updatedTicket,
  });
});

// @desc create ticket for currently logged in user
// @route POST /api/v1/tickets
// @access PRIVATE
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error('Please provide a product and description');
  }

  // Get user using id in the jwt token
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await ticketModel.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json({
    status: 'success',
    message: 'Created Ticket Successfully',
    ticket: ticket,
  });
});

export { getTickets, getTicket, updateTicket, deleteTicket, createTicket };
