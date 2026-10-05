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
