# Mueblería Hermanos Jota — E-commerce (Sprint 5 y 6)

Aplicación web full stack para la Mueblería Hermanos Jota con persistencia en MongoDB y operaciones CRUD completas. Incluye un cliente en React con React Router DOM y una API RESTful en Node.js y Express conectada con Mongoose.

## 👥 Integrantes
- Juan Diego Cumbeto
- Leonardo Docimo
- Delfina Herrera
- Gonzalo Esteban Ibrahim
- Valentina Rudelli

---

## 🌐 Enlaces de Despliegue (Entregables)
- **Frontend (Vercel / Netlify):** `[Coloca aquí el enlace a tu frontend desplegado]`
- **Backend (Render):** `[Coloca aquí el enlace a tu API en Render]/api/productos`

---

## 🏗️ Arquitectura del Proyecto

```
Proyecto-Mueblerias-jota/
├── backend/
│   ├── config/             # Conexión a MongoDB (db.js)
│   ├── controllers/        # Controladores CRUD (producto.controller.js)
│   ├── data/               # Catálogo inicial de muestra (productos.js)
│   ├── middlewares/        # Logger y manejador centralizado de errores
│   ├── models/             # Esquema y modelo Mongoose (product.js)
│   ├── routes/             # Enrutador Express (/api/productos)
│   ├── seed.js             # Script para inicializar/poblar la base de datos
│   └── server.js           # Servidor Express principal
└── client/
    ├── src/
    │   ├── components/     # ProductList, ProductCard, ProductDetail, AdminProductForm, Navbar, Footer
    │   ├── pages/          # Home, etc.
    │   ├── services/       # Cliente HTTP (fetch) para el CRUD contra la API
    │   └── App.jsx         # Ruteo dinámico con React Router DOM
```

---

## 📡 API RESTful (Endpoints)

| Método | Endpoint | Descripción | Código de éxito |
| :--- | :--- | :--- | :---: |
| `GET` | `/api/productos` | Devuelve todos los productos | 200 OK |
| `GET` | `/api/productos/:id` | Devuelve un producto por `_id` | 200 OK |
| `POST` | `/api/productos` | Crea un producto en la base de datos | 201 Created |
| `PUT` | `/api/productos/:id` | Actualiza un producto existente | 200 OK |
| `DELETE` | `/api/productos/:id` | Elimina un producto por `_id` | 200 OK |

---

## ⚙️ Variables de Entorno

### Backend (`backend/.env`)
```env
PORT=5000
# Para desarrollo local:
MONGO_URI=mongodb://127.0.0.1:27017/muebleria_jota
# Para producción en Render (MongoDB Atlas en la nube):
# MONGO_URI=mongodb+srv://<usuario>:<password>@cluster0.xxxxx.mongodb.net/muebleria_jota?retryWrites=true&w=majority
```

### Frontend (`client/.env`)
```env
# Para desarrollo local:
REACT_APP_API_URL=http://localhost:5000/api
# Para producción en Vercel/Netlify:
# REACT_APP_API_URL=https://tu-backend-en-render.onrender.com/api
```

---

## 🚀 Instalación y Ejecución Local

### 1. Backend
1. Ingresar a la carpeta del servidor:
   ```bash
   cd backend
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar `.env` con las variables `PORT` y `MONGO_URI`.
4. (Opcional) Poblar la base de datos con los 11 productos de muestra:
   ```bash
   npm run seed
   ```
5. Iniciar el servidor backend:
   ```bash
   npm start
   ```
   Estará corriendo en `http://localhost:5000`.

### 2. Frontend (Client)
1. Abrir otra terminal e ingresar a la carpeta del cliente:
   ```bash
   cd client
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar la aplicación React:
   ```bash
   npm start
   ```
   Estará disponible en `http://localhost:3000`.

---

## 🧭 Rutas del Frontend (React Router DOM)
- `/` — Inicio
- `/productos` — Catálogo dinámico conectado al backend
- `/productos/:id` — Detalle del producto con `useParams`, agregar al carrito y botón para eliminar
- `/contacto` — Formulario de contacto
- `/admin/crear-producto` — Alta de producto con formulario controlado (`POST /api/productos`)
- `/admin/editar-producto/:id` — Edición de producto con formulario precargado (`PUT /api/productos/:id`)
