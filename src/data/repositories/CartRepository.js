import { loadCartRaw, saveCartRaw } from '../sources/storage';

export const CartRepository = {
  async get() {
    return loadCartRaw(); // [{product, qty}]
  },
  async set(items) {
    saveCartRaw(items);
  },
  async clear() {
    saveCartRaw([]);
  }
};
