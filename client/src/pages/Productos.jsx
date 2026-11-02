import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { obtenerProductos } from "../services/productos";

function Productos({ onAddToCart }) {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProductos() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await obtenerProductos({
          signal: controller.signal,
        });

        // El backend nuevo responde:
        // { data: [...], error: null }
        const lista = Array.isArray(respuesta)
          ? respuesta
          : respuesta.data;

        setProductos(lista || []);
      } catch (errorPeticion) {
        if (errorPeticion.name !== "AbortError") {
          setError(
            errorPeticion.message ||
              "No se pudieron cargar los productos."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProductos();

    return () => controller.abort();
  }, []);

  if (cargando) {
    return (
      <p
        role="status"
        className="py-10 text-center text-[#A0522D]"
      >
        Cargando productos...
      </p>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl bg-red-50 p-6 text-center text-red-800"
      >
        {error}
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="mb-8">
        <h1 className="font-titulos text-2xl font-bold uppercase tracking-[0.1em] text-[#A0522D] md:text-3xl">
          Catálogo de Productos
        </h1>

        <p className="mt-2 text-sm text-[#2D2D2D]/75">
          Descubrí nuestra colección de muebles artesanales.
        </p>
      </div>

      {productos.length === 0 ? (
        <p className="py-8 text-center">
          No hay productos disponibles.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto) => (
            <ProductCard
              key={producto._id || producto.id}
              product={producto}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default Productos;