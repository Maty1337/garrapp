export function removeFromCart(cart, productId) {
  cart.items = cart.items.filter(it => it.product.id !== productId);
  return cart;
}
