import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders brand navigation and cart badge", () => {
  render(<App />);
  expect(screen.getByText(/hermanos jota/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/carrito de compras/i)).toBeInTheDocument();
});
