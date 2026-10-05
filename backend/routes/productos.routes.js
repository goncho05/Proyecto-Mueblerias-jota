const express = require("express");
const productos = require("../data/productos");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(productos);
});

router.get("/:id", (req, res, next) => {
  const producto = productos.find(
    (elemento) => String(elemento.id) === req.params.id
  );

  if (!producto) {
    return next();
  }

  res.json(producto);
});

module.exports = router;
