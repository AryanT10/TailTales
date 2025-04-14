import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Import useCart hook
import "../styles/CartPage.css";

export default function CartPage({ user }) {
  // Get cart state and functions from cart context
  const { cart, removeItem, updateQuantity } = useCart();
  
  // HST rate constant
  const HST_RATE = 0.13; // 13%
  
  // If user is not logged in, redirect to login page with return path
  if (!user) {
    return <Navigate to="/login" state={{ from: "/cart" }} replace />;
  }

  const handleQuantityChange = (itemId, newQuantity) => {
    // Don't allow quantity below 1
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const formatPrice = (price) => {
    return typeof price === 'string' 
      ? price 
      : `$${price.toFixed(2)}`;
  };

  // Calculate HST amount
  const hstAmount = cart.total * HST_RATE;
  
  // Calculate total price including HST
  const totalWithTax = cart.total + hstAmount;

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Decorative elements */}
        <div className="paw-decoration paw-1">🐾</div>
        <div className="paw-decoration paw-2">🐾</div>
        
        <h1>Your Shopping Cart</h1>
        <p className="cart-welcome">
          Welcome, {user.displayName}! Here you can review your items before checkout.
        </p>
        
        {cart.items.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is currently empty. Browse our products to add items to your cart!</p>
            <Link to="/shop" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">{formatPrice(item.price)}</p>
                    <div className="cart-item-quantity">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button 
                        className="cart-item-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="cart-subtotal" style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                color: '#555',
                padding: '10px 0'
              }}>
                <span>Subtotal:</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
              <div className="cart-hst" style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '18px',
                color: '#555',
                padding: '10px 0',
                borderBottom: '1px dashed #ddd'
              }}>
                <span>HST (13%):</span>
                <span>${hstAmount.toFixed(2)}</span>
              </div>
              <div className="cart-total">
                <span>Total:</span>
                <span>${totalWithTax.toFixed(2)}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}