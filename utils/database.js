import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already Connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "shared_prompt",
    });
    isConnected = true;

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("MongoDB Connection Error", error);
  }
};
