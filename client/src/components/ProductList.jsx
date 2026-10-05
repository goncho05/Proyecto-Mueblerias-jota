import { useCallback, useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { obtenerProductos } from "../services/productos";

function ProductList({ onSelectProduct, onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  const retry = useCallback(() => setReload((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        const result = await obtenerProductos({ signal: controller.signal });
        setProducts(result);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();
    return () => controller.abort();
  }, [reload]);

  if (loading) {
    return <p role="status">Cargando productos...</p>;
  }

  if (error) {
    return (
      <div role="alert" className="rounded-lg bg-red-50 p-4 text-red-800">
        <p className="m-0">{error}</p>
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-red-800 px-4 py-2 text-sm font-medium"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return <p>Por el momento no hay productos disponibles.</p>;
  }

  return (
    <div className="grid w-full gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={onSelectProduct}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
