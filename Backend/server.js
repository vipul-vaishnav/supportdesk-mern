import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './configs/connectDB.js';
import errorHandler from './middlewares/errorMiddleware.js';
import userRouter from './routes/userRoutes.js';
import ticketRouter from './routes/ticketRoutes.js';

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

// Error handler
app.use(errorHandler);

// Listening to requests
app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
});
