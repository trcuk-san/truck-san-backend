import { Document, model, Schema, SchemaOptions } from 'mongoose';

interface IUserDocument extends Document {
    firstname: string;
    // lastname: string;
    username: string;
    // phone: string;
    // address: string;
    // hash: string;
    // salt: string;
    // profile_picture: string;
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
            require: true,
        },
        // lastname: {
        //     type: String,
        //     require: true,
        // },
        // phone: {
        //     type: String,
        //     unique: true,
        // },
        username: {
            type: String,
            require: true,
            unique: true,
        },
        // password: {
        //     type: String,
        //     require: true,
        // },
        // hash: {
        //     type: String,
        //     require: false,
        // },
        // salt: {
        //     type: String,
        //     require: true,
        // },
        // profile_picture: {
        //     type: String,
        //     default:
        //         'http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png',
        //     // require: false,
        // },
    },
    options
);

const User = model<IUserDocument>('users', userSchema);

export default User;