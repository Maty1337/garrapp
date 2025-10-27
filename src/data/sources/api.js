const BASE = process.env.REACT_APP_API_URL;

export async function fetchMenu() {
  const res = await fetch(`${BASE}/menu`, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return res.json(); // <-- solo se lee una vez
}



export async function createOrder(pedido) {
  const res = await fetch(`${BASE}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json(); // devuelve el pedido creado (con id)
}

