import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: "task-manager",
    });

    console.log("Connected to MongoDb");
  } catch (err) {
    console.error("Error while connecting to MongoDb: ", err);
  }
};
