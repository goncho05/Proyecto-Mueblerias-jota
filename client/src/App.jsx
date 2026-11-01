import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";

// Vista de Catálogo de Productos
function CatalogView({ onAddToCart }) {
  const navigate = useNavigate();

  return (
    <section className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
      <div className="mb-6 border-b border-[#A0522D]/15 pb-4">
        <h1 className="font-titulos text-2xl font-bold uppercase tracking-[0.1em] text-[#A0522D] md:text-3xl">
          Catálogo de Productos
        </h1>
        <p className="mt-1 text-sm text-[#2D2D2D]/75">
          Descubrí todas nuestras creaciones artesanales en madera maciza seleccionada.
        </p>
      </div>

      <ProductList
        onSelectProduct={(id) => navigate(`/productos/${id}`)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
}

// Vista de Detalle de Producto
function ProductDetailView({ onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <ProductDetail
        productId={id}
        onClose={() => navigate("/productos")}
        onAddToCart={onAddToCart}
      />
    </div>
  );
}

// Vista de Contacto
function ContactView() {
  return (
    <div className="w-full">
      <ContactForm />
    </div>
  );
}

// Vista de Administración (preparada para el módulo de alta de productos)
function AdminCreateProductView() {
  return (
    <section className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
      <div className="mb-6 border-b border-[#A0522D]/15 pb-4">
        <span className="inline-block rounded-full bg-[#A0522D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#A0522D]">
          Panel de Administración
        </span>
        <h1 className="mt-2 font-titulos text-2xl font-bold uppercase tracking-[0.08em] text-[#A0522D] md:text-3xl">
          Crear Nuevo Producto
        </h1>
        <p className="mt-1 text-sm text-[#2D2D2D]/75">
          Módulo administrativo para dar de alta nuevos muebles y piezas en el catálogo.
        </p>
      </div>

      <div className="rounded-xl border-2 border-dashed border-[#A0522D]/30 bg-[#F5E6D3]/20 p-8 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#A0522D]/10 text-[#A0522D]">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <h2 className="mt-4 font-titulos text-lg font-bold text-[#2D2D2D]">
            Ruta Preparada para Gestión de Catálogo
          </h2>
          <p className="mt-2 text-sm text-[#2D2D2D]/80">
            Esta sección queda integrada en el sistema de ruteo para el desarrollo del formulario de creación y administración de productos.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              to="/productos"
              className="rounded-lg bg-[#A0522D] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-[#D4A437]"
            >
              Ir al Catálogo
            </Link>
            <Link
              to="/"
              className="rounded-lg border border-[#A0522D] px-5 py-2.5 text-sm font-medium text-[#A0522D] no-underline transition hover:bg-[#A0522D]/10"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Vista 404 No Encontrado
function NotFoundView() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-[0_8px_24px_rgba(45,45,45,0.08)]">
      <span className="font-titulos text-6xl font-bold text-[#A0522D]">404</span>
      <h1 className="mt-4 font-titulos text-2xl font-bold text-[#2D2D2D]">
        Página no encontrada
      </h1>
      <p className="mt-2 max-w-md text-sm text-[#2D2D2D]/80">
        La ruta solicitada no existe o ha sido movida. Te sugerimos volver al inicio o recorrer el catálogo.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/"
          className="rounded-lg bg-[#A0522D] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:bg-[#D4A437]"
        >
          Volver al Inicio
        </Link>
        <Link
          to="/productos"
          className="rounded-lg border border-[#A0522D] px-5 py-2.5 text-sm font-medium text-[#A0522D] no-underline transition hover:bg-[#A0522D]/10"
        >
          Ver Catálogo
        </Link>
      </div>
    </section>
  );
}

// Contenedor principal con Layout persistente (Navbar y Footer) y contenido dinámico
function AppContent() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

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
      {/* Layout persistente: Navbar fuera de las Routes */}
      <Navbar cartCount={cartCount} />

      {/* Contenido dinámico según la ruta activa */}
      <main className="mx-auto flex w-full max-w-[1120px] flex-1 flex-col px-5 py-10">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onSelectProduct={(id) => navigate(`/productos/${id}`)}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/inicio"
            element={
              <Home
                onSelectProduct={(id) => navigate(`/productos/${id}`)}
                onAddToCart={addToCart}
              />
            }
          />
          <Route
            path="/productos"
            element={<CatalogView onAddToCart={addToCart} />}
          />
          <Route
            path="/productos/:id"
            element={<ProductDetailView onAddToCart={addToCart} />}
          />
          <Route
            path="/contacto"
            element={<ContactView />}
          />
          <Route
            path="/admin/crear-producto"
            element={<AdminCreateProductView />}
          />
          <Route
            path="*"
            element={<NotFoundView />}
          />
        </Routes>
      </main>

      {/* Layout persistente: Footer fuera de las Routes */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;

