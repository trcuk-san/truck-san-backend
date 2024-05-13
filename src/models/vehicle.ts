import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IVehicleDocument extends Document {
    vehicleId: string;
    vehicleStatus: string;
    remarks: string;
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
        vehicleId: {
            type: String,
            require: true,
        },
        vehicleStatus: {
            type: String,
            require: true,
        },
        remarks: {
            type: String,
            require: false,
        },
    },
    options
);

const Vehicle = model<IVehicleDocument>('vehicles', vehicleSchema);

export default Vehicle;