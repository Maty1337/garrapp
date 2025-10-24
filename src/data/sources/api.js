const MOCK_PRODUCTS = [
  { id: '1', name: 'Hamburguesa Clásica', description: '120gr, queso, lechuga...', price: 6000, image: '/img/burger1.jpg' },
  { id: '2', name: 'Hamburguesa Doble Queso', description: 'Doble medallón...', price: 7500, image: '/img/burger2.jpg' },
];

export async function fetchProducts() {
  // reemplazar por: const r = await fetch('/api/products'); return r.json();
  return Promise.resolve(MOCK_PRODUCTS);
}
