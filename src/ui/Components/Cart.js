import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
  return (
    <div className="cart-item">
      <span>{item.name}</span>
      <div className="cart-item-controls">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <span>${(item.price * item.quantity).toFixed(2)}</span>
      <button className="remove-btn" onClick={() => onRemoveFromCart(item.id)}>X</button>
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
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              onUpdateQuantity={onUpdateQuantity}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
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