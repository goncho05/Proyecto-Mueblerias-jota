import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Contacto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ac+a iría el fetch POST a la ruta de contacto de la API
    console.log("Payload enviado:", formData);
    alert("¡Mensaje enviado con éxito! Te contactaremos pronto.");
    navigate('/');
  };

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-gray-50 p-6 rounded shadow border">
        <h2 className="text-2xl font-bold mb-2">Contacto</h2>
        <input type="text" name="nombre" placeholder="Tu nombre" value={formData.nombre} onChange={handleChange} required className="border p-2 rounded" />
        <input type="email" name="email" placeholder="Tu correo electrónico" value={formData.email} onChange={handleChange} required className="border p-2 rounded" />
        <textarea name="mensaje" placeholder="Escribe tu mensaje aquí..." value={formData.mensaje} onChange={handleChange} required rows="5" className="border p-2 rounded" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700 font-semibold">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default Contacto;