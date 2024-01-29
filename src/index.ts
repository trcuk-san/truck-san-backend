// src/app.ts
import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import test from './routes/test';

const app = express()

const port = process.env.PORT || 4000;


// declare module 'express-session' {
//   interface SessionData {
//       [key: string]: any;
//   }
// }

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(express.json());

app.use('/test',test);
// app.use('/user', userRoute);
// app.use('/forget', forgetRoute);
// app.use('/auth', authRoute);
// app.use('/omise', omiseRoute);
// app.use('/emails', emailRoute);



app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello Express + TypeScirpt!!',
  })
});

app.listen(port, () => console.log(`Application is running on port ${port}`))
