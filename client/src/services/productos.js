const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

export async function obtenerProductos({ signal } = {}) {
  const respuesta = await fetch(`${API_BASE_URL}/productos`, { signal });

  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el catálogo (${respuesta.status}).`);
  }

  const json = await respuesta.json();
  return Array.isArray(json) ? json : (json.data || []);
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

  const json = await respuesta.json();
  return json.data !== undefined ? json.data : json;
}

export async function crearProducto(datos) {
  const respuesta = await fetch(`${API_BASE_URL}/productos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(datos),
  });

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => null);
    throw new Error(
      errorData?.error?.message ||
        errorData?.error ||
        `Error al crear el producto (${respuesta.status}).`
    );
  }

  const json = await respuesta.json();
  return json.data !== undefined ? json.data : json;
}

export async function actualizarProducto(id, datos) {
  const respuesta = await fetch(
    `${API_BASE_URL}/productos/${encodeURIComponent(id)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datos),
    }
  );

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => null);
    throw new Error(
      errorData?.error?.message ||
        errorData?.error ||
        `Error al actualizar el producto (${respuesta.status}).`
    );
  }

  const json = await respuesta.json();
  return json.data !== undefined ? json.data : json;
}

export async function eliminarProducto(id) {
  const respuesta = await fetch(
    `${API_BASE_URL}/productos/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
    }
  );

  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => null);
    throw new Error(
      errorData?.error?.message ||
        errorData?.error ||
        `Error al eliminar el producto (${respuesta.status}).`
    );
  }

  return respuesta.json();
}

export function obtenerUrlImagen(imagen) {
  if (!imagen) {
    return "";
  }

  if (
    imagen.startsWith("http://") ||
    imagen.startsWith("https://") ||
    imagen.startsWith("data:")
  ) {
    return imagen;
  }

  const nombreArchivo = imagen.split(/[\\/]/).pop();
  const apiUrl = new URL(API_BASE_URL, window.location.origin);

  return new URL(
    `/assets/productos/${encodeURIComponent(nombreArchivo)}`,
    apiUrl.origin
  ).toString();
}
