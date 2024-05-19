import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';
import { getNextSequence } from '../utils/counter'; // Import the function


interface IInvoiceDocument extends Document {
  invoiceId: string; 
  customer: string;
  address: string;
  listorderId: [ObjectId];
  amount: number;
  invoicestatus: boolean;
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

const invoiceSchema = new Schema(
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

invoiceSchema.pre<IInvoiceDocument>('save', async function (next) {
    if (this.isNew) {
      const nextSeq = await getNextSequence('invoiceId');
      this.invoiceId = nextSeq.toString().padStart(7, '0'); // Padding with zeros to make it 7 digits
    }
    next();
  });
  
  const Invoice = model<IInvoiceDocument>('invoices', invoiceSchema);
  
  export default Invoice;