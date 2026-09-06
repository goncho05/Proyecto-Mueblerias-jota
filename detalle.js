document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE LA VISTA DE DETALLE ---
    // Verificamos si estamos en producto.html buscando el título
    const tituloDetalle = document.getElementById('detalle-titulo');
    
    if (tituloDetalle) {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idBuscado = parametrosURL.get('id');
        const productoEncontrado = productos.find(mueble => mueble.id === idBuscado);

    if (productoEncontrado) {
        // Cambiar dinámicamente el título de la página en la pestaña del navegador
        document.title = `${productoEncontrado.nombre} - Mueblerías Jota`;
        document.getElementById('detalle-imagen').src = productoEncontrado.imagen;
        document.getElementById('detalle-imagen').alt = `Imagen de ${productoEncontrado.nombre}`;
        tituloDetalle.textContent = productoEncontrado.nombre;
        document.getElementById('detalle-descripcion').textContent = productoEncontrado.descripcion;

        const contenedorEspecificaciones = document.getElementById('detalle-especificaciones');
        const especificaciones = productoEncontrado.especificaciones || {};
        const claves = Object.keys(especificaciones);
        let especificacionesHTML = '';

        claves.forEach((clave) => {
            especificacionesHTML += `<dt>${clave}</dt><dd>${especificaciones[clave]}</dd>`;
        });

        if (contenedorEspecificaciones) {
            contenedorEspecificaciones.innerHTML = especificacionesHTML;
        }

        const precioEl = document.getElementById('detalle-precio');
        if (precioEl) {
            if (typeof productoEncontrado.precio === 'number') {
                precioEl.textContent = `$${productoEncontrado.precio.toLocaleString('es-AR')}`;
            } else {
                precioEl.textContent = '';
            }
        }

        const btnCarrito = document.getElementById('btn-agregar-carrito');
        if (btnCarrito) {
            btnCarrito.classList.add('agregar-carrito');
            btnCarrito.dataset.id = productoEncontrado.id;
            btnCarrito.dataset.nombre = productoEncontrado.nombre;
            btnCarrito.dataset.precio = productoEncontrado.precio || '';
            btnCarrito.dataset.imagen = productoEncontrado.imagen || '';
        }
        } else {
            tituloDetalle.textContent = "Producto no encontrado";
            document.getElementById('detalle-descripcion').textContent = "El mueble que buscás no existe o fue retirado del catálogo.";

            const precioEl = document.getElementById('detalle-precio');
            if (precioEl) {
                precioEl.textContent = '';
            }

            const contenedorEspecificaciones = document.getElementById('detalle-especificaciones');
            if (contenedorEspecificaciones) {
                contenedorEspecificaciones.innerHTML = '';
            }
            
            const btnCarrito = document.getElementById('btn-agregar-carrito');
            if (btnCarrito) btnCarrito.style.display = 'none';
        }

    }

    // --- 2. LÓGICA DEL BUSCADOR EN VIVO ---
    const inputBuscador = document.getElementById('buscador-productos');
    const contenedorGrilla = document.querySelector('.grid-productos');
    
    // Verificamos que existan el input y la grilla
    if (inputBuscador && contenedorGrilla) {
        inputBuscador.addEventListener('input', (evento) => {
            const textoBusqueda = evento.target.value.toLowerCase().trim();

            const productosFiltrados = productos.filter(mueble => 
                mueble.nombre.toLowerCase().includes(textoBusqueda)
            );

            if (typeof renderizarGrilla === 'function') {
                renderizarGrilla(productosFiltrados);
            }
        });
    }
});