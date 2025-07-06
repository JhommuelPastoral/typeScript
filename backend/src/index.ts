import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dbConnect from './config/db'

import authRoutes from './routes/auth.routes'

const app = express();
const corsOptions = {
  origin: 'https://typescript-1-3p3d.onrender.com',
  credentials: true
}
//https://typescript-1-3p3d.onrender.com
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/auth', authRoutes);
dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
});


