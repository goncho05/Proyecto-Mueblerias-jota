const gridDestacados =
    document.querySelector(
        "#grid-destacados"
    );


function crearTarjetaDestacada(producto) {
    const articulo =
        document.createElement("article");

    articulo.classList.add(
        "tarjeta-producto"
    );

    articulo.innerHTML = `
        <img
            src="${producto.imagen}"
            alt="${producto.nombre}"
            class="tarjeta-producto__imagen"
            loading="lazy"
        >

        <div class="tarjeta-producto__contenido">

            <span class="tarjeta-producto__categoria">
                ${producto.categoria}
            </span>

            <h3>
                ${producto.nombre}
            </h3>

            <p>
                ${producto.descripcion}
            </p>

            <a
                href="producto.html?id=${producto.id}"
                class="boton-primario"
                aria-label="Ver detalle de ${producto.nombre}"
            >
                Ver producto
            </a>

        </div>
    `;

    return articulo;
}


async function cargarDestacados() {
    if (!gridDestacados) {
        return;
    }

    try {
        const productosCargados =
            await cargarProductos();

        const destacados =
            productosCargados
                .filter(
                    (producto) =>
                        producto.destacado
                )
                .slice(0, 4);

        const fragmento =
            document.createDocumentFragment();

        destacados.forEach(
            (producto) => {
                const tarjeta =
                    crearTarjetaDestacada(
                        producto
                    );

                fragmento.appendChild(
                    tarjeta
                );
            }
        );

        gridDestacados.appendChild(
            fragmento
        );

    } catch (error) {
        console.error(
            "Error al cargar productos destacados:",
            error
        );
    }
}


document.addEventListener(
    "DOMContentLoaded",
    cargarDestacados
);