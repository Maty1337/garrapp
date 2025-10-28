import React from "react";

const formatARS = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

const CartItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
  const key = item.variantKey || String(item.id); // fallback por si algo no trae variantKey
  return (
    <div className="cart-item">
      <div style={{ textAlign: "left", flex: 1 }}>
        <strong>{item.name}</strong>
        {item.optionLabel && (
          <div>
            <small>{item.optionLabel}</small>
          </div>
        )}
      </div>

      <div className="cart-item-controls">
        <button onClick={() => onUpdateQuantity(key, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(key, item.quantity + 1)}>+</button>
      </div>

      <span>{formatARS(item.price * item.quantity)}</span>

      <button className="remove-btn" onClick={() => onRemoveFromCart(key)} aria-label="Quitar">
        X
      </button>
    </div>
  );
};

const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, onCheckout }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart">
      <h2>Tu Pedido</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.variantKey || item.id}   // clave única por variante
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}

          <div className="cart-total">
            <h3>Total: {formatARS(total)}</h3>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            Finalizar Compra
          </button>
        </>
      )}
    </aside>
  );
};

export default Cart;
