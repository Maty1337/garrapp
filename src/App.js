import React from 'react';
import Header from './ui/Components/Header';

import './App.css';

import { useCart } from './viewmodels/useCart';
import { useProducts } from './viewmodels/useProducts';
import MenuWizard from './ui/Components/MenuWizard';

function App() {
  const { list: products, loading } = useProducts();
  const { cartItems, add, updateQty, remove, clear} = useCart();

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert('¡Gracias por tu compra! Tu pedido está en camino.');
      clear();
    } else {
      alert('Tu carrito está vacío. ¡Agrega algo antes de finalizar!');
    }
  };

 if (loading) return (
    <div className="App">
      <Header />
      <main className="main-content">Cargando…</main>
    </div>
  );

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <MenuWizard
          products={products}
          cartItems={cartItems}
          onAddToCart={add}
          onUpdateQuantity={updateQty}
          onRemoveFromCart={remove}
          onCheckout={handleCheckout}
        />
      </main>
    </div>
  );
}

export default App;
