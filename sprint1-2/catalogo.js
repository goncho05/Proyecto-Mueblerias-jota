const gridProductos = document.querySelector("#grid-productos");
const estadoCatalogo = document.querySelector("#estado-catalogo");


function crearTarjetaProducto(producto) {
    const articulo = document.createElement("article");

    articulo.classList.add("tarjeta-producto");

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

            <h2>
                ${producto.nombre}
            </h2>

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


function renderizarGrilla(listaProductos) {
    if (!gridProductos) {
        return;
    }

    gridProductos.innerHTML = "";

    if (listaProductos.length === 0) {
        estadoCatalogo.textContent =
            "No encontramos productos que coincidan con tu búsqueda.";

        return;
    }

    const fragmento = document.createDocumentFragment();

    listaProductos.forEach((producto) => {
        const tarjeta = crearTarjetaProducto(producto);

        fragmento.appendChild(tarjeta);
    });

    gridProductos.appendChild(fragmento);

    estadoCatalogo.textContent =
        `${listaProductos.length} productos encontrados.`;
}


async function iniciarCatalogo() {
    if (!gridProductos) {
        return;
    }

    try {
        estadoCatalogo.textContent =
            "Cargando productos...";

        const catalogo = await cargarProductos();

        renderizarGrilla(catalogo);

    } catch (error) {
        console.error(
            "Error al cargar el catálogo:",
            error
        );

        estadoCatalogo.textContent =
            "No pudimos cargar el catálogo.";
    }
}


document.addEventListener(
    "DOMContentLoaded",
    iniciarCatalogo
);