import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  obtenerProducto,
  obtenerUrlImagen,
  eliminarProducto,
} from "../services/productos";

function ProductDetail({ productId, onClose, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setError("");
    setLoading(true);

    obtenerProducto(productId, { signal: controller.signal })
      .then((data) => setProduct(data))
      .catch((requestError) => {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [productId]);

  const handleEliminar = async () => {
    const confirmado = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto del catálogo?"
    );
    if (!confirmado) return;

    try {
      setDeleting(true);
      await eliminarProducto(productId);
      alert("Producto eliminado exitosamente.");
      onClose();
    } catch (err) {
      alert(err.message || "Error al eliminar el producto.");
      setDeleting(false);
    }
  };

  return (
    <section
      aria-label="Detalle del producto"
      className="mb-6 w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-[#A0522D] px-4 py-2 text-sm font-medium text-[#A0522D] transition hover:bg-[#A0522D]/10"
        >
          Volver al catálogo
        </button>

        {product && (
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to={`/admin/editar-producto/${productId}`}
              className="rounded-lg border border-[#A0522D] px-4 py-2 text-sm font-medium text-[#A0522D] no-underline transition hover:bg-[#A0522D]/10"
            >
              Editar producto
            </Link>
            <button
              type="button"
              onClick={handleEliminar}
              disabled={deleting}
              className="rounded-lg border border-red-600 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
            >
              {deleting ? "Eliminando..." : "Eliminar producto"}
            </button>
          </div>
        )}
      </div>

      {loading && <p role="status">Cargando detalle...</p>}
      {error && <p role="alert" className="text-red-800">{error}</p>}

      {product && (
        <div className="grid gap-6 md:grid-cols-2">
          {(product.imagenUrl || product.imagen) && (
            <img
              src={obtenerUrlImagen(product.imagenUrl || product.imagen)}
              alt={product.nombre}
              className="max-h-[28rem] w-full rounded-lg object-cover"
            />
          )}
          <div>
            <p className="m-0 text-sm font-semibold uppercase tracking-[0.1em] text-[#A0522D]">
              {product.categoria || "Muebles"}
            </p>
            <h3 className="mb-3 mt-1 font-titulos text-2xl font-bold">
              {product.nombre}
            </h3>
            <p className="leading-relaxed text-[#2D2D2D]/85">
              {product.descripcion}
            </p>
            <p className="font-semibold text-xl text-[#A0522D]">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              }).format(product.precio)}
            </p>
            <p className="text-sm text-[#2D2D2D]/70">
              {product.stock > 0 ? `Stock disponible: ${product.stock}` : "Sin stock"}
            </p>
            {product.especificaciones && (
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm border-t border-[#A0522D]/15 pt-4">
                {Object.entries(product.especificaciones).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="font-semibold text-[#2D2D2D]">{key}:</dt>
                    <dd className="m-0 text-[#2D2D2D]/75">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <button
              type="button"
              disabled={product.stock === 0}
              onClick={() => onAddToCart?.(product)}
              className="mt-6 rounded-lg bg-[#A0522D] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#D4A437] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
