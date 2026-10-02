function rutaNoEncontrada(req, res, next) {
  const error = new Error(`Ruta no encontrada: ${req.method} ${req.path}`);
  error.status = 404;
  next(error);
}

function manejadorErrores(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const estado = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
    ? error.status
    : 500;

  console.error(`${req.method} ${req.path} - ${estado}: ${error.message}`);

  res.status(estado).json({
    error: {
      message: estado === 500 ? "Error interno del servidor" : error.message,
    },
  });
}

module.exports = { rutaNoEncontrada, manejadorErrores };
