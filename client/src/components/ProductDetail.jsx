function ProductDetail({
  product,
  onAddToCart,
  onClose,
}) {
  // Renderizado condicional:
  // si no hay producto seleccionado, no mostramos nada.
  if (!product) {
    return null;
  }

  const {
    nombre,
    precio,
    categoria,
    descripcion,
    imagen,
    especificaciones = {},
  } = product;

  return (
    <section
      className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]"
      aria-labelledby="titulo-detalle"
    >
      <div className="grid gap-8 md:grid-cols-2">

        <div>
          <img
            src={imagen}
            alt={nombre}
            className="h-full max-h-[500px] w-full rounded-xl object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">

          <span className="text-sm font-semibold uppercase tracking-[0.08em] text-[#87A96B]">
            {categoria}
          </span>

          <h2
            id="titulo-detalle"
            className="font-titulos text-2xl font-bold uppercase tracking-[0.08em] text-[#A0522D]"
          >
            {nombre}
          </h2>

          <p className="leading-relaxed text-[#2D2D2D]/80">
            {descripcion}
          </p>

          {typeof precio === "number" && (
            <p className="text-2xl font-bold text-[#A0522D]">
              ${precio.toLocaleString("es-AR")}
            </p>
          )}

          {Object.keys(especificaciones).length > 0 && (
            <div>
              <h3 className="mb-3 font-titulos text-lg font-bold text-[#A0522D]">
                Especificaciones
              </h3>

              <dl className="divide-y divide-[#A0522D]/10 rounded-lg border border-[#A0522D]/10">

                {Object.entries(especificaciones).map(
                  ([clave, valor]) => (
                    <div
                      key={clave}
                      className="grid grid-cols-2 gap-4 p-3"
                    >
                      <dt className="font-semibold">
                        {clave}
                      </dt>

                      <dd>
                        {valor}
                      </dd>
                    </div>
                  )
                )}

              </dl>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3">

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="rounded-lg bg-[#A0522D] px-5 py-2.5 font-medium text-white transition hover:bg-[#D4A437]"
            >
              Añadir al carrito
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#A0522D] px-5 py-2.5 font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
            >
              Volver al catálogo
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default ProductDetail;