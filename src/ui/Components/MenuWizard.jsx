import React from 'react';
import MenuItem from './MenuItem';
import { createOrder } from '../../data/sources/api';

const ORDER = ['Combos', 'Bebidas', 'Extras']; // pasos del wizard

const formatARS = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

export default function MenuWizard({
  products = [],
  cartItems = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  // onCheckout: podés seguir pasándolo desde App si querés usar tu limpieza/alert
  onCheckout,
  // opcional: callback para vaciar carrito (si no usás onCheckout)
  clearCart,
}) {
  // Paso actual del wizard (0..ORDER.length). >= length => resumen
  const [step, setStep] = React.useState(0);
  const [metodoPago, setMetodoPago] = React.useState('tarjeta'); // 'tarjeta' | 'efectivo'

  const isSummary = step >= ORDER.length;
  const currentCategory = ORDER[step];

  const itemsByCategory = React.useCallback(
    (cat) => products.filter((p) => p.category === cat),
    [products]
  );

  const handleNext = () => setStep((s) => Math.min(s + 1, ORDER.length));
  const handleBack = () => setStep((s) => Math.max(s - 1, 0));
  const handleSkip = () => setStep((s) => Math.min(s + 1, ORDER.length)); // solo en Extras
  const handleRestart = () => setStep(0);

  // Totales
  const totalBruto = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const descuento = metodoPago === 'efectivo' ? totalBruto * 0.1 : 0;
  const totalFinal = totalBruto - descuento;

  // Confirmar compra → POST a backend
  const onConfirmarCompra = async () => {
    if (cartItems.length === 0) return;

    const pedido = {
      // fecha_creacion: que la asigne el backend
      metodoPago, // opcional: útil para auditar
      total_bruto: Number(totalBruto.toFixed(2)),
      total_final: Number(totalFinal.toFixed(2)),
      detalles: cartItems.map((i) => ({
        producto_id: i.id,
        cantidad: i.quantity,
        subtotal: Number((i.price * i.quantity).toFixed(2)),
      })),
    };

    try {
      await createOrder(pedido);
      alert('¡Gracias por tu compra! Pedido confirmado.');
      // limpiamos carrito y volvemos a inicio
      if (onCheckout) onCheckout(); // si ya tenías lógica centralizada
      else if (clearCart) clearCart();
      setStep(0);
    } catch (e) {
      console.error(e);
      alert('No pudimos confirmar el pedido. Intenta nuevamente.');
    }
  };

  // Vista de resumen
  if (isSummary) {
    return (
      <div className="wizard-summary">
        <h2>Resumen de tu pedido</h2>

        {cartItems.length === 0 ? (
          <p>No agregaste productos.</p>
        ) : (
          <ul className="summary-list">
            {cartItems.map((it) => (
              <li key={`${it.id}-${it.doubleMeat ? 'doble' : 'normal'}`} className="summary-row">
                <div>
                  <span>
                    {it.name} {it.optionLabel ? <small>({it.optionLabel})</small> : null} ×{' '}
                    {it.quantity}
                  </span>
                </div>
                <strong>{formatARS(it.price * it.quantity)}</strong>
                <div className="summary-actions">
                  <button onClick={() => onUpdateQuantity(it.id, it.quantity - 1)}>-</button>
                  <button onClick={() => onUpdateQuantity(it.id, it.quantity + 1)}>+</button>
                  <button className="remove" onClick={() => onRemoveFromCart(it.id)}>x</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Método de pago */}
        <div className="pay-method">
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="tarjeta"
              checked={metodoPago === 'tarjeta'}
              onChange={() => setMetodoPago('tarjeta')}
            />
            Tarjeta (sin descuento)
          </label>
          <label>
            <input
              type="radio"
              name="metodoPago"
              value="efectivo"
              checked={metodoPago === 'efectivo'}
              onChange={() => setMetodoPago('efectivo')}
            />
            Efectivo (10% de descuento)
          </label>
        </div>

        {/* Totales */}
        <div className="summary-totals">
          <div>Subtotal: <strong>{formatARS(totalBruto)}</strong></div>
          {metodoPago === 'efectivo' && (
            <div>Descuento 10%: <strong>-{formatARS(descuento)}</strong></div>
          )}
          <div>Total a pagar: <strong>{formatARS(totalFinal)}</strong></div>
        </div>

        <div className="wizard-actions">
          <button onClick={handleRestart}>Volver a empezar</button>
          <button
            className="primary"
            onClick={onConfirmarCompra}
            disabled={cartItems.length === 0}
          >
            Confirmar compra
          </button>
        </div>
      </div>
    );
  }

  // Vista de paso (categoría actual)
  const list = itemsByCategory(currentCategory);
  const paso = step + 1; // 1..3
  const totalPasos = ORDER.length;

  return (
    <div className="wizard-step">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 className="menu-section-title">{currentCategory}</h2>
        <small>Paso {paso} de {totalPasos}</small>
      </div>

      {list.length === 0 ? (
        <p>No hay productos en esta sección.</p>
      ) : (
        <div className="menu-list">
          {list.map((p) => (
            <MenuItem key={`${p.id}-${p.name}`} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      <div className="wizard-actions">
        {/* Saltar solo en Extras */}
        {currentCategory === 'Extras' && (
          <button onClick={handleSkip}>Saltar</button>
        )}

        {/* Volver oculto en el primer paso (Combos) */}
        {currentCategory !== 'Combos' && (
          <button onClick={handleBack}>Volver</button>
        )}

        <button className="primary" onClick={handleNext}>Siguiente</button>
      </div>
    </div>
  );
}
