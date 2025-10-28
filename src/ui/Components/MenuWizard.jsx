import React from 'react';
import MenuItem from './MenuItem';
import { createOrder } from '../../data/sources/api';
import AlertConfirm from './AlertConfirm'; // 🆕 import

const ORDER = ['Combos', 'Bebidas', 'Extras'];

const formatARS = (n) =>
  (Number.isFinite(n) ? n : 0).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });

export default function MenuWizard({
  products = [],
  cartItems = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  clearCart,
}) {
  const [step, setStep] = React.useState(0);
  const [metodoPago, setMetodoPago] = React.useState('tarjeta'); // 'tarjeta' | 'efectivo'
  const [showConfirm, setShowConfirm] = React.useState(false);   // 🆕
  const [orderNumber, setOrderNumber] = React.useState(null);    // 🆕

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
      metodoPago,
      total_bruto: Number(totalBruto.toFixed(2)),
      total_final: Number(totalFinal.toFixed(2)),
      detalles: cartItems.map((i) => ({
        producto_id: i.id,
        cantidad: i.quantity,
        subtotal: Number((i.price * i.quantity).toFixed(2)),
      })),
    };

    try {
      const creado = await createOrder(pedido); // 🆕 capturamos respuesta
      // usa numeroPedido si tu backend lo devuelve; si no, cae al id
      setOrderNumber(creado?.numeroPedido ?? `GA-${creado?.id}`); // 🆕
      setShowConfirm(true); // 🆕 mostrar overlay

      // limpiamos carrito (lo hacemos ya, la alerta es overlay)
      if (onCheckout) onCheckout();
      else if (clearCart) clearCart();
      // opcional: no movemos el paso hasta que cierren la alerta
    } catch (e) {
      console.error(e);
      // podés reemplazar por una alerta visual de error si querés
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
              <li key={it.variantKey} className="summary-row">
                <div>
                  <span>
                    {it.name} {it.optionLabel && <small>({it.optionLabel})</small>} × {it.quantity}
                  </span>
                </div>
                <strong>{formatARS(it.price * it.quantity)}</strong>
                <div className="summary-actions">
                  <button onClick={() => onUpdateQuantity(it.variantKey, it.quantity - 1)}>-</button>
                  <button onClick={() => onUpdateQuantity(it.variantKey, it.quantity + 1)}>+</button>
                  <button className="remove" onClick={() => onRemoveFromCart(it.variantKey)}>x</button>
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

        {/* 🔔 Alerta de confirmación */}
        {showConfirm && (
          <AlertConfirm
            title="¡Pedido confirmado!"
            message={`Tu número de pedido es: ${orderNumber}`}
            onClose={() => { setShowConfirm(false); setStep(0); }}
          />
        )}
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
        {currentCategory === 'Extras' && (
          <button onClick={handleSkip}>Saltar</button>
        )}
        {currentCategory !== 'Combos' && (
          <button onClick={handleBack}>Volver</button>
        )}
        <button className="primary" onClick={handleNext}>Siguiente</button>
      </div>

      {/* 🔔 Por si el usuario cierra la alerta y ya no está en resumen */}
      {showConfirm && (
        <AlertConfirm
          title="¡Pedido confirmado!"
          message={`Tu número de pedido es: ${orderNumber}`}
          onClose={() => { setShowConfirm(false); setStep(0); }}
        />
      )}
    </div>
  );
}
