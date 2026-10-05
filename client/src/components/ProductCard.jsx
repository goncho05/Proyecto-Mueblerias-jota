import { obtenerUrlImagen } from "../services/productos";

function ProductCard({ product, onSelect, onAddToCart }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-[#A0522D]/15 bg-white shadow-[0_4px_16px_rgba(45,45,45,0.06)]">
      {product.imagen && (
        <img
          src={obtenerUrlImagen(product.imagen)}
          alt={product.nombre}
          className="h-56 w-full object-cover"
          loading="lazy"
        />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="m-0 text-xs font-semibold uppercase tracking-[0.1em] text-[#A0522D]">
          {product.categoria}
        </p>
        <h3 className="mb-2 mt-1 font-titulos text-lg font-bold">
          {product.nombre}
        </h3>
        <p className="mb-4 mt-0 font-semibold">
          {new Intl.NumberFormat("es-AR", {
            style: "currency",
            currency: "ARS",
            maximumFractionDigits: 0,
          }).format(product.precio)}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSelect(product.id)}
            className="rounded-lg border border-[#A0522D] px-4 py-2 text-sm font-medium text-[#A0522D] transition hover:bg-[#A0522D]/10"
          >
            Ver detalle
          </button>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-lg bg-[#A0522D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D4A437]"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
