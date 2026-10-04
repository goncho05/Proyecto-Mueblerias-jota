function ProductCard({ product, onAddToCart }) {
  const {
    id,
    nombre,
    precio,
    categoria,
    descripcion,
    imagen,
  } = product;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-[#A0522D]/10 bg-white shadow-[0_8px_24px_rgba(45,45,45,0.08)] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(160,82,45,0.18)]">

      <img
        src={imagen}
        alt={nombre}
        className="h-56 w-full object-cover"
      />

      <div className="flex flex-1 flex-col gap-3 p-5">

        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#87A96B]">
          {categoria}
        </span>

        <h3 className="font-titulos text-lg font-bold uppercase tracking-[0.06em] text-[#A0522D]">
          {nombre}
        </h3>

        <p className="text-sm leading-relaxed text-[#2D2D2D]/80">
          {descripcion}
        </p>

        <p className="mt-auto text-lg font-bold text-[#A0522D]">
          ${precio.toLocaleString("es-AR")}
        </p>

        <div className="mt-2 flex flex-wrap gap-3">

          <a
            href={`#producto-${id}`}
            className="rounded-lg border border-[#A0522D] px-4 py-2 text-sm font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
          >
            Ver detalle
          </a>

          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="rounded-lg bg-[#A0522D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#D4A437]"
          >
            Añadir al carrito
          </button>

        </div>

      </div>

    </article>
  );
}

export default ProductCard;