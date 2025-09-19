import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => console.log("Database connected"));

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB || "moviebox";

    if (!uri) {
      throw new Error("MONGODB_URI is not set");
    }

    // Do not append database name to URI directly to keep SRV URIs valid.
    // Instead, pass dbName via options so it works for both Atlas and local.
    await mongoose.connect(uri, { dbName });
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
