import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log("✅ MongoDB is already connected.");
      return;
    }
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    console.log("✅ Connected to MongoDB Atlas");
  } catch (error) {
    console.log("process.env.MONGODB_URI: ", process.env.MONGODB_URI)
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
export default connectMongoDB;