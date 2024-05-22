import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';
import { getNextSequence } from '../utils/counter'; // Import the function

interface IReceiptDocument extends Document {
  receiptId: string; 
  customer: string;
  address: string;
  listinvoice: [ObjectId];
  amount: number;
} 

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            // delete ret.createdAt;
            // delete ret.updatedAt;
        },
    },
    timestamps: true,
};

const receiptSchema = new Schema(
    {
        receiptId: {
            type: String,
            require: true,
        },
        customer: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        listinvoice: {
            type: [Schema.Types.ObjectId],
            ref: 'Invoice',
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        }
    },
    options
);

receiptSchema.pre<IReceiptDocument>('save', async function (next) {
    if (this.isNew) {
      const nextSeq = await getNextSequence('receiptId');
      this.receiptId = nextSeq.toString().padStart(7, '0'); // Padding with zeros to make it 7 digits
    }
    next();
  });
  
  const Receipt = model<IReceiptDocument>('Receipt', receiptSchema);
  
  export default Receipt;
