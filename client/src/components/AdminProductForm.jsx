import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  crearProducto,
  actualizarProducto,
  obtenerProducto,
} from "../services/productos";

function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "0",
    categoria: "Asientos",
    imagenUrl: "",
    descripcion: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(esEdicion);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      setLoadingData(true);
      obtenerProducto(id)
        .then((prod) => {
          setFormData({
            nombre: prod.nombre || "",
            precio: String(prod.precio || ""),
            stock: String(prod.stock !== undefined ? prod.stock : 0),
            categoria: prod.categoria || "Asientos",
            imagenUrl: prod.imagenUrl || prod.imagen || "",
            descripcion: prod.descripcion || "",
          });
        })
        .catch((err) => {
          setError(err.message || "No se pudieron cargar los datos del producto.");
        })
        .finally(() => {
          setLoadingData(false);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.nombre.trim()) {
      setError("El nombre del producto es obligatorio.");
      return;
    }

    const precioNumero = parseFloat(formData.precio);
    if (isNaN(precioNumero) || precioNumero <= 0) {
      setError("El precio debe ser un número mayor a cero.");
      return;
    }

    const stockNumero = parseInt(formData.stock, 10);
    if (isNaN(stockNumero) || stockNumero < 0) {
      setError("El stock no puede ser negativo.");
      return;
    }

    setLoading(true);

    const datosProducto = {
      nombre: formData.nombre.trim(),
      precio: precioNumero,
      stock: stockNumero,
      categoria: formData.categoria.trim() || "Muebles",
      imagenUrl: formData.imagenUrl.trim(),
      descripcion: formData.descripcion.trim(),
    };

    try {
      if (esEdicion) {
        await actualizarProducto(id, datosProducto);
        alert("¡Producto actualizado con éxito!");
        navigate(`/productos/${id}`);
      } else {
        await crearProducto(datosProducto);
        alert("¡Producto creado con éxito!");
        navigate("/productos");
      }
    } catch (err) {
      setError(err.message || "Error al guardar el producto en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <section className="w-full max-w-2xl mx-auto rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
        <p role="status" className="text-center text-[#2D2D2D]/75">
          Cargando datos del producto para editar...
        </p>
      </section>
    );
  }

  return (
    <section className="w-full max-w-2xl mx-auto rounded-xl bg-white p-6 md:p-8 shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
      <div className="mb-6 border-b border-[#A0522D]/15 pb-4">
        <span className="inline-block rounded-full bg-[#A0522D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#A0522D]">
          Panel de Administración
        </span>
        <h1 className="mt-2 font-titulos text-2xl font-bold uppercase tracking-[0.08em] text-[#A0522D] md:text-3xl">
          {esEdicion ? "Editar Producto" : "Alta de Producto"}
        </h1>
        <p className="mt-1 text-sm text-[#2D2D2D]/75">
          {esEdicion
            ? "Modificá los campos que desees actualizar en la base de datos."
            : "Completá el siguiente formulario controlado para registrar un nuevo mueble en la base de datos."}
        </p>
      </div>

      {error && (
        <div role="alert" className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label htmlFor="nombre" className="mb-1 block text-sm font-semibold text-[#2D2D2D]">
            Nombre del producto <span className="text-red-600">*</span>
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            required
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej. Mesa de Centro Araucaria"
            className="w-full rounded-lg border border-[#A0522D]/30 px-4 py-2.5 text-sm focus:border-[#A0522D] focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="precio" className="mb-1 block text-sm font-semibold text-[#2D2D2D]">
              Precio (ARS) <span className="text-red-600">*</span>
            </label>
            <input
              id="precio"
              name="precio"
              type="number"
              min="0"
              step="any"
              required
              value={formData.precio}
              onChange={handleChange}
              placeholder="Ej. 450000"
              className="w-full rounded-lg border border-[#A0522D]/30 px-4 py-2.5 text-sm focus:border-[#A0522D] focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="stock" className="mb-1 block text-sm font-semibold text-[#2D2D2D]">
              Stock disponible
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="0"
              className="w-full rounded-lg border border-[#A0522D]/30 px-4 py-2.5 text-sm focus:border-[#A0522D] focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="categoria" className="mb-1 block text-sm font-semibold text-[#2D2D2D]">
              Categoría
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#A0522D]/30 px-4 py-2.5 text-sm focus:border-[#A0522D] focus:outline-none"
            >
              <option value="Asientos">Asientos</option>
              <option value="Mesas">Mesas</option>
              <option value="Almacenamiento">Almacenamiento</option>
              <option value="Oficina">Oficina</option>
              <option value="Dormitorio">Dormitorio</option>
            </select>
          </div>

          <div>
            <label htmlFor="imagenUrl" className="mb-1 block text-sm font-semibold text-[#2D2D2D]">
              URL de la imagen (imagenUrl)
            </label>
            <input
              id="imagenUrl"
              name="imagenUrl"
              type="text"
              value={formData.imagenUrl}
              onChange={handleChange}
              placeholder="https://... o Kit de imágenes/mueble.png"
              className="w-full rounded-lg border border-[#A0522D]/30 px-4 py-2.5 text-sm focus:border-[#A0522D] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="descripcion" className="mb-1 block text-sm font-semibold text-[#2D2D2D]">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Detalles sobre materiales, terminación, estilo y medidas..."
            className="w-full rounded-lg border border-[#A0522D]/30 px-4 py-2.5 text-sm focus:border-[#A0522D] focus:outline-none"
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => (esEdicion ? navigate(`/productos/${id}`) : navigate("/productos"))}
            className="rounded-lg border border-[#A0522D] px-5 py-2.5 text-sm font-medium text-[#A0522D] transition hover:bg-[#A0522D]/10"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[#A0522D] px-6 py-2.5 text-sm font-medium text-white transition hover:bg-[#D4A437] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Guardando..." : esEdicion ? "Guardar Cambios" : "Crear Producto"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AdminProductForm;
