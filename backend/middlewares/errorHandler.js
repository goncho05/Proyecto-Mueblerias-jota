function rutaNoEncontrada(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.path}`);
  error.status = 404;
  next(error);
}

function manejadorErrores(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  let estado =
    Number.isInteger(error.status) && error.status >= 400 && error.status < 600
      ? error.status
      : 500;

  let mensaje = error.message;

  if (error.name === "CastError") {
    estado = 404;
    mensaje = "Producto no encontrado (ID inválido)";
  } else if (error.name === "ValidationError") {
    estado = 400;
    mensaje = Object.values(error.errors || {})
      .map((val) => val.message)
      .join(", ");
  }

  console.error(`${req.method} ${req.path} - ${estado}: ${mensaje}`);

  res.status(estado).json({
    error: {
      message: estado === 500 ? "Error interno del servidor" : mensaje,
    },
  });
}

export { rutaNoEncontrada, manejadorErrores };
