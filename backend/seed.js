import dotenv from "dotenv";
import mongoose from "mongoose";
import { Product } from "./models/product.js";
import productos from "./data/productos.js";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/muebleria_jota";

async function poblarBaseDeDatos() {
  try {
    console.log("Conectando a MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("Conexión establecida con MongoDB.");

    console.log("Limpiando colección de productos existente...");
    await Product.deleteMany({});

    console.log("Preparando datos de productos...");
    const productosParaInsertar = productos.map((p) => ({
      nombre: p.nombre,
      precio: p.precio,
      descripcion: p.descripcion,
      categoria: p.categoria || "Muebles",
      stock: p.stock !== undefined ? p.stock : 10,
      imagenUrl: p.imagen,
      imagen: p.imagen,
    }));

    const resultado = await Product.insertMany(productosParaInsertar);
    console.log(
      `¡Éxito! Se insertaron ${resultado.length} productos en la base de datos.`
    );

    await mongoose.disconnect();
    console.log("Conexión cerrada. Script finalizado.");
    process.exit(0);
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
    process.exit(1);
  }
}

poblarBaseDeDatos();

