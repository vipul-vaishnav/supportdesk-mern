import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import userModel from './../models/userModel.js';
import genToken from './../token/genToken.js';

// @desc To register a new user
// @route /api/v1/users/register
// @access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // #validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('All fields must be filled with valid values');
  } else {
    // #find if user is already registered
    const userExists = await userModel.findOne({ email: email });

    if (userExists) {
      res.status(400);
      throw new Error('User with this email is already registered');
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // create user
      const newUser = await userModel.create({
        name: name,
        email: email,
        password: hashedPassword,
      });

      if (newUser) {
        res.status(201).json({
          status: 'success',
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          token: genToken(newUser._id),
          message: 'User registered successfully',
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    }
  }
});

// @desc To login an existing user
// @route /api/v1/users/login
// @access PUBLIC
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // #validation
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields must be filled with valid values');
  } else {
    // #find if user with this email exists or not
    const userExists = await userModel.findOne({ email: email });

    if (userExists) {
      // #check if password matches
      const checkPassword = await bcrypt.compare(password, userExists.password);

      if (checkPassword) {
        res.status(200).json({
          status: 'success',
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          token: genToken(userExists._id),
          message: 'User logged in successfully',
        });
      } else {
        res.status(401);
        throw new Error('Invalid Email or Password');
      }
    } else {
      res.status(400);
      throw new Error('User not found');
    }
  }
});

// @desc get data of currently logged in user
// @route /api/v1/users/me
// @access PRIVATE
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hii its me',
  });
});

export { registerUser, loginUser, getMe };
