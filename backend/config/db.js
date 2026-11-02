import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/muebleria_jota";
    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error de conexión a MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
