import { Schema, model, Document } from 'mongoose';

interface ICounterDocument extends Document {
  _id: string;
  seq: number;
}

const counterSchema = new Schema<ICounterDocument>({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = model<ICounterDocument>('Counter', counterSchema);

export default Counter;