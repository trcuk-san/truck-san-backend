import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // โหลดตัวแปรสภาพแวดล้อมจากไฟล์ .env

const connectMongoDB = async () => {
    const uri = process.env.MONGO_URI!;
    
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 10000 // เพิ่ม timeout
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectMongoDB;
