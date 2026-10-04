import { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setSent(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.nombre.trim().length < 3) {
      newErrors.nombre =
        "El nombre debe tener al menos 3 caracteres.";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "El email es obligatorio.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Ingresá un email válido.";
    }

    if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje =
        "El mensaje debe tener al menos 10 caracteres.";
    }

    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      setSent(false);

      return;
    }

    setErrors({});
    setSent(true);

    console.log(
      "Formulario enviado:",
      formData
    );

    setFormData({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <section
      id="contacto-form"
      className="w-full rounded-xl bg-white p-6 shadow-[0_8px_24px_rgba(45,45,45,0.08)]"
      aria-labelledby="titulo-contacto"
    >

      <div className="mx-auto max-w-xl">

        <h2
          id="titulo-contacto"
          className="mb-2 font-titulos text-2xl font-bold uppercase tracking-[0.08em] text-[#A0522D]"
        >
          Contacto
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-[#2D2D2D]/70">
          Escribinos y te responderemos a la brevedad.
        </p>

        {sent && (
          <div
            className="mb-5 rounded-lg bg-[#87A96B]/20 p-4"
            role="status"
          >
            Mensaje enviado correctamente.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >

          <div className="flex flex-col gap-2">

            <label
              htmlFor="nombre"
              className="font-medium"
            >
              Nombre
            </label>

            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="rounded-lg border border-[#A0522D]/25 px-4 py-3 outline-none focus:border-[#87A96B] focus:ring-2 focus:ring-[#87A96B]/30"
              aria-describedby={
                errors.nombre
                  ? "error-nombre"
                  : undefined
              }
            />

            {errors.nombre && (
              <p
                id="error-nombre"
                className="text-sm text-red-700"
              >
                {errors.nombre}
              </p>
            )}

          </div>


          <div className="flex flex-col gap-2">

            <label
              htmlFor="email"
              className="font-medium"
            >
              Email
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="rounded-lg border border-[#A0522D]/25 px-4 py-3 outline-none focus:border-[#87A96B] focus:ring-2 focus:ring-[#87A96B]/30"
              aria-describedby={
                errors.email
                  ? "error-email"
                  : undefined
              }
            />

            {errors.email && (
              <p
                id="error-email"
                className="text-sm text-red-700"
              >
                {errors.email}
              </p>
            )}

          </div>


          <div className="flex flex-col gap-2">

            <label
              htmlFor="mensaje"
              className="font-medium"
            >
              Mensaje
            </label>

            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              value={formData.mensaje}
              onChange={handleChange}
              className="resize-y rounded-lg border border-[#A0522D]/25 px-4 py-3 outline-none focus:border-[#87A96B] focus:ring-2 focus:ring-[#87A96B]/30"
              aria-describedby={
                errors.mensaje
                  ? "error-mensaje"
                  : undefined
              }
            />

            {errors.mensaje && (
              <p
                id="error-mensaje"
                className="text-sm text-red-700"
              >
                {errors.mensaje}
              </p>
            )}

          </div>


          <button
            type="submit"
            className="rounded-lg bg-[#A0522D] px-5 py-3 font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-[#D4A437]"
          >
            Enviar mensaje
          </button>

        </form>

      </div>

    </section>
  );
}

export default ContactForm;