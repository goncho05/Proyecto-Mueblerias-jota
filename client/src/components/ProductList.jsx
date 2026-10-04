import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "http://localhost:3001/api/productos"
        );

        if (!response.ok) {
          throw new Error(
            `Error ${response.status}: no se pudieron cargar los productos`
          );
        }

        const data = await response.json();

        setProducts(data);

      } catch (err) {
        console.error(
          "Error al cargar productos:",
          err
        );

        setError(
          "No pudimos cargar el catálogo. Intentá nuevamente más tarde."
        );

      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <section
        className="py-10 text-center"
        aria-live="polite"
      >
        <p className="text-[#A0522D]">
          Cargando productos...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="rounded-xl bg-red-50 p-6 text-center"
        role="alert"
      >
        <p className="font-medium text-red-700">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section
      id="productos"
      aria-labelledby="titulo-productos"
      className="w-full"
    >

      <div className="mb-8">

        <h2
          id="titulo-productos"
          className="font-titulos text-2xl font-bold uppercase tracking-[0.1em] text-[#A0522D]"
        >
          Catálogo
        </h2>

        <p className="mt-3 text-sm text-[#2D2D2D]/70">
          {products.length} productos disponibles
        </p>

      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}

      </div>

    </section>
  );
}

export default ProductList;