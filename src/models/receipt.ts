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
        invoiceId: {
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
        listorderId: {
            type: [Schema.Types.ObjectId],
            ref: 'Order',
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        invoicestatus: {
            type: Boolean,
            default: false,
        },
    },
    options
);

receiptSchema.pre<IReceiptDocument>('save', async function (next) {
    if (this.isNew) {
      const nextSeq = await getNextSequence('invoiceId');
      this.receiptId = nextSeq.toString().padStart(7, '0'); // Padding with zeros to make it 7 digits
    }
    next();
  });
  
  const Receipt = model<IReceiptDocument>('receipt', receiptSchema);
  
  export default Receipt;