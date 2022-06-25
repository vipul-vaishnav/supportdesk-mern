import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './configs/connectDB.js';
import errorHandler from './middlewares/errorMiddleware.js';
import userRouter from './routes/userRoutes.js';
import ticketRouter from './routes/ticketRoutes.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

//The 'fileURLToPath' method returns the fully-resolved platform-specific Node.js file path.
const __filename = fileURLToPath(import.meta.url);

// use the 'dirname()' method from the 'path' module. The 'dirname' method takes a path as a parameter and returns the directory name of the 'path'.
const __dirname = dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_DB_URI.replace('%PASSWORD%', process.env.MONGO_DB_PASSWORD);

//connect to database
connectDB(DB_URI);

// Initialize APP
const app = express();

// Logger Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser Middleware
app.use(express.json());

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tickets', ticketRouter);

// Server frontend

if (process.env.NODE_ENV === 'production') {
  // set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html');
  });
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome to support desk api' });
  });
}

// Error handler
app.use(errorHandler);

// Listening to requests
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
