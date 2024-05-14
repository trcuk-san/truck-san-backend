import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IUserDocument extends Document {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    hash: string;
    salt: string;
    profile_picture: string;
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

const userSchema = new Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        hash: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        profile_picture: {
            type: String,
            default: 'http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png',
        },
    },
    options
);

const User = model<IUserDocument>('users', userSchema);

export default User;
