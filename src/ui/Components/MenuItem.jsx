import React, { useState, useMemo } from 'react';

const MenuItem = ({ product, onAddToCart }) => {
  // Los hooks siempre van al inicio
  const [doubleMeat, setDoubleMeat] = useState(false);



  const displayPrice = useMemo(() => {
    const base = Number.isFinite(product.price) ? product.price : 0;
    return doubleMeat ? base * 1.05 : base; // +5% si eligen doble carne
  }, [product.price, doubleMeat]);

  const formatARS = (n) =>
    (Number.isFinite(n) ? n : 0).toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });

  const handleAdd = () => {
    onAddToCart({
      ...product,
      price: displayPrice,
      doubleMeat,
      optionLabel: doubleMeat ? 'Doble carne (+5%)' : undefined,
    });
  };

  return (
    <div className="menu-item">
      <div className="image-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="menu-item-details">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p className="price">{formatARS(displayPrice)}</p>

        {product.category === 'Combos' && (
          <div className="option-double">
            <label>
              <input
                type="checkbox"
                checked={doubleMeat}
                onChange={() => setDoubleMeat((v) => !v)}
              />
              Agregar doble carne (+5%)
            </label>
          </div>
        )}
      </div>

      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
};

export default MenuItem;
