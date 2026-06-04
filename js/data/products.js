// ============================================
// MATES.ARGENTINOS — Initial Product Data
// Seed data for the application
// ============================================

window.CATEGORIES = [
  { id: 'all', name: 'Todos los Productos' },
  { id: 'mates', name: 'Mates' },
  { id: 'bombillas', name: 'Bombillas' },
  { id: 'yerba', name: 'Yerba Mate' },
  { id: 'sets', name: 'Kits de Regalo' }
];

const getImagePath = (prefix) => {
  return `assets/images/products/${prefix}.png`;
};

window.INITIAL_PRODUCTS = [
  {
    id: 'prod-001',
    name: 'Imperial Premium',
    category: 'mates',
    price: 45000,
    originalPrice: 55000,
    description: 'Una obra maestra de la artesanía argentina. Esta calabaza oscura está seleccionada a mano y cuenta con una virola y base de alpaca cincelada. El acabado oscuro proporciona un contraste impresionante con la plata brillante, convirtiéndolo en la pieza central perfecta para tu ritual matero.',
    shortDescription: 'Calabaza seleccionada, forrado en cuero vaqueta y virola de alpaca cincelada.',
    image: getImagePath('mate_traditional'),
    stock: 15,
    featured: true,
    mostSold: true,
    isNew: false,
    features: [
      'Calabaza auténtica seleccionada a mano',
      'Virola y base de alpaca cincelada',
      'Detalles tallados a mano',
      'Curado y listo para usar'
    ]
  },
  {
    id: 'prod-002',
    name: 'Camionero Algarrobo',
    category: 'mates',
    price: 32000,
    originalPrice: null,
    description: 'El mate del trabajo, robusto y confiable. Elaborado en madera de algarrobo estacionada, esta pieza presenta una boca ancha ideal para el cimarrón y una virola de acero inoxidable de larga durabilidad. Perfecto para el día a día.',
    shortDescription: 'Madera de algarrobo estacionada, boca ancha y virola de acero inoxidable.',
    image: getImagePath('mate_ceramic'),
    stock: 42,
    featured: true,
    mostSold: false,
    isNew: false,
    features: [
      'Madera de algarrobo estacionada',
      'Boca ancha ideal para cimarrón',
      'Virola de acero inoxidable',
      'Resistente y duradera'
    ]
  },
  {
    id: 'prod-003',
    name: 'Torpedo Cincelado',
    category: 'mates',
    price: 38000,
    originalPrice: null,
    description: 'Diseño ergonómico con detalles de lujo. Este mate torpedo combina una forma que se adapta perfectamente a la mano con cuero negro premium y detalles en alpaca cincelada a mano. Una pieza de colección para el verdadero conocedor del mate.',
    shortDescription: 'Forma ergonómica, cuero negro y detalles de lujo en alpaca.',
    image: getImagePath('mate_traditional'),
    stock: 20,
    featured: true,
    mostSold: false,
    isNew: true,
    features: [
      'Diseño torpedo ergonómico',
      'Cuero negro premium',
      'Detalles en alpaca cincelada a mano',
      'Pieza artesanal exclusiva'
    ]
  },
  {
    id: 'prod-004',
    name: 'Bombilla Imperial de Alpaca',
    category: 'bombillas',
    price: 28000,
    originalPrice: null,
    description: 'Elevá tu experiencia con esta bombilla artesanal de alpaca. Presenta un cuello elegantemente curvado y un asa grabada muy detallada que evita la transferencia de calor. El filtro tipo cuchara garantiza un sorbo suave y sin obstrucciones en todo momento.',
    shortDescription: 'Bombilla artesanal grabada en alpaca.',
    image: getImagePath('bombilla_silver'),
    stock: 25,
    featured: false,
    mostSold: false,
    isNew: false,
    features: [
      'Construcción en alpaca',
      'Mango grabado resistente al calor',
      'Filtro de cuchara de malla fina',
      'Longitud ideal de 18 cm'
    ]
  },
  {
    id: 'prod-005',
    name: 'Yerba Mate Reserva Especial',
    category: 'yerba',
    price: 18500,
    originalPrice: null,
    description: 'Nuestra mezcla exclusiva. Envejecida naturalmente durante 24 meses, esta yerba mate premium ofrece un perfil de sabor suave y complejo con notas terrosas y un toque de dulzura natural. Su bajo contenido de polvo asegura una infusión limpia y elegante.',
    shortDescription: 'Yerba mate premium estacionada 24 meses (1 kg).',
    image: getImagePath('yerba_mate_bag'),
    stock: 120,
    featured: true,
    mostSold: false,
    isNew: false,
    features: [
      'Proceso de envejecimiento natural de 24 meses',
      'Bajo contenido de polvo, corte tradicional con palo',
      'Perfil de sabor terroso y suave',
      'Envase de lujo de 1 kg'
    ]
  },
  {
    id: 'prod-006',
    name: 'Kit de Regalo Ejecutivo',
    category: 'sets',
    price: 145000,
    originalPrice: 165000,
    description: 'El regalo de lujo definitivo para el conocedor del mate. Este set completo incluye mate de calabaza con virola de alpaca, bombilla premium y termo de acero inoxidable de 1 litro. Presentado en una elegante caja de regalo negra lista para regalar.',
    shortDescription: 'Kit de lujo completo con termo y mate artesanal.',
    image: getImagePath('mate_gift_set'),
    stock: 8,
    featured: true,
    mostSold: false,
    isNew: true,
    features: [
      'Mate de calabaza con virola de alpaca',
      'Bombilla de alpaca premium',
      'Termo de acero inoxidable de 1 L con aislamiento al vacío',
      'Caja de presentación de lujo'
    ]
  }
];
