import { Product } from '../models/Product.js'

// GET /api/productos (Listar todos)
export async function obtenerProductos(req, res, next) {
  try {
    const productos = await Product.find().sort({ createdAt: -1 })
    res.json({ data: productos, error: null })
  } catch (error) {
    next(error)
  }
}

// GET /api/productos/:id (Obtener uno por ID)
export async function obtenerProductoPorId(req, res, next) {
  try {
    const { id } = req.params
    const producto = await Product.findById(id)

    if (!producto) {
      return res.status(404).json({ data: null, error: 'Producto no encontrado' })
    }

    res.json({ data: producto, error: null })
  } catch (error) {
    next(error)
  }
}

// POST /api/productos (Crear producto)
export async function crearProducto(req, res, next) {
  try {
    const nuevoProducto = new Product(req.body)
    await nuevoProducto.save()
    res.status(201).json({ data: nuevoProducto, error: null })
  } catch (error) {
    next(error)
  }
}

// PUT /api/productos/:id (Actualizar producto)
export async function actualizarProducto(req, res, next) {
  try {
    const { id } = req.params
    const productoActualizado = await Product.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!productoActualizado) {
      return res.status(404).json({ data: null, error: 'Producto no encontrado' })
    }

    res.json({ data: productoActualizado, error: null })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/productos/:id (Eliminar producto)
export async function eliminarProducto(req, res, next) {
  try {
    const { id } = req.params
    const productoEliminado = await Product.findByIdAndDelete(id)

    if (!productoEliminado) {
      return res.status(404).json({ data: null, error: 'Producto no encontrado' })
    }

    res.json({ data: { mensaje: 'Producto eliminado correctamente' }, error: null })
  } catch (error) {
    next(error)
  }
}