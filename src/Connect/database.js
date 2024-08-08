import mongoose from 'mongoose'

export default async function ConnectDB(uri) {
    try {
        await mongoose.connect(uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 30000,
            }
        );
        console.log(`Connect Success  to uri : ${uri}`);
    }
    catch {
        console.log(`Connect Failed to database`);
    }
};