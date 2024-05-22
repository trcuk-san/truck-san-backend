import { Document, model, ObjectId, Schema, SchemaOptions } from 'mongoose';

interface IOrderDocument extends Document {
    // date: Date;
    datePickUp: String;
    timePickUp: string;
    dateDropOff: string;
    timeDropOff: string;
    vehicleID: ObjectId;
    driver: ObjectId;
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
        type: Schema.Types.ObjectId,
        ref: 'vehicle',
        // require: true,
      },
      driver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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
        default: 0,
      },
      tollwayFee: {
        type: Number,
        require: true,
        default: 0,
      },
      otherFee: {
        type: Number,
        require: true,
        default: 0,
      },
      remark: {
        type: String,
        require: true,
      },
      orderStatus: {
        type: String,
        require: true,
        default: 'Pending',
      },
      invoiced: {
        type: Boolean,
        default: false,
      }
    },
    options
);

const Order = model<IOrderDocument>('orders', orderSchema);

export default Order;