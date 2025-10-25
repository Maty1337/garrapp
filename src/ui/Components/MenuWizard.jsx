import MenuItem from "./MenuItem";
import React from "react";

const ORDER = ["Hamburguesas", "Bebidas", "Acompañamientos", "Extras"];

export default function MenuWizard({
  products = [],
  cartItems = [],
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
}) {
  const [step, setStep] = React.useState(0);
  const isSummary = step >= ORDER.length;
  const currentCategory = ORDER[step];

  const itemsByCategory = (cat) => products.filter((p) => p.category === cat);

  const handleNext = () => setStep((s) => Math.min(s + 1, ORDER.length));
  const handleBack = () => setStep((s) => Math.min(s - 1, 0));
  const handleSkip = () => setStep((s) => Math.min(s + 1, ORDER.length)); // solo se mostrará en Acompañamientos
  const handleRestart = () => setStep(0);

  if (isSummary) {
    const total = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
    return (
      <div className="wizard-summary">
        <h2>Resumen de tu pedido</h2>

        {cartItems.length === 0 ? (
          <p>No agregaste productos.</p>
        ) : (
          <ul className="summary-list">
            {cartItems.map((it) => (
              <li key={it.id} className="summary-row">
                <span>
                  {it.name} × {it.quantity}
                </span>
                <strong>${(it.price * it.quantity).toFixed(2)}</strong>
                <div className="summary-actions">
                  <button
                    onClick={() => onUpdateQuantity(it.id, it.quantity - 1)}
                  >
                    -
                  </button>
                  <button
                    onClick={() => onUpdateQuantity(it.id, it.quantity + 1)}
                  >
                    +
                  </button>
                  <button
                    className="remove"
                    onClick={() => onRemoveFromCart(it.id)}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="summary-total">
          <span>Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>

        <div className="wizard-actions">
          <button onClick={handleRestart}>Volver a empezar</button>
          <button
            className="primary"
            onClick={onCheckout}
            disabled={cartItems.length === 0}
          >
            Confirmar compra
          </button>
        </div>
      </div>
    );
  }

  const list = itemsByCategory(currentCategory);

  return (
    <div className="wizard-step">
      <h2 className="menu-section-title">{currentCategory}</h2>

      {list.length === 0 ? (
        <p>No hay productos en esta sección.</p>
      ) : (
        <div className="menu-list">
          {list.map((p) => (
            <MenuItem key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}

      <div className="wizard-actions">
        {(currentCategory === "Acompañamientos" ||
          currentCategory === "Extras") && (
          <button onClick={handleSkip}>Saltar</button>
        )}

        {currentCategory !== "Hamburguesas" && (
          <button onClick={handleBack}>Volver</button>
        )}

        <button className="primary" onClick={handleNext}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
