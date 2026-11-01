import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  obtenerProducto,
  obtenerUrlImagen,
} from "../services/productos";

function ProductoDetalle({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProducto() {
      try {
        setCargando(true);
        setError("");

        const respuesta = await obtenerProducto(id, {
          signal: controller.signal,
        });

        // El backend nuevo responde:
        // { data: producto, error: null }
        const productoRecibido =
          respuesta?.data ?? respuesta;

        setProducto(productoRecibido);
      } catch (errorPeticion) {
        if (errorPeticion.name !== "AbortError") {
          setError(
            errorPeticion.message ||
              "No se pudo cargar el producto."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarProducto();

    return () => controller.abort();
  }, [id]);

  if (cargando) {
    return (
      <p
        role="status"
        className="py-10 text-center text-[#A0522D]"
      >
        Cargando producto...
      </p>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl bg-red-50 p-6 text-center text-red-800"
      >
        <p>{error}</p>

        <button
          type="button"
          onClick={() => navigate("/productos")}
          className="mt-4 rounded-lg border border-red-800 px-4 py-2"
        >
          Volver al catálogo
        </button>
      </div>
    );
  }

  if (!producto) {
    return (
      <p className="py-10 text-center">
        Producto no encontrado.
      </p>
    );
  }

  return (
    <section className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
      <button
        type="button"
        onClick={() => navigate("/productos")}
        className="mb-6 text-sm font-semibold text-[#A0522D]"
      >
        ← Volver al catálogo
      </button>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          {producto.imagen && (
            <img
              src={obtenerUrlImagen(producto.imagen)}
              alt={producto.nombre}
              className="w-full rounded-xl object-cover"
            />
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className="m-0 text-sm font-semibold uppercase tracking-[0.1em] text-[#87A96B]">
            {producto.categoria}
          </p>

          <h1 className="font-titulos text-3xl font-bold text-[#A0522D]">
            {producto.nombre}
          </h1>

          <p className="leading-relaxed text-[#2D2D2D]/80">
            {producto.descripcion}
          </p>

          <p className="text-2xl font-bold text-[#A0522D]">
            {new Intl.NumberFormat("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            }).format(producto.precio)}
          </p>

          <p>
            <strong>Stock:</strong>{" "}
            {producto.stock > 0
              ? `${producto.stock} unidades`
              : "Sin stock"}
          </p>

          <button
            type="button"
            disabled={producto.stock === 0}
            onClick={() => onAddToCart?.(producto)}
            className="mt-3 w-fit rounded-lg bg-[#A0522D] px-6 py-3 font-medium text-white transition hover:bg-[#D4A437] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {producto.stock > 0
              ? "Agregar al carrito"
              : "Sin stock"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;