const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:3001/api"
).replace(/\/+$/, "");

export async function obtenerProductos({ signal } = {}) {
  const respuesta = await fetch(`${API_BASE_URL}/productos`, { signal });

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el catálogo (${respuesta.status}).`);
  }

  return respuesta.json();
}

export async function obtenerProducto(id, { signal } = {}) {
  const respuesta = await fetch(
    `${API_BASE_URL}/productos/${encodeURIComponent(id)}`,
    { signal }
  );

  if (!respuesta.ok) {
    throw new Error(
      respuesta.status === 404
        ? "No se encontró el producto solicitado."
        : `No se pudo cargar el producto (${respuesta.status}).`
    );
  }

  return respuesta.json();
}

export function obtenerUrlImagen(imagen) {
  if (!imagen) {
    return "";
  }

  const nombreArchivo = imagen.split(/[\\/]/).pop();
  const apiUrl = new URL(API_BASE_URL, window.location.origin);

  return new URL(
    `/assets/productos/${encodeURIComponent(nombreArchivo)}`,
    apiUrl.origin
  ).toString();
}
