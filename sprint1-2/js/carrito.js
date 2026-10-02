const CLAVE_CARRITO = "hermanos-jota-carrito";

function leerCarrito() {
    try {
        const datos = localStorage.getItem(CLAVE_CARRITO);
        const carrito = datos ? JSON.parse(datos) : [];
        if (!Array.isArray(carrito)) {
            return [];
        }

        if (typeof productos !== "undefined") {
            return carrito.map(function (item) {
                const producto = productos.find(function (productoCatalogo) {
                    return String(productoCatalogo.id) === String(item.id);
                });

                if (Number(item.precio) === 0 && producto && Number(producto.precio) > 0) {
                    return Object.assign({}, item, { precio: Number(producto.precio) });
                }

                return item;
            });
        }

        return carrito;
    } catch (error) {
        return [];
    }
}

function guardarCarrito(carrito) {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
    actualizarContadorHeader();
}

function cantidadTotal(carrito) {
    return carrito.reduce(function (total, item) {
        return total + Number(item.cantidad || 0);
    }, 0);
}

function actualizarContadorHeader() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) {
        return;
    }
    contador.textContent = String(cantidadTotal(leerCarrito()));
}

function agregarAlCarrito(producto) {
    if (!producto || producto.id === undefined || producto.id === null || producto.id === "") {
        return;
    }

    const carrito = leerCarrito();
    const id = String(producto.id);
    const existente = carrito.find(function (item) {
        return String(item.id) === id;
    });

    if (existente) {
        existente.cantidad = Number(existente.cantidad || 0) + Number(producto.cantidad || 1);
        if (Number(existente.precio) === 0 && Number(producto.precio) > 0) {
            existente.precio = Number(producto.precio);
        }
    } else {
        carrito.push({
            id: id,
            nombre: producto.nombre || "Producto",
            precio: Number(producto.precio) || 0,
            imagen: producto.imagen || "",
            cantidad: Number(producto.cantidad || 1)
        });
    }

    guardarCarrito(carrito);
    renderizarPaginaCarrito();
}

function cambiarCantidad(id, nuevaCantidad) {
    const cantidad = Number(nuevaCantidad);
    if (cantidad < 1) {
        quitarProducto(id);
        return;
    }

    const carrito = leerCarrito().map(function (item) {
        if (String(item.id) === String(id)) {
            return Object.assign({}, item, { cantidad: cantidad });
        }
        return item;
    });

    guardarCarrito(carrito);
    renderizarPaginaCarrito();
}

function quitarProducto(id) {
    const carrito = leerCarrito().filter(function (item) {
        return String(item.id) !== String(id);
    });
    guardarCarrito(carrito);
    renderizarPaginaCarrito();
}

function vaciarCarrito() {
    guardarCarrito([]);
    renderizarPaginaCarrito();
}

function formatearPrecio(valor) {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS"
    }).format(Number(valor) || 0);
}

function resolverImagenCarrito(rutaImagen) {
    if (!rutaImagen) {
        return "";
    }

    if (/^(https?:|file:|data:|blob:)/i.test(rutaImagen)) {
        return rutaImagen;
    }

    const rutaDesdeRaiz = rutaImagen.replace(/^(\.\.\/)+/, "");
    return new URL("../" + rutaDesdeRaiz, document.baseURI).href;
}

function renderizarPaginaCarrito() {
    const lista = document.getElementById("lista-carrito");
    const vacio = document.getElementById("carrito-vacio");
    const resumen = document.getElementById("carrito-resumen");
    const total = document.getElementById("carrito-total");

    if (!lista) {
        return;
    }

    const carrito = leerCarrito();
    lista.innerHTML = "";

    if (carrito.length === 0) {
        if (vacio) {
            vacio.hidden = false;
        }
        if (resumen) {
            resumen.hidden = true;
        }
        return;
    }

    if (vacio) {
        vacio.hidden = true;
    }
    if (resumen) {
        resumen.hidden = false;
    }

    let importeTotal = 0;

    carrito.forEach(function (item) {
        const subtotal = Number(item.precio) * Number(item.cantidad);
        importeTotal += subtotal;

        const articulo = document.createElement("article");
        articulo.className = "carrito-item";
        articulo.dataset.id = String(item.id);

        const imagen = resolverImagenCarrito(item.imagen)
            ? '<img src="' + resolverImagenCarrito(item.imagen) + '" alt="" class="carrito-item__imagen">'
            : '<div class="carrito-item__imagen carrito-item__imagen--vacia" aria-hidden="true"></div>';

        articulo.innerHTML =
            imagen +
            '<div class="carrito-item__info">' +
                "<h3>" + item.nombre + "</h3>" +
                '<p class="carrito-item__precio">' + formatearPrecio(item.precio) + "</p>" +
            "</div>" +
            '<div class="carrito-item__acciones">' +
                '<div class="carrito-item__cantidad">' +
                    '<button type="button" class="carrito-item__boton" data-accion="restar" aria-label="Restar unidad">−</button>' +
                    '<span>' + item.cantidad + "</span>" +
                    '<button type="button" class="carrito-item__boton" data-accion="sumar" aria-label="Sumar unidad">+</button>' +
                "</div>" +
                '<p class="carrito-item__subtotal">' + formatearPrecio(subtotal) + "</p>" +
                '<button type="button" class="carrito-item__quitar" data-accion="quitar">Quitar</button>' +
            "</div>";

        lista.appendChild(articulo);
    });

    if (total) {
        total.textContent = formatearPrecio(importeTotal);
    }
}

function productoDesdeBoton(boton) {
    return {
        id: boton.dataset.id,
        nombre: boton.dataset.nombre,
        precio: boton.dataset.precio,
        imagen: boton.dataset.imagen,
        cantidad: boton.dataset.cantidad
    };
}

document.addEventListener("click", function (evento) {
    const botonAgregar = evento.target.closest(".agregar-carrito, [data-agregar-carrito]");
    if (botonAgregar) {
        evento.preventDefault();
        agregarAlCarrito(productoDesdeBoton(botonAgregar));
        return;
    }

    const item = evento.target.closest(".carrito-item");
    if (!item) {
        const botonVaciar = evento.target.closest("[data-vaciar-carrito]");
        if (botonVaciar) {
            vaciarCarrito();
        }
        return;
    }

    const accion = evento.target.closest("[data-accion]");
    if (!accion) {
        return;
    }

    const id = item.dataset.id;
    const actual = leerCarrito().find(function (producto) {
        return String(producto.id) === String(id);
    });
    const cantidadActual = actual ? Number(actual.cantidad) : 1;

    if (accion.dataset.accion === "sumar") {
        cambiarCantidad(id, cantidadActual + 1);
    } else if (accion.dataset.accion === "restar") {
        cambiarCantidad(id, cantidadActual - 1);
    } else if (accion.dataset.accion === "quitar") {
        quitarProducto(id);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    actualizarContadorHeader();
    renderizarPaginaCarrito();
});

window.Carrito = {
    leer: leerCarrito,
    agregar: agregarAlCarrito,
    cambiarCantidad: cambiarCantidad,
    quitar: quitarProducto,
    vaciar: vaciarCarrito,
    actualizarContador: actualizarContadorHeader
};
