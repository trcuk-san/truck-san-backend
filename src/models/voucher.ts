import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IVoucherDocument extends Document {
  // receiptVoucher: number;
  // paymentVoucher: number;
  date: string,
  income: number,
  oilFee: number,
  tollwayFee: number,
  otherFee: number,
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

const voucherSchema = new Schema(
    {
      date: {
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
            require: false,
        },
        otherFee: {
          type: Number,
          require: false,
      },
    },
    options
);

const Voucher = model<IVoucherDocument>('voucher', voucherSchema);

export default Voucher;