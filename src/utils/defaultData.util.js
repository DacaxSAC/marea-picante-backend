const categories = [
    { name: "Ceviches", description: "Frescos y deliciosos platos de pescado y mariscos marinados en limón, con un toque de ají y cilantro" },
    { name: "Chicharrones", description: "Crujientes trozos de pescado o mariscos fritos a la perfección, acompañados de yuca y salsas caseras" },
    { name: "Arroces", description: "Exquisitas preparaciones de arroz con mariscos y pescados, sazonados con especias peruanas tradicionales" },
    { name: "Combos", description: "Combinaciones perfectas de nuestros mejores platos a un precio especial, ideales para compartir en familia" },
    { name: "Sudados", description: "Guisos de pescado y mariscos cocinados lentamente en su propio jugo con verduras y hierbas aromáticas" },
    { name: "Parihuelas", description: "Potentes sopas afrodisíacas con variedad de mariscos en un caldo concentrado de pescado y especias" },
    { name: "Fritos - Picantes", description: "Deliciosas preparaciones fritas con un toque picante que realza el sabor de nuestros pescados y mariscos" },
    { name: "Chilcanos", description: "Reconfortantes sopas claras de pescado con un toque de limón, perfectas para iniciar cualquier comida" },
    { name: "Guarniciones", description: "Complementos ideales para acompañar nuestros platos principales: yuca, camote, arroz, ensaladas frescas y más" },
    { name: "Bebidas", description: "Refrescantes opciones para acompañar tu comida, desde chicha morada y limonada hasta cervezas y vinos seleccionados" }
];

const products = [
    // Ceviches
    {
        name: "Ceviche Simple",
        description: "Pescado fresco del día marinado en limón, con cebolla, cilantro y un toque de ají, acompañado de camote y choclo",
        categoryId: 1,
        pricePersonal: 26.00,
        priceFuente: 55.00
    },
    {
        name: "Ceviche Mixto",
        description: "Combinación perfecta de pescado fresco y mariscos variados marinados en limón, con un toque de ají limo y cilantro",
        categoryId: 1,
        pricePersonal: 30.00,
        priceFuente: 60.00
    },
    {
        name: "Ceviche de Mariscos",
        description: "Exquisita selección de mariscos frescos marinados en limón, con cebolla morada, cilantro y ají, servido con guarniciones tradicionales",
        categoryId: 1,
        pricePersonal: 34.00,
        priceFuente: 68.00
    },
    {
        name: "Ceviche de Langostinos",
        description: "Langostinos frescos marinados en limón, con un toque de ají y cilantro, acompañados de camote y choclo",
        categoryId: 1,
        pricePersonal: 35.00,
        priceFuente: 70.00
    },
    {
        name: "Ceviche de Cangrejos",
        description: "Deliciosa carne de cangrejo marinada en limón con cebolla, cilantro y ají, una especialidad de la casa",
        categoryId: 1,
        pricePersonal: 35.00,
        priceFuente: 70.00
    },
    {
        name: "Ceviche de Salpreso",
        description: "Pescado salpreso marinado en limón con el toque especial de la casa, acompañado de camote y choclo",
        categoryId: 1,
        pricePersonal: 25.00,
        priceFuente: 55.00
    },
    {
        name: "Maruchitas",
        description: "Pequeños bocados de pescado marinado en limón con un toque picante, perfectos para compartir",
        categoryId: 1,
        pricePersonal: 17.00,
        priceFuente: 0.00
    },
    {
        name: "Leche Tigre",
        description: "El concentrado jugo del ceviche con trozos de pescado y mariscos, conocido por sus propiedades revitalizantes",
        categoryId: 1,
        pricePersonal: 17.00,
        priceFuente: 0.00
    },

    // Chicharrones
    {
        name: "Chicharron de Pota",
        description: "Trozos de pota fritos hasta quedar crujientes, acompañados de yuca, salsa criolla y salsas de la casa",
        categoryId: 2,
        pricePersonal: 28.00,
        priceFuente: 58.00,
    },
    {
        name: "Chicharron de Pescado",
        description: "Trozos de pescado fresco rebozados y fritos a la perfección, servidos con yuca, salsa criolla y cremas caseras",
        categoryId: 2,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Chicharron Mixto",
        description: "Deliciosa combinación de pescado y mariscos fritos crujientes, acompañados de yuca y salsas especiales",
        categoryId: 2,
        pricePersonal: 34.00,
        priceFuente: 68.00,
    },
    {
        name: "Chicharron de Langostinos",
        description: "Langostinos rebozados y fritos hasta quedar dorados y crujientes, servidos con yuca y salsas de la casa",
        categoryId: 2,
        pricePersonal: 35.00,
        priceFuente: 70.00,
    },
    {
        name: "Chicharron de Calamar",
        description: "Anillos de calamar fritos con una cobertura crujiente, acompañados de yuca y salsas especiales",
        categoryId: 2,
        pricePersonal: 35.00,
        priceFuente: 70.00,
    },
    {
        name: "Jalea Mixta",
        description: "Abundante combinación de pescados y mariscos fritos, acompañados de yuca, salsa criolla y cremas de la casa",
        categoryId: 2,
        pricePersonal: 40.00,
        priceFuente: 70.00,
    },

    // Arroces
    {
        name: "Arroz con Mariscos",
        description: "Delicioso arroz cocido con variedad de mariscos frescos y especias peruanas",
        categoryId: 3,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Arroz con Langostinos",
        description: "Arroz sazonado con langostinos seleccionados y verduras frescas",
        categoryId: 3,
        pricePersonal: 34.00,
        priceFuente: 68.00,
    },
    {
        name: "Chaufa de Mariscos",
        description: "Arroz salteado al estilo oriental con variedad de mariscos",
        categoryId: 3,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Chaufa de Pescado",
        description: "Arroz salteado al estilo oriental con trozos de pescado fresco",
        categoryId: 3,
        pricePersonal: 27.00,
        priceFuente: 58.00,
    },
    {
        name: "Chaufa de Langostinos",
        description: "Arroz salteado al estilo oriental con langostinos seleccionados",
        categoryId: 3,
        pricePersonal: 34.00,
        priceFuente: 68.00,
    },

    // Combos
    {
        name: "Triple",
        description: "Combinación de Ceviche Mixto, Chicharrón de Pescado y Arroz con Mariscos",
        categoryId: 4,
        pricePersonal: 35.00,
        priceFuente: 65.00,
    },
    {
        name: "Combo 1",
        description: "Ceviche mixto y Chicharrón de pescado",
        categoryId: 4,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Combo 2",
        description: "Arroz con Mariscos y Chicharrón de Pescado",
        categoryId: 4,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Combo 3",
        description: "Arroz con Mariscos y Ceviche Mixto",
        categoryId: 4,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },

    // Sudados
    {
        name: "Tollo",
        description: "Guiso de tollo cocinado lentamente con verduras y especias",
        categoryId: 5,
        pricePersonal: 28.00,
        priceFuente: 55.00,
    },
    {
        name: "Suco",
        description: "Sudado de suco con verduras y hierbas aromáticas",
        categoryId: 5,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Cabrilla",
        description: "Cabrilla cocinada en su propio jugo con verduras y especias",
        categoryId: 5,
        pricePersonal: 30.00,
        priceFuente: 60.00,
    },
    {
        name: "Chita",
        description: "Chita fresca cocinada en sudado con verduras y especias peruanas",
        categoryId: 5,
        pricePersonal: 38.00,
        priceFuente: 70.00,
    },
    {
        name: "Tramboyo",
        description: "Tramboyo cocinado lentamente en sudado con verduras y especias",
        categoryId: 5,
        pricePersonal: 38.00,
        priceFuente: 70.00,
    },

    // Parihuelas
    {
        name: "Tollo",
        description: "Potente sopa de tollo con mariscos y especias afrodisíacas",
        categoryId: 6,
        pricePersonal: 32.00,
        priceFuente: 60.00,
    },
    {
        name: "Suco",
        description: "Parihuela de suco con variedad de mariscos y especias",
        categoryId: 6,
        pricePersonal: 35.00,
        priceFuente: 65.00,
    },
    {
        name: "Cabrilla",
        description: "Parihuela de cabrilla con mariscos y especias peruanas",
        categoryId: 6,
        pricePersonal: 35.00,
        priceFuente: 65.00,
    },
    {
        name: "Chita",
        description: "Parihuela de chita con mariscos selectos y especias",
        categoryId: 6,
        pricePersonal: 40.00,
        priceFuente: 75.00,
    },
    {
        name: "Tramboyo",
        description: "Parihuela de tramboyo con mariscos y especias tradicionales",
        categoryId: 6,
        pricePersonal: 40.00,
        priceFuente: 75.00,
    },

    // Fritos - Picantes
    {
        name: "Suco Frito",
        description: "Filete de suco frito a la perfección, acompañado de guarniciones frescas",
        categoryId: 7,
        pricePersonal: 30.00,
        priceFuente: 0.00,
    },
    {
        name: "Cabrilla Frita",
        description: "Cabrilla frita crujiente por fuera y jugosa por dentro, servida con guarniciones",
        categoryId: 7,
        pricePersonal: 30.00,
        priceFuente: 0.00,
    },
    {
        name: "Chita Frita",
        description: "Filete de chita frita en aceite de oliva, acompañada de guarniciones tradicionales",
        categoryId: 7,
        pricePersonal: 38.00,
        priceFuente: 0.00,
    },
    {
        name: "Picante de Mariscos",
        description: "Guiso picante de mariscos variados con especias peruanas y un toque de ají",
        categoryId: 7,
        pricePersonal: 34.00,
        priceFuente: 0.00,
    },
    {
        name: "Picante de Langostinos",
        description: "Langostinos en salsa picante con especias peruanas y verduras frescas",
        categoryId: 7,
        pricePersonal: 35.00,
        priceFuente: 0.00,
    },
    {
        name: "Reventado de Cangrejos",
        description: "Cangrejos salteados en salsa picante con un toque de vino blanco y especias",
        categoryId: 7,
        pricePersonal: 35.00,
        priceFuente: 0.00,
    },
    {
        name: "Pescado a lo Macho",
        description: "Filete de pescado bañado en salsa picante de mariscos, un clásico de la cocina peruana",
        categoryId: 7,
        pricePersonal: 42.00,
        priceFuente: 0.00,
    },
    {
        name: "Chita al Ajo",
        description: "Filete de chita a la plancha con salsa de ajo, acompañado de guarniciones",
        categoryId: 7,
        pricePersonal: 45.00,
        priceFuente: 0.00,
    },

    // Chilcanos
    {
        name: "Tollo",
        description: "Chilcano de tollo, sopa clara con trozos de pescado, verduras y un toque de limón",
        categoryId: 8,
        pricePersonal: 28.00,
        priceFuente: 0.00,
    },
    {
        name: "Suco",
        description: "Chilcano de suco, caldo ligero con trozos de pescado fresco y hierbas aromáticas",
        categoryId: 8,
        pricePersonal: 30.00,
        priceFuente: 0.00,
    },
    {
        name: "Cabrilla",
        description: "Chilcano de cabrilla, sopa reconfortante con trozos de pescado y verduras",
        categoryId: 8,
        pricePersonal: 30.00,
        priceFuente: 0.00,
    },
    {
        name: "Chita",
        description: "Chilcano de chita, caldo delicado con trozos de pescado premium y hierbas frescas",
        categoryId: 8,
        pricePersonal: 38.00,
        priceFuente: 0.00,
    },
    {
        name: "Tramboyo",
        description: "Chilcano de tramboyo, sopa tradicional con trozos de pescado y un toque cítrico",
        categoryId: 8,
        pricePersonal: 38.00,
        priceFuente: 0.00,
    },

    // Guarniciones
    {
        name: "Arroz",
        description: "Porción de arroz blanco graneado, perfecto para acompañar cualquier plato",
        categoryId: 9,
        pricePersonal: 5.00,
        priceFuente: 0.00,
    },
    {
        name: "Yuca",
        description: "Yuca sancochada, suave y deliciosa, ideal como acompañamiento",
        categoryId: 9,
        pricePersonal: 5.00,
        priceFuente: 0.00,
    },
    {
        name: "Camote",
        description: "Camote sancochado, dulce y nutritivo, complemento perfecto para ceviches",
        categoryId: 9,
        pricePersonal: 5.00,
        priceFuente: 0.00,
    },
    {
        name: "Cancha",
        description: "Maíz tostado crujiente, aperitivo tradicional peruano",
        categoryId: 9,
        pricePersonal: 5.00,
        priceFuente: 0.00,
    },
    {
        name: "Chifles",
        description: "Rodajas de plátano verde fritas, crujientes y sabrosas",
        categoryId: 9,
        pricePersonal: 6.00,
        priceFuente: 0.00,
    },
    {
        name: "Choclo",
        description: "Mazorca de maíz peruano sancochado, tierno y dulce",
        categoryId: 9,
        pricePersonal: 5.00,
        priceFuente: 0.00,
    },
    {
        name: "Yuca Frita",
        description: "Bastones de yuca frita, crujientes por fuera y suaves por dentro",
        categoryId: 9,
        pricePersonal: 7.00,
        priceFuente: 0.00,
    },
    
    // Bebidas
    {
        name: "Chicha",
        description: "Refrescante chicha morada, bebida tradicional peruana a base de maíz morado y frutas",
        categoryId: 10,
        pricePersonal: 10.00,
        priceFuente: 0.00,
    },
    {
        name: "Agua",
        description: "Agua mineral sin gas, perfecta para acompañar tu comida",
        categoryId: 10,
        pricePersonal: 3.00,
        priceFuente: 0.00,
    },
    {
        name: "Trigo / Negra",
        description: "Cerveza de trigo o negra, ideal para maridar con mariscos",
        categoryId: 10,
        pricePersonal: 10.00,
        priceFuente: 0.00,
    },
    {
        name: "Gaseosa 1/2",
        description: "Bebida gaseosa personal, variedad de sabores",
        categoryId: 10,
        pricePersonal: 4.00,
        priceFuente: 0.00,
    },
    {
        name: "Gordita",
        description: "Cerveza personal, refrescante y ligera",
        categoryId: 10,
        pricePersonal: 5.00,
        priceFuente: 0.00,
    },
    {
        name: "Gaseosa 1L",
        description: "Gaseosa de 1 litro, ideal para compartir",
        categoryId: 10,
        pricePersonal: 7.00,
        priceFuente: 0.00,
    },
    {
        name: "Gaseosa 2L",
        description: "Gaseosa familiar de 2 litros, perfecta para grupos",
        categoryId: 10,
        pricePersonal: 12.00,
        priceFuente: 0.00,
    },
    {
        name: "Gaseosa 3L",
        description: "Gaseosa grande de 3 litros para toda la familia",
        categoryId: 10,
        pricePersonal: 16.00,
        priceFuente: 0.00,
    }
];

const tables = [
    { number: 1, capacity: 4, state: 1 },
    { number: 2, capacity: 4, state: 1 },
    { number: 3, capacity: 4, state: 1 },
    { number: 4, capacity: 4, state: 1 },
    { number: 5, capacity: 4, state: 1 },
    { number: 6, capacity: 4, state: 1 },
    { number: 7, capacity: 4, state: 1 },
    { number: 8, capacity: 4, state: 1 },
    { number: 9, capacity: 4, state: 1 },
    { number: 10, capacity: 4, state: 1 },
    { number: 11, capacity: 4, state: 1 },
    { number: 12, capacity: 4, state: 1 },
    { number: 13, capacity: 4, state: 1 },
    { number: 14, capacity: 4, state: 1 },
    { number: 15, capacity: 4, state: 1 },
    { number: 16, capacity: 4, state: 1 },
    { number: 17, capacity: 4, state: 1 },
    { number: 18, capacity: 4, state: 1 },
    { number: 19, capacity: 4, state: 1 },
    { number: 20, capacity: 4, state: 1 },
    { number: 21, capacity: 4, state: 1 },
    { number: 22, capacity: 4, state: 1 },
    { number: 23, capacity: 4, state: 1 },
    { number: 24, capacity: 4, state: 1 },
    { number: 25, capacity: 4, state: 1 },
    { number: 26, capacity: 4, state: 1 },
]

module.exports = {
    categories,
    products,
    tables
};