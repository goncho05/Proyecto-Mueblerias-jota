import { useEffect, useState } from "react";
import { obtenerProducto, obtenerUrlImagen } from "../services/productos";

function ProductDetail({ productId, onClose, onAddToCart }) {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    setProduct(null);
    setError("");
    setLoading(true);

    obtenerProducto(productId, { signal: controller.signal })
      .then(setProduct)
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

  return (
    <section
      aria-label="Detalle del producto"
      className="mb-6 w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]"
    >
      <button
        type="button"
        onClick={onClose}
        className="mb-4 rounded-lg border border-[#A0522D] px-4 py-2 text-sm font-medium text-[#A0522D]"
      >
        Volver al catálogo
      </button>
      {loading && <p role="status">Cargando detalle...</p>}
      {error && <p role="alert" className="text-red-800">{error}</p>}
      {product && (
        <div className="grid gap-6 md:grid-cols-2">
          {product.imagen && (
            <img
              src={obtenerUrlImagen(product.imagen)}
              alt={product.nombre}
              className="max-h-[28rem] w-full rounded-lg object-cover"
            />
          )}
          <div>
            <p className="m-0 text-sm font-semibold uppercase tracking-[0.1em] text-[#A0522D]">
              {product.categoria}
            </p>
            <h3 className="mb-3 mt-1 font-titulos text-2xl font-bold">
              {product.nombre}
            </h3>
            <p className="leading-relaxed">{product.descripcion}</p>
            <p className="font-semibold">
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              }).format(product.precio)}
            </p>
            {product.especificaciones && (
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                {Object.entries(product.especificaciones).map(([key, value]) => (
                  <div key={key} className="contents">
                    <dt className="font-semibold">{key}</dt>
                    <dd className="m-0">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="mt-5 rounded-lg bg-[#A0522D] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#D4A437]"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
