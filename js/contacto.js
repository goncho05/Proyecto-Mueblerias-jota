const formulario = document.getElementById("formulario-contacto");
        const mensajeExito = document.getElementById("mensaje-exito");
        const campos = {
            nombre: document.getElementById("nombre"),
            email: document.getElementById("email"),
            mensaje: document.getElementById("mensaje")
        };
        const errores = {
            nombre: document.getElementById("error-nombre"),
            email: document.getElementById("error-email"),
            mensaje: document.getElementById("error-mensaje")
        };
        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function validarCampo(nombreCampo) {
            const valor = campos[nombreCampo].value.trim();
            let textoError = "";

            if (nombreCampo === "nombre") {
                if (valor.length < 2) {
                    textoError = "Ingresá tu nombre (mínimo 2 caracteres).";
                }
            }

            if (nombreCampo === "email") {
                if (!emailValido.test(valor)) {
                    textoError = "Ingresá un email válido.";
                }
            }

            if (nombreCampo === "mensaje") {
                if (valor.length < 10) {
                    textoError = "El mensaje debe tener al menos 10 caracteres.";
                }
            }

            errores[nombreCampo].textContent = textoError;
            campos[nombreCampo].classList.toggle("is-invalid", Boolean(textoError));
            return !textoError;
        }

        Object.keys(campos).forEach(function (nombreCampo) {
            campos[nombreCampo].addEventListener("blur", function () {
                validarCampo(nombreCampo);
            });
            campos[nombreCampo].addEventListener("input", function () {
                if (errores[nombreCampo].textContent) {
                    validarCampo(nombreCampo);
                }
            });
        });

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            mensajeExito.classList.remove("is-visible");
            mensajeExito.textContent = "";

            const nombreOk = validarCampo("nombre");
            const emailOk = validarCampo("email");
            const mensajeOk = validarCampo("mensaje");

            if (nombreOk && emailOk && mensajeOk) {
                mensajeExito.textContent = "Gracias por tu consulta. Te responderemos a la brevedad.";
                mensajeExito.classList.add("is-visible");
                formulario.reset();
                Object.keys(campos).forEach(function (nombreCampo) {
                    campos[nombreCampo].classList.remove("is-invalid");
                    errores[nombreCampo].textContent = "";
                });
            }
        });