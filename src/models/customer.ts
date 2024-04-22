import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface ICustomerDocument extends Document {
    name: string;
    address: string;
    phone: string;
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

const customerSchema = new Schema(
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

const Customer = model<ICustomerDocument>('customers', customerSchema);

export default Customer;