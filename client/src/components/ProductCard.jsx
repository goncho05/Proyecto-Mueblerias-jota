import { Link } from "react-router-dom";
import { obtenerUrlImagen } from "../services/productos";

function ProductCard({ product, onAddToCart }) {
  const productId = product._id || product.id;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#A0522D]/15 bg-white shadow-[0_4px_16px_rgba(45,45,45,0.06)] transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(45,45,45,0.12)]">
      {(product.imagenUrl || product.imagen) && (
        <img
          src={obtenerUrlImagen(product.imagenUrl || product.imagen)}
          alt={product.nombre}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.1em] text-[#A0522D]">
          {product.categoria}
        </p>

        <h2 className="mb-2 mt-1 font-titulos text-lg font-bold">
          {product.nombre}
        </h2>

        {product.descripcion && (
          <p className="mb-4 text-sm leading-relaxed text-[#2D2D2D]/75">
            {product.descripcion}
          </p>
        )}

        <p className="mb-2 mt-auto font-semibold">
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
          }).format(product.precio)}
        </p>

        <p className="mb-4 text-sm text-[#2D2D2D]/70">
          {product.stock > 0
            ? `Stock: ${product.stock}`
            : "Sin stock"}
        </p>

        <div className="flex flex-wrap gap-2">
          <Link
            to={`/productos/${productId}`}
            className="rounded-lg border border-[#A0522D] px-4 py-2 text-sm font-medium text-[#A0522D] no-underline transition hover:bg-[#A0522D]/10"
          >
            Ver detalle
          </Link>

          <button
            type="button"
            disabled={product.stock === 0}
            onClick={() => onAddToCart?.(product)}
            className="rounded-lg bg-[#A0522D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D4A437] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {product.stock > 0
              ? "Agregar al carrito"
              : "Sin stock"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;