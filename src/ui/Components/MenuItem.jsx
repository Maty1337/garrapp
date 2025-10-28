import React, { useState, useMemo } from 'react';

const MenuItem = ({ product, onAddToCart }) => {
  // Los hooks siempre van al inicio
  const [doubleMeat, setDoubleMeat] = useState(false);



  const displayPrice = useMemo(() => {
    const base = Number.isFinite(product.price) ? product.price : 0;
    return doubleMeat ? base + 2000 : base; // +5% si eligen doble carne
  }, [product.price, doubleMeat]);

  const formatARS = (n) =>
    (Number.isFinite(n) ? n : 0).toLocaleString('es-AR', {
      style: 'currency',
      currency: 'ARS',
    });

  const handleAdd = () => {
    const variantKey = `${product.id}|${doubleMeat ? 'dbl' : 'norm'}`;
    onAddToCart({
      ...product,
      price: displayPrice,
      doubleMeat,
      optionLabel: doubleMeat ? 'Doble carne +$2000' : undefined,
      variantKey,
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
              Agregar doble carne (+$2000)
            </label>
          </div>
        )}
      </div>

      <button onClick={handleAdd}>Agregar al carrito</button>
    </div>
  );
};

export default MenuItem;
