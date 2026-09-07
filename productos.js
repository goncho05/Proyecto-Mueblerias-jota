const productos = [
    {
        id: "1",
        nombre: "Aparador Uspallata",
        precio: 1250000,
        categoria: "Almacenamiento",
        descripcion:
            "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        imagen: "Kit de imágenes/Aparador Uspallata.png",
        destacado: true,
        especificaciones: {
            Medidas: "180 × 45 × 75 cm",
            Materiales: "Nogal macizo FSC®, herrajes de latón",
            Acabado: "Aceite natural ecológico",
            Peso: "68 kg",
            Capacidad: "6 compartimentos interiores"
        }
    },
    {
        id: "2",
        nombre: "Biblioteca Recoleta",
        precio: 980000,
        categoria: "Almacenamiento",
        descripcion:
            "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        imagen: "Kit de imágenes/Biblioteca Recoleta.png",
        destacado: true,
        especificaciones: {
            Medidas: "100 × 35 × 200 cm",
            Materiales: "Estructura de acero, estantes de roble",
            Acabado: "Laca mate ecológica",
            Capacidad: "45 kg por estante",
            Modulares: "5 estantes ajustables"
        }
    },
    {
        id: "3",
        nombre: "Butaca Mendoza",
        precio: 540000,
        categoria: "Asientos",
        descripcion:
            "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación.",
        imagen: "Kit de imágenes/Butaca Mendoza.png",
        destacado: true,
        especificaciones: {
            Medidas: "80 × 75 × 85 cm",
            Materiales: "Guatambú macizo, tela bouclé",
            Acabado: "Cera vegetal, tapizado premium",
            Tapizado: "Repelente al agua y manchas",
            Confort: "Espuma alta densidad"
        }
    },
    {
        id: "4",
        nombre: "Sillón Copacabana",
        precio: 780000,
        categoria: "Asientos",
        descripcion:
            "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los años 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        imagen: "Kit de imágenes/Sillón Copacabana.png",
        destacado: true,
        especificaciones: {
            Medidas: "90 × 85 × 95 cm",
            Materiales: "Cuero curtido vegetal, acero pintado",
            Acabado: "Cuero anilina premium",
            Rotación: "360° silenciosa y suave",
            Garantía: "10 años en estructura"
        }
    },
    {
        id: "5",
        nombre: "Mesa de Centro Araucaria",
        precio: 620000,
        categoria: "Mesas",
        descripcion:
            "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista combina la frialdad del mármol con la calidez de la madera.",
        imagen: "Kit de imágenes/Mesa de Centro Araucaria.png",
        destacado: false,
        especificaciones: {
            Medidas: "90 × 90 × 45 cm",
            Materiales: "Sobre de mármol Patagonia, patas de nogal",
            Acabado: "Mármol pulido, aceite natural en madera",
            Peso: "42 kg",
            "Carga máxima": "25 kg distribuidos"
        }
    },
    {
        id: "6",
        nombre: "Mesa de Noche Aconcagua",
        precio: 290000,
        categoria: "Mesas",
        descripcion:
            "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante.",
        imagen: "Kit de imágenes/Mesa de Noche Aconcagua.png",
        destacado: false,
        especificaciones: {
            Medidas: "45 × 35 × 60 cm",
            Materiales: "Roble macizo FSC®, herrajes soft-close",
            Acabado: "Barniz mate de poliuretano",
            Almacenamiento: "1 cajón + repisa inferior",
            Características: "Cajón con cierre suave"
        }
    },
    {
        id: "7",
        nombre: "Sofá Patagonia",
        precio: 1450000,
        categoria: "Asientos",
        descripcion:
            "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible.",
        imagen: "Kit de imágenes/Sofá Patagonia.png",
        destacado: false,
        especificaciones: {
            Medidas: "220 × 90 × 80 cm",
            Estructura: "Madera de eucalipto certificada FSC®",
            Tapizado: "Lino 100% natural premium",
            Relleno: "Espuma HR + plumón reciclado",
            Sostenibilidad: "Materiales 100% reciclables"
        }
    },
    {
        id: "8",
        nombre: "Mesa Comedor Pampa",
        precio: 1120000,
        categoria: "Mesas",
        descripcion:
            "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares.",
        imagen: "Kit de imágenes/Mesa Comedor Pampa.png",
        destacado: false,
        especificaciones: {
            Medidas: "160-240 × 90 × 75 cm",
            Materiales: "Roble macizo FSC®, mecanismo alemán",
            Acabado: "Aceite-cera natural",
            Capacidad: "6-10 comensales",
            Extensión: "Sistema de mariposa central"
        }
    },
    {
        id: "9",
        nombre: "Sillas Córdoba",
        precio: 480000,
        categoria: "Asientos",
        descripcion:
            "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y sus materiales garantizan comodidad y durabilidad.",
        imagen: "Kit de imágenes/Sillas Córdoba.png",
        destacado: false,
        especificaciones: {
            Medidas: "45 × 52 × 80 cm cada una",
            Materiales: "Contrachapado de nogal, tubo de acero",
            Acabado: "Laca mate, pintura epoxi",
            Apilables: "Hasta 6 sillas",
            Incluye: "Set de 4 sillas"
        }
    },
    {
        id: "10",
        nombre: "Escritorio Costa",
        precio: 680000,
        categoria: "Oficina",
        descripcion:
            "Escritorio compacto con cajón organizador y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista.",
        imagen: "Kit de imágenes/Escritorio Costa.png",
        destacado: false,
        especificaciones: {
            Medidas: "120 × 60 × 75 cm",
            Materiales: "Bambú laminado, herrajes ocultos",
            Acabado: "Laca mate resistente",
            Almacenamiento: "1 cajón con organizador",
            Cables: "Pasacables integrado"
        }
    },
    {
        id: "11",
        nombre: "Silla de Trabajo Belgrano",
        precio: 360000,
        categoria: "Oficina",
        descripcion:
            "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar.",
        imagen: "Kit de imágenes/Silla de Trabajo Belgrano.png",
        destacado: false,
        especificaciones: {
            Medidas: "60 × 60 × 90-100 cm",
            Materiales: "Malla técnica, tejido reciclado",
            Acabado: "Base cromada, tapizado premium",
            Regulación: "Altura + inclinación respaldo",
            Certificación: "Ergonomía europea EN 1335"
        }
    }
];


function cargarProductos() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(productos);
        }, 800);
    });
}