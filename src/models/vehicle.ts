import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IVehicleDocument extends Document {
    registration: string;
    status: string;
    vehicles_picture: string;
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

const vehicleSchema = new Schema(
    {
        registration: {
            type: String,
            require: true,
        },
        status: {
            type: String,
            require: true,
        },
        vehicle_picture: {
            type: String,
            default:
                'http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png',
            // require: false,
        },
    },
    options
);

const Vehicle = model<IVehicleDocument>('vehicles', vehicleSchema);

export default Vehicle;