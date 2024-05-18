import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import OrderRoutes from './routes/orderRoute';
import VehicleRoutes from './routes/vehicleRoute';
import CustomerRoutes from './routes/customerRoute';
import MobileRoutes from './routes/mobileRoute';
import AuthRoutes from './routes/authRoute';
import connectMongoDB from './config/mongoDB';

const app = express();
const port = process.env.PORT || 4000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
connectMongoDB();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors()); 
app.use(express.json());

app.listen(port, () => console.log(`Application is running on port ${port}`));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScript!!',
  });
});

app.use('/auth', AuthRoutes);
app.use('/order', OrderRoutes);
app.use('/vehicle', VehicleRoutes);
app.use('/customer', CustomerRoutes);
app.use('/mobile', MobileRoutes);
