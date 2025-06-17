import React, { useState } from 'react';
import Header from './Components/Header';
import MenuList from './Components/MenuList';
import Cart from './Components/Cart';
import { menuProducts } from './data/products';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const handleCheckout = () => {
    if(cartItems.length > 0) {
      alert('¡Gracias por tu compra! Tu pedido está en camino.');
      setCartItems([]);
    } else {
      alert('Tu carrito está vacío. ¡Agrega algo antes de finalizar!');
    }
  };


  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <MenuList products={menuProducts} onAddToCart={handleAddToCart} />
        <Cart 
          cartItems={cartItems} 
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onCheckout={handleCheckout}
        />
      </main>
    </div>
  );
}

export default App;