import React from 'react';
import Header from './ui/Components/Header';
import MenuList from './ui/Components/MenuList';
import Cart from './ui/Components/Cart';
import './App.css';

import { useCart } from './viewmodels/useCart';
import { useProducts } from './viewmodels/useProducts';

function App() {
  const { list: products, loading } = useProducts();
  const { cartItems, add, updateQty, remove, clear, total } = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert('¡Gracias por tu compra! Tu pedido está en camino.');
      clear();
    } else {
      alert('Tu carrito está vacío. ¡Agrega algo antes de finalizar!');
    }
  };

  if (loading) return <div className="App"><Header /><main className="main-content">Cargando…</main></div>;

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <MenuList products={products} onAddToCart={add} />
        <Cart 
          cartItems={cartItems}
          onUpdateQuantity={updateQty}
          onRemoveFromCart={remove}
          onCheckout={handleCheckout}
          total={total}
        />
      </main>
    </div>
  );
}

export default App;
