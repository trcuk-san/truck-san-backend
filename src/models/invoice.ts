import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface IInvoiceDocument extends Document {
  invoiceId: string; 
  customerId: ObjectId;
  listorderId: [ObjectId];
} 

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true,
};

const invoiceSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        phone: {
            type: String,
            unique: true,
        },
    },
    options
);

const Invoice = model<IInvoiceDocument>('invoices', invoiceSchema);

export default Invoice;