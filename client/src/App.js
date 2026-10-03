import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5E6D3] font-cuerpo text-[#2D2D2D]">
      <Navbar cartCount={cartCount} />

      <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col px-5 py-10">
        {/* Contenedor central para catálogos y vistas de los demás integrantes */}
        <section
          id="inicio"
          className="flex flex-1 flex-col items-start gap-6"
        >
          <div>
            <h1 className="m-0 font-titulos text-2xl font-bold uppercase tracking-[0.1em] text-[#A0522D] md:text-3xl">
              Muebles con historia, para tu hogar
            </h1>
            <p className="mt-4 max-w-2xl leading-relaxed">
              Desde hace 30 años trabajamos la madera maciza con manos artesanas.
              Cada mueble de Hermanos Jota está pensado para acompañarte por
              generaciones.
            </p>
          </div>

          <div
            id="productos"
            className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]"
          >
            <h2 className="mb-3 font-titulos text-xl font-bold uppercase tracking-[0.1em] text-[#A0522D]">
              Catálogo
            </h2>
            <p className="m-0 mb-5 text-sm leading-relaxed text-[#2D2D2D]/80">
              Espacio reservado para las vistas de productos. El botón de
              prueba confirma el flujo unidireccional: App actualiza el carrito
              y Navbar recibe el contador por props.
            </p>
            <button
              type="button"
              onClick={() =>
                addToCart({
                  id: "demo-silla",
                  nombre: "Silla demo",
                  precio: 45000,
                })
              }
              className="rounded-lg bg-[#A0522D] px-5 py-2.5 text-sm font-medium uppercase tracking-[0.08em] text-white transition hover:bg-[#D4A437]"
            >
              Agregar producto
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default App;
