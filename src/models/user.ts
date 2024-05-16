// src/models/User.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  hash: string;
  salt: string;
  profile_picture: string;
}

const userSchema = new Schema<IUser>({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  profile_picture: { type: String, default: 'http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png' }
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
