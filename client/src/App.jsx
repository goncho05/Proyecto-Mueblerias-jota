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
import AdminProductForm from "./components/AdminProductForm";

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

// Vista de Administración (módulo de alta de productos)
function AdminCreateProductView() {
  return <AdminProductForm />;
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
    const prodId = product._id || product.id;
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => (item._id || item.id) === prodId);

      if (existingItem) {
        return prevCart.map((item) =>
          (item._id || item.id) === prodId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, id: prodId, quantity: 1 }];
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
            path="/admin/editar-producto/:id"
            element={<AdminProductForm />}
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
