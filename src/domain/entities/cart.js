export function Cart(items = []) {
  return {
    items, // [{product, qty}]
    total() {
      return this.items.reduce((acc, it) => acc + it.product.price * it.qty, 0);
    },
  };
}
