const KEY = 'garrapp_cart';

export function loadCartRaw() {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
}
export function saveCartRaw(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}
