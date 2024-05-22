import mongoose from 'mongoose';
export const connectDB = async (uri) => {
    try {
        await mongoose.connect(uri);
        console.log("Success")
    } catch (error) {
        console.log(error);
    }
}