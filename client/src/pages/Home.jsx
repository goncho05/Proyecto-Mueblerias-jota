import { Link, useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";

function Home({ onSelectProduct, onAddToCart }) {
  const navigate = useNavigate();

  const handleProductSelect = (id) => {
    if (onSelectProduct) {
      onSelectProduct(id);
    } else {
      navigate(`/productos/${id}`);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section Institucional */}
      <section className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(45,45,45,0.08)] md:p-12">
        <div className="relative z-10 max-w-3xl">
          <span className="inline-block rounded-full bg-[#A0522D]/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#A0522D]">
            Tradición Artesanal • Desde 1996
          </span>

          <h1 className="mt-4 font-titulos text-3xl font-bold uppercase leading-tight tracking-[0.06em] text-[#A0522D] sm:text-4xl md:text-5xl">
            Muebles con historia, para tu hogar
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#2D2D2D]/85 md:text-lg">
            Desde hace 30 años trabajamos la madera maciza con manos artesanas en Buenos Aires.
            Cada mueble de Hermanos Jota combina la nobleza de materiales naturales seleccionados
            con un diseño atemporal, concebido para brindar calidez y acompañarte por generaciones.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/productos"
              className="inline-flex items-center justify-center rounded-lg bg-[#A0522D] px-6 py-3.5 text-sm font-semibold tracking-wide text-white no-underline shadow-md transition duration-300 hover:bg-[#D4A437] hover:shadow-lg"
            >
              Explorar Catálogo
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              to="/contacto"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[#A0522D] px-6 py-3 text-sm font-semibold tracking-wide text-[#A0522D] no-underline transition duration-300 hover:bg-[#A0522D]/10"
            >
              Consultas & Proyectos
            </Link>
          </div>
        </div>

        {/* Detalle decorativo sutil de fondo */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[#F5E6D3]/60 blur-3xl md:h-80 md:w-80"
        />
      </section>

      {/* Pilares Institucionales / Propuesta de Valor */}
      <section aria-label="Nuestros Pilares" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-[#A0522D]/15 bg-white p-6 shadow-[0_4px_16px_rgba(45,45,45,0.05)] transition hover:shadow-md">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A0522D]/10 text-[#A0522D]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h2 className="font-titulos text-lg font-bold text-[#A0522D]">Madera Maciza Noble</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#2D2D2D]/80">
            Petiribí, roble, paraíso y lenga seleccionados de fuentes sustentables. Muebles robustos con vetas naturales irrepetibles.
          </p>
        </div>

        <div className="rounded-xl border border-[#A0522D]/15 bg-white p-6 shadow-[0_4px_16px_rgba(45,45,45,0.05)] transition hover:shadow-md">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A0522D]/10 text-[#A0522D]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h2 className="font-titulos text-lg font-bold text-[#A0522D]">Oficio de Ebanistería</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#2D2D2D]/80">
            Técnicas tradicionales de carpintería y acabados con ceras y aceites naturales que protegen la madera y resaltan su calidez.
          </p>
        </div>

        <div className="rounded-xl border border-[#A0522D]/15 bg-white p-6 shadow-[0_4px_16px_rgba(45,45,45,0.05)] transition hover:shadow-md sm:col-span-2 lg:col-span-1">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-[#A0522D]/10 text-[#A0522D]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h2 className="font-titulos text-lg font-bold text-[#A0522D]">Garantía Estructural</h2>
          <p className="mt-2 text-sm leading-relaxed text-[#2D2D2D]/80">
            Estructuras sólidas pensadas para resistir el uso diario y trascender el paso del tiempo en tu hogar.
          </p>
        </div>
      </section>

      {/* Catálogo Destacado */}
      <section className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
        <div className="mb-6 flex flex-col justify-between gap-3 border-b border-[#A0522D]/15 pb-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-titulos text-xl font-bold uppercase tracking-[0.1em] text-[#A0522D] md:text-2xl">
              Colección Destacada
            </h2>
            <p className="mt-1 text-sm text-[#2D2D2D]/75">
              Conocé las piezas preferidas de nuestro taller artesanal.
            </p>
          </div>

          <Link
            to="/productos"
            className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.06em] text-[#A0522D] no-underline transition hover:text-[#D4A437]"
          >
            Ver catálogo completo &rarr;
          </Link>
        </div>

        <ProductList
          onSelectProduct={handleProductSelect}
          onAddToCart={onAddToCart}
        />

        <div className="mt-8 flex justify-center">
          <Link
            to="/productos"
            className="inline-flex items-center justify-center rounded-lg bg-[#A0522D] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white no-underline shadow transition hover:bg-[#D4A437]"
          >
            Ver todos los productos disponibles
          </Link>
        </div>
      </section>

      {/* Banner de Proyectos a Medida */}
      <section className="flex flex-col items-center justify-between gap-6 rounded-xl border border-[#A0522D]/20 bg-[#F5E6D3]/60 p-8 text-center sm:text-left md:flex-row">
        <div className="max-w-2xl">
          <h2 className="font-titulos text-xl font-bold text-[#A0522D] md:text-2xl">
            ¿Buscás un diseño o medidas especiales?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#2D2D2D]/80">
            En nuestro taller realizamos proyectos a medida para comedores, livings y espacios de trabajo.
            Escribinos para contarnos tu idea y recibir asesoramiento personalizado.
          </p>
        </div>

        <Link
          to="/contacto"
          className="shrink-0 rounded-lg bg-[#A0522D] px-6 py-3 text-sm font-medium text-white no-underline transition hover:bg-[#D4A437]"
        >
          Consultar por Muebles a Medida
        </Link>
      </section>
    </div>
  );
}

export default Home;

