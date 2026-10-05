const express = require("express");
const cors = require("cors");
const path = require("node:path");

const registrarSolicitud = require("./middlewares/logger");
const { rutaNoEncontrada, manejadorErrores } = require("./middlewares/errorHandler");
const productosRouter = require("./routes/productos.routes");

const aplicacion = express();
const puerto = process.env.PORT || 3001;

aplicacion.use(cors());
aplicacion.use(express.json());
aplicacion.use(registrarSolicitud);

aplicacion.use(
  "/assets/productos",
  express.static(path.join(__dirname, "../sprint1-2/Kit de imágenes"))
);
aplicacion.use("/api/productos", productosRouter);

aplicacion.use(rutaNoEncontrada);
aplicacion.use(manejadorErrores);

function iniciarServidor() {
  return aplicacion.listen(puerto, () => {
    console.log(`Servidor backend corriendo en http://localhost:${puerto}`);
  });
}

if (require.main === module) {
  iniciarServidor();
}

module.exports = { aplicacion, iniciarServidor };
