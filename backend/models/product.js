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
      trim: true,
      default: 'General',
    },
    stock: {
      type: Number,
      default: 0,
      min: [0, 'El stock no puede ser negativo'],
    },
    imagenUrl: {
      type: String,
      trim: true,
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

// Sincronizar imagenUrl e imagen antes de guardar para compatibilidad
productSchema.pre('save', function () {
  if (this.imagenUrl && !this.imagen) {
    this.imagen = this.imagenUrl
  } else if (this.imagen && !this.imagenUrl) {
    this.imagenUrl = this.imagen
  }
})

export const Product = model('Product', productSchema)
