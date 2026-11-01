import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminCrearProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = Boolean(id);

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    imagen: ''
  });

  useEffect(() => {
    if (esEdicion) {
      fetch(`http://localhost:5000/api/productos/${id}`)
        .then(res => res.json())
        .then(data => setFormData(data))
        .catch(err => console.error("Error obteniendo producto:", err));
    }
  }, [id, esEdicion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = esEdicion
      ? `http://localhost:5000/api/productos/${id}`
      : 'http://localhost:5000/api/productos';
    const method = esEdicion ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert(`Producto ${esEdicion ? 'actualizado' : 'creado'} correctamente.`);
        navigate('/productos');
      } else {
        alert("Error al procesar la solicitud del producto.");
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{esEdicion ? 'Editar Producto' : 'Crear Producto'}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} required className="border p-2 rounded" />
        <textarea name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="categoria" placeholder="Categoría" value={formData.categoria} onChange={handleChange} required className="border p-2 rounded" />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required className="border p-2 rounded" />
        <input type="text" name="imagen" placeholder="URL de la imagen" value={formData.imagen} onChange={handleChange} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {esEdicion ? 'Guardar Cambios' : 'Crear Producto'}
        </button>
      </form>
    </div>
  );
};

export default AdminCrearProducto;