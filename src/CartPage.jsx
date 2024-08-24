import React from 'react';
import { useCart } from './CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, totalQuantity, totalAmount } = useCart();

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.title} />
          <div className="cart-item-details">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <div className="cart-item-controls">
              <button onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity === 0}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, 1)}>+</button>
            </div>
            <p className="cart-item-price">${item.price.toFixed(2)}</p>
            <button className="remove-button" onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <p>Total Quantity: {totalQuantity}</p>
        <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartPage;
