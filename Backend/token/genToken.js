import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const genToken = (id) => {
  const TOKEN = jwt.sign({ id: id }, SECRET_KEY, { expiresIn: '30d' });
  return TOKEN;
};

export default genToken;
