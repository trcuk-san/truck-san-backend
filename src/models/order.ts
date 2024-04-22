import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IOrderDocument extends Document {
    // date: Date;
    date: String;
    time: string;
    vehicle: string;
    driver: string;
    pick_up: string;
    drop_off:[string];
    consumer: string;
    remark: string;
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            delete ret.hash;
            delete ret.salt;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true,
};

const orderSchema = new Schema(
    {
      // date: {
      //       type: Date,
      //       require: true,
      //   },
      date: {
        type: String,
        require: true,
    },
        time: {
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
            require: false,
        },
        consumer: {
            type: String,
            require: true,
        },
        remark: {
          type: String,
          require: true,
      },
    },
    options
);

const Order = model<IOrderDocument>('orders', orderSchema);

export default Order;