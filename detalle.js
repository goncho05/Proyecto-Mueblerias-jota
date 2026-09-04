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
            document.getElementById('detalle-precio').textContent = `$${productoEncontrado.precio.toLocaleString('es-AR')}`;

            const contenedorEspecificaciones = document.getElementById('detalle-especificaciones');
            let especificacionesHTML = '';
            for (const [clave, valor] of Object.entries(productoEncontrado.especificaciones)) {
                especificacionesHTML += `<dt>${clave}</dt><dd>${valor}</dd>`;
            }
            contenedorEspecificaciones.innerHTML = especificacionesHTML;
        } else {
            tituloDetalle.textContent = "Producto no encontrado";
            document.getElementById('detalle-descripcion').textContent = "El mueble que buscás no existe o fue retirado del catálogo.";
            
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