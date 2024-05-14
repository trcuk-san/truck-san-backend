import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser'; // Consider using a more modern middleware like express.json()
import { connectMongoDB } from './config/mongoDB';
import OrderRoutes from './routes/orderRoute';
import VehicleRoutes from './routes/vehicleRoute';
import CustomerRoutes from './routes/customerRoute';
import MobileRoutes from './routes/mobileRoute';
import UserRoutes from './routes/userRoute';
import TestRoutes from './routes/testRoute';

const app = express();
const port = process.env.PORT || 4000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
connectMongoDB();

app.use(bodyParser.json({ limit: '50mb' })); // Consider using express.json() for cleaner syntax
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

// Use express.json() for parsing JSON data in requests
app.use(express.json());

app.listen(port, () => console.log(`Application is running on port ${port}`))

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  });
});

app.use('/test', TestRoutes);
app.use('/order', OrderRoutes);
app.use('/vehicle', VehicleRoutes);
app.use('/customer', CustomerRoutes);
app.use('/user', UserRoutes);
app.use('/mobile', MobileRoutes);
