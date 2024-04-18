// src/app.ts
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import test from './routes/test';
import { connectMongoDB } from './config/mongoDB';
import OrderRoutes from './routes/orderRoute';

const app = express()
const port = process.env.PORT || 4000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
connectMongoDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
});

app.listen(port, () => console.log(`Application is running on port ${port}`))


app.use('/test',test);
app.use('/order', OrderRoutes);