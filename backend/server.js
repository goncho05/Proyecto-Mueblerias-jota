import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import registrarSolicitud from "./middlewares/logger.js";
import { rutaNoEncontrada, manejadorErrores } from "./middlewares/errorHandler.js";
import productosRouter from "./routes/productos.routes.js";

// Cargar variables de entorno
dotenv.config();

// Conectar a MongoDB
connectDB();

const aplicacion = express();
const puerto = process.env.PORT || 5000;

aplicacion.use(cors());
aplicacion.use(express.json());
aplicacion.use(registrarSolicitud);

aplicacion.use(
  "/assets/productos",
  express.static(path.join(process.cwd(), "../sprint1-2/Kit de imágenes"))
);
aplicacion.use("/api/productos", productosRouter);

aplicacion.use(rutaNoEncontrada);
aplicacion.use(manejadorErrores);

function iniciarServidor() 
{
  return aplicacion.listen(puerto, () => {
    console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
  });
}

if (process.argv[1] === new URL(import.meta.url).pathname ||(process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url))) 
{
  iniciarServidor();
}

export { aplicacion, iniciarServidor };
