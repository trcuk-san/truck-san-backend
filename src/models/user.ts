import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  hash: string;
  salt: string;
  profile_picture: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  firstname: { 
    type: String, 
    required: true 
  },
  lastname: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  hash: { 
    type: String, 
    required: true 
  },
  salt: { 
    type: String, 
    required: true 
  },
  profile_picture: { 
    type: String, 
    default: "http://res.cloudinary.com/di71vwint/image/upload/v1674291349/images/nsopymczagslnr78yyv5.png" 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  },
});

export default mongoose.model<IUser>('User', UserSchema);
