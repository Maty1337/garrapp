import MenuItem from './MenuItem';

export default function MenuList({ products = [], onAddToCart }) {
  // Agrupar productos por categoría
  const categorias = [...new Set(products.map(p => p.category))];

  return (
    <div className="menu-list">
      {categorias.map(cat => (
        <div key={cat} className="menu-section">
          <h2 className="menu-section-title">{cat}</h2>

          {products
            .filter(p => p.category === cat)
            .map(p => (
              <MenuItem key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
        </div>
      ))}
    </div>
  );
}
