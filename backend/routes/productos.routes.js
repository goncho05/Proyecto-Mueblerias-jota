import { Router } from 'express'
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from '../controllers/producto.controller.js'

const router = Router()

// Rutas del CRUD de productos conectadas a la base de datos
router.get('/', obtenerProductos)
router.get('/:id', obtenerProductoPorId)
router.post('/', crearProducto)
router.put('/:id', actualizarProducto)
router.delete('/:id', eliminarProducto)

export default router