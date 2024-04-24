import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IOrderDocument extends Document {
    // date: Date;
    datePickUp: String;
    timePickUp: string;
    dateDropOff: string;
    timeDropOff: string;
    vehicle: string;
    driver: string;
    pick_up: string;
    drop_off:[string];
    consumer: string;
    income: number;
    oilFee: number;
    tollwayFee: number;
    otherFee: number;
    orderStatus: string;
    invoiced: boolean;
    remark: string;
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

const orderSchema = new Schema(
    {
      datePickUp: {
        type: String,
        require: true,
      },
      timePickUp: {
        type: String,
        require: true,
      },
      dateDropOff: {
        type: String,
        require: true,
      },
      timeDropOff: {
        type: String,
        require: true,
      },
      vehicle: {
        type: String,
        require: true,
      },
      driver: {
        type: String,
        require: true,
      },
      pick_up: {
        type: String,
        require: true,
      },
      drop_off: {
        type: [String],
        require: true,
      },
      consumer: {
        type: String,
        require: true,
      },
      income: {
        type: Number,
        require: true,
      },
      oilFee: {
        type: Number,
        require: true,
      },
      tollwayFee: {
        type: Number,
        require: true,
      },
      otherFee: {
        type: Number,
        require: true,
      },
      remark: {
        type: String,
        require: true,
      },
      orderStatus: {
        type: String,
        require: true,
      },
      invoiced: {
        type: Boolean,
        require: true,
      }
    },
    options
);

const Order = model<IOrderDocument>('orders', orderSchema);

export default Order;