export default function MenuItem({ product, onAddToCart }) {
  if (!product) {
    console.warn('MenuItem sin product');
    return null; // o un placeholder
  }

  const { image, name, description, price } = product;

  return (
    <div className="menu-item">
      <div className="image-wrapper">
        <img src={image} alt={name} />
      </div>

      <div className="menu-item-details">
        <h3>{name}</h3>
        <p>{description}</p>
        <p className="price">${price.toFixed(2)}</p>
      </div>

      <button onClick={() => onAddToCart(product)}>Agregar al Carrito</button>
    </div>
  );
}
