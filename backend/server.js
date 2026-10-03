const express = require("express");
const app = express();

const productosRoutes = require("./routes/producto.routes");

app.use(express.json());

app.use("/api/productos",productosRoutes);

const PORT = 5000;

app.listen(PORT,() => {
    console.log(`Servidor ejecutandose en http://localhost:${PORT}]`)
});