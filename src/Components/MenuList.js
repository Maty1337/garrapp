import React from 'react';

const MenuItem = ({ product, onAddToCart }) => {
  return (
    <div className="menu-item">
      <img src={product.image} alt={product.name} />
      <div className="menu-item-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
      </div>
      <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
    </div>
  );
};

const MenuList = ({ products, onAddToCart }) => {
  const categories = [...new Set(products.map(p => p.category))];

  return (
    <div className="menu-list">
      <h2>Nuestro Menú</h2>
      {categories.map(category => (
        <div key={category}>
          <h3>{category}</h3>
          <div className="category-items">
            {products
              .filter(p => p.category === category)
              .map(product => (
                <MenuItem key={product.id} product={product} onAddToCart={onAddToCart} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;