import mongoose from "mongoose";
import colors from "colors";

const MONGO_URL = "mongodb+srv://Master:pedrao250508phvb@guardameulanche.xz52fl7.mongodb.net/";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected to: ${mongoose.connection.host}`.blue.bold);
    } catch (error) {
        console.log('MongoDB Error:'.red.bold, error);
        process.exit(1);
    }
};

export default connectDB;