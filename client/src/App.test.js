import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

const producto = {
  id: 1,
  nombre: "Aparador Uspallata",
  precio: 1250000,
  categoria: "Almacenamiento",
  descripcion: "Mueble de prueba",
  especificaciones: { Materiales: "Nogal" },
};

beforeEach(() => {
  window.history.pushState({}, "", "/");
  global.fetch = jest.fn((url) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          url.endsWith("/productos") ? [producto] : producto
        ),
    })
  );
});

test("renders products from the API and loads the selected product detail", async () => {
  render(<App />);

  expect(
    screen.getByRole("link", { name: /hermanos jota/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/carrito de compras/i)).toBeInTheDocument();

  fireEvent.click(await screen.findByRole("button", { name: /ver detalle/i }));

  expect(await screen.findByText("Mueble de prueba")).toBeInTheDocument();
  expect(global.fetch).toHaveBeenCalledWith(
    "http://localhost:3001/api/productos/1",
    expect.objectContaining({ signal: expect.any(AbortSignal) })
  );
});

test("adds a product from the API to the cart", async () => {
  render(<App />);

  fireEvent.click(
    await screen.findByRole("button", { name: /agregar al carrito/i })
  );

  expect(screen.getByLabelText("Carrito de compras, 1 productos")).toBeInTheDocument();
});

test("navigates seamlessly across SPA routes via Navbar links", async () => {
  render(<App />);

  // Verificar que los enlaces del Navbar tienen las rutas correctas sin '#'
  const inicioLink = screen.getByRole("link", { name: /^inicio$/i });
  const catalogoLink = screen.getByRole("link", { name: /^catálogo$/i });
  const contactoLink = screen.getByRole("link", { name: /^contacto$/i });
  const adminLink = screen.getByRole("link", { name: /^administración$/i });

  expect(inicioLink).toHaveAttribute("href", "/");
  expect(catalogoLink).toHaveAttribute("href", "/productos");
  expect(contactoLink).toHaveAttribute("href", "/contacto");
  expect(adminLink).toHaveAttribute("href", "/admin/crear-producto");

  // Navegar a Contacto
  fireEvent.click(contactoLink);
  expect(
    await screen.findByRole("heading", { name: /^contacto$/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /preparar correo/i })).toBeInTheDocument();

  // Navegar a Administración
  fireEvent.click(adminLink);
  expect(
    await screen.findByRole("heading", { name: /crear nuevo producto/i })
  ).toBeInTheDocument();

  // Navegar a Catálogo
  fireEvent.click(catalogoLink);
  expect(
    await screen.findByRole("heading", { name: /catálogo de productos/i })
  ).toBeInTheDocument();

  // Navegar de regreso a Inicio
  fireEvent.click(inicioLink);
  expect(
    await screen.findByRole("heading", { name: /muebles con historia, para tu hogar/i })
  ).toBeInTheDocument();

  // Layout persistente: Navbar y Footer siempre presentes
  expect(screen.getByRole("navigation", { name: /navegación principal/i })).toBeInTheDocument();
  expect(screen.getByRole("contentinfo")).toBeInTheDocument();
});

test("renders Home when accessing /inicio directly", async () => {
  window.history.pushState({}, "", "/inicio");
  render(<App />);

  expect(
    await screen.findByRole("heading", { name: /muebles con historia, para tu hogar/i })
  ).toBeInTheDocument();
});

test("renders 404 view for unmatched routes", async () => {
  window.history.pushState({}, "", "/ruta-inexistente");
  render(<App />);

  expect(
    await screen.findByRole("heading", { name: /página no encontrada/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /volver al inicio/i })).toBeInTheDocument();
});
