import { useState } from "react";

function ContactForm() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const subject = encodeURIComponent(`Consulta de ${form.nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${form.nombre}\nCorreo: ${form.email}\n\n${form.mensaje}`
    );

    window.location.href = `mailto:info@hermanosjota.com.ar?subject=${subject}&body=${body}`;
  }

  return (
    <section
      id="contacto"
      className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]"
    >
      <h2 className="mb-2 font-titulos text-xl font-bold uppercase tracking-[0.1em] text-[#A0522D]">
        Contacto
      </h2>
      <p className="mb-5 mt-0 text-sm text-[#2D2D2D]/80">
        Al enviar, se abrirá tu aplicación de correo con la consulta preparada.
      </p>
      <form onSubmit={handleSubmit} className="grid gap-4 md:max-w-2xl">
        <label className="grid gap-1 text-sm font-medium">
          Nombre
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="rounded-lg border border-[#A0522D]/30 px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Correo electrónico
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="rounded-lg border border-[#A0522D]/30 px-3 py-2"
          />
        </label>
        <label className="grid gap-1 text-sm font-medium">
          Mensaje
          <textarea
            name="mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
            rows="4"
            className="rounded-lg border border-[#A0522D]/30 px-3 py-2"
          />
        </label>
        <button
          type="submit"
          className="w-fit rounded-lg bg-[#A0522D] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#D4A437]"
        >
          Preparar correo
        </button>
      </form>
    </section>
  );
}

export default ContactForm;
