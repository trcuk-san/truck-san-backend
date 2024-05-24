import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import OrderRoutes from './routes/orderRoute';
import VehicleRoutes from './routes/vehicleRoute';
import MobileRoutes from './routes/mobileRoute';
import AuthRoutes from './routes/authRoute';
import InvoiceRoute from './routes/invoiceRoute';
import ReceiptRoute from './routes/receiptRoute';
import VoucherRoute from './routes/voucherRoute';
import connectMongoDB from './config/mongoDB';
import expressSession from 'express-session';

const app = express();
const port = process.env.PORT || 4000;
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });
connectMongoDB();

declare module 'express-session' {
  interface SessionData {
      [key: string]: any;
  }
}

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors()); 
app.use(express.json());

app.use(
  expressSession({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
  })
);

app.listen(port, () => console.log(`Application is running on port ${port}`));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScript!!',
  });
});

app.use('/auth', AuthRoutes);
app.use('/order', OrderRoutes);
app.use('/vehicle', VehicleRoutes);
app.use('/invoice', InvoiceRoute);
app.use('/receipt', ReceiptRoute);
app.use('/voucher', VoucherRoute);
app.use('/mobile', MobileRoutes);
