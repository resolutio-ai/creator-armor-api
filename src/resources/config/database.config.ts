import mongoose from "mongoose";

export const connectDatabase = () => {
    mongoose
        .set("strictQuery", false)
        .connect(process.env.MONGODB_URI as string)
        .then(() => {
            console.log("Connected to database...");
        })
        .catch((error: any) => {
            console.error(error);
            throw error;
        });
};