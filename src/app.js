import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './Config/db';
import AuthRouter from './Routers/Auth';
import routerProducts from './Routers/Products';

dotenv.config();
const app = express();
app.use(express.json());
// middleware
app.use(cors());

connectDB(process.env.DB_URI);

app.use('/v1/auth', AuthRouter)
app.use('/v1/product', routerProducts)

export const viteNodeApp = app
