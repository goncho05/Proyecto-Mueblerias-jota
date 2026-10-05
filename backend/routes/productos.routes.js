const express = require("express");
const router = express.Router();

const productos = require("../data/productos");

//obtenemos todos los productos del JSON
router.get("/",(req,res) => {
    res.status(200).json(productos);
})
//obtenemos por un id el producto
router.get("/:id",(req,res) => {
    const id = Number(req.params.id);
    if(!Number.isInteger(id) || id <= 0){
        return res.status(400).json({mensaje: "El ID debe ser un entero positivo"});
    }

    const producto = productos.find(p => p.id === id);
    if(!producto){
        return res.status(404).json({mensaje: "Producto no encontrado"});
    }

    return res.status(200).json(producto);
})

module.exports = router;