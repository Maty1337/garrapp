import MenuItem from '/components/MenuItem';
import { useProducts } from '../../viewmodels/useProducts';
import { useCart } from '../../viewmodels/useCart';

export default function Home() {
  const { list, loading } = useProducts();
  const { add, total, cart } = useCart();

  if (loading) return <p>Cargando…</p>;

  return (
    <div>
      <h2>Menú</h2>
      {list.map(p => (
        <MenuItem key={p.id} product={p} onAddToCart={add} />
      ))}
      <hr />
      <p>Items en carrito: {cart.items.reduce((a, it) => a + it.qty, 0)}</p>
      <p>Total: ${total.toFixed(2)}</p>
    </div>
  );
}
