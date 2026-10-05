# Mueblería Hermanos Jota — E-commerce

Aplicación web de catálogo para la Mueblería Hermanos Jota. Incluye un
frontend en React, una API REST en Node.js y Express, consulta de productos,
vista de detalle y carrito de compras en memoria.

## Integrantes

- Juan Diego Cumbeto
- Leonardo Docimo
- Delfina Herrera
- Gonzalo Esteban Ibrahim
- Valentina Rudelli

Arquitectura
/backend   → API REST con Node.js + Express
/client    → Frontend con React (creado con create-react-app)
El frontend ya no tiene los productos hardcodeados: los pide al backend con fetch a GET /api/productos. El backend expone los datos que antes vivían en productos.js del lado del cliente.
Backend: server.js centraliza la configuración; las rutas están separadas en routes/productos.routes.js con express.Router, y hay dos middlewares propios: logger.js (loguea método y URL de cada solicitud) y errorHandler.js (maneja 404 y errores de forma centralizada).
Frontend: App.js es el único componente con estado global (la vista actual y el carrito). El resto de los componentes (Navbar, ProductList, ProductCard, ProductDetail, ContactForm, Footer) reciben lo que necesitan por props y no comparten estado entre sí directamente.
Decisiones tomadas
El carrito vive como estado en App.js (no en cada componente) porque el contador tiene que verse en el Navbar y el botón de agregar está en ProductDetail — dos componentes distintos necesitan la misma información.
La navegación entre catálogo/detalle/contacto se resuelve con renderizado condicional según un estado vista, sin librería de rutas, porque la consigna no pide React Router.
El backend corre en el puerto 3001 y el cliente en el 3000 (el que usa create-react-app por defecto), por eso el backend necesita el middleware cors.
Instalación y ejecución
Backend
bash
cd backend
npm install
node server.js
Corre en http://localhost:3001. Podés probar GET http://localhost:3001/api/productos desde Postman o el navegador.
Frontend
En otra terminal:
bash
cd client
npm install
npm start
Corre en http://localhost:3000 y consume la API del backend.
Los dos servidores tienen que estar corriendo al mismo tiempo, en terminales separadas.
