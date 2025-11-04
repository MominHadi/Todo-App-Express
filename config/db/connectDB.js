import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Mongo connection error:', err);
        process.exit(1);
    };
};