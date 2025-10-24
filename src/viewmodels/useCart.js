import { useEffect, useState } from "react";

// clave para persistir en localStorage
const KEY = "garrapp_cart_v1";

export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  // cargar del storage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setCartItems(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  // guardar en storage al cambiar
  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const add = (product) => {
    setCartItems(prev => {
      const found = prev.find(i => i.id === product.id);
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (productId, newQty) => {
    if (newQty <= 0) remove(productId);
    else {
      setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity: newQty } : i));
    }
  };

  const remove = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
  };

  const clear = () => setCartItems([]);

  const total = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return { cartItems, add, updateQty, remove, clear, total };
}
