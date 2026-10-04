const express = require("express");
const productos = require("../../sprint1-2/productos");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(productos);
});

router.get("/:id", (req, res, next) => {
  const producto = productos.find((elemento) => elemento.id === req.params.id);

  if (!producto) {
    return next();
  }

  res.json(producto);
});

module.exports = router;
