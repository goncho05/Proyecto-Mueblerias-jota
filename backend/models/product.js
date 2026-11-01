import { Schema, model } from 'mongoose'

const productSchema = new Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio es obligatorio'],
      min: [0, 'El precio no puede ser negativo'],
    },
    descripcion: {
      type: String,
      trim: true,
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      trim: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
    imagen: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export const Product = model('Product', productSchema)