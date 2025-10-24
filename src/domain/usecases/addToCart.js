export function addToCart(cart, product) {
  const existing = cart.items.find(it => it.product.id === product.id);
  if (existing) existing.qty += 1;
  else cart.items.push({ product, qty: 1 });
  return cart;
}
