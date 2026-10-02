const { performance } = require("node:perf_hooks");

function registrarSolicitud(req, res, next) {
  const inicio = performance.now();
  const ruta = req.path;

  res.on("finish", () => {
    const duracion = (performance.now() - inicio).toFixed(1);
    console.info(`${req.method} ${ruta} ${res.statusCode} ${duracion}ms`);
  });

  next();
}

module.exports = registrarSolicitud;
