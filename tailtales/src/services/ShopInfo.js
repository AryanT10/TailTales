import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext"; // Import useCart hook
import "../styles/services/ShopInfo.css";
import product1 from "../images/product1.png";
import product2 from "../images/product2.png";
import product3 from "../images/product3.png";
import product4 from "../images/product4.png";
import product5 from "../images/product5.png";
import product6 from "../images/product6.png";
import product7 from "../images/product7.png";
import product8 from "../images/product8.png";
import product9 from "../images/product9.png";

const ShopInfo = ({ user }) => { // Add user prop
  const navigate = useNavigate();
  const { addItem } = useCart(); // Get addItem function from cart context
  const [addedToCart, setAddedToCart] = useState(null);

  const [products] = useState([
    { id: 1, name: "Royal Canin Small Dog Food", price: "$7.80", image: product1 },
    { id: 2, name: "Rug Rope for Dogs", price: "$10", image: product2 },
    { id: 4, name: "Royal Canin Canned Cat Food", price: "$7.80", image: product4 },
    { id: 6, name: "Tease Play Laser", price: "$10", image: product6 },
    { id: 3, name: "Giraffe Plush Toy", price: "$7", image: product3 },
    { id: 7, name: "Flapping Fish for Cats", price: "$30", image: product7 },
    { id: 8, name: "Rubber Frisbee", price: "$10", image: product8 },
    { id: 5, name: "Royal Canin Cat Pouches", price: "$5", image: product5 },
    { id: 9, name: "Ball Launcher", price: "$40", image: product9 },
  ]);

  const handleAddToCart = (product) => {
    // Check if user is logged in
    if (!user) {
      // If not logged in, redirect to login page with return path
      navigate("/login", { state: { from: "/shop" } });
      return;
    }
    
    // User is logged in, add to cart
    addItem(product);
    
    // Show "Added to cart" message
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const navigateToCart = () => {
    navigate('/cart');
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop Products</h2>
      
      {/* Cart notification */}
      {addedToCart && (
        <div className="cart-notification" 
             style={{
                background: "#ff6b6b", 
                color: "white", 
                padding: "10px 20px", 
                borderRadius: "25px",
                position: "fixed",
                top: "100px",
                right: "20px",
                zIndex: 100,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
              }}>
          Item added to cart! 
          <button onClick={navigateToCart}
                  style={{
                    marginLeft: "10px",
                    background: "white",
                    color: "#ff6b6b",
                    border: "none",
                    padding: "5px 10px",
                    borderRadius: "15px",
                    cursor: "pointer"
                  }}>
            View Cart
          </button>
        </div>
      )}
      
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card-component">
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <button 
              className="product-action-button" 
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopInfo;