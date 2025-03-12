import React from "react";
import '../styles/ShopInfo.css'
import product1 from "../images/product1.png";
import product2 from "../images/product2.png";
import product3 from "../images/product3.png";
import product4 from "../images/product4.png";
import product5 from "../images/product5.png";
import product6 from "../images/product6.png";
import product7 from "../images/product7.png";
import product8 from "../images/product8.png";
import product9 from "../images/product9.png";

const products = [
  { id: 1, name: "Royal Canin Small Dog food", price: "$7.80", image: product1 },
  { id: 2, name: "Rug rope for Dogs", price: "$10", image: product2 },
  { id: 4, name: "Royal Canin Canned Cat food", price: "$7.80", image: product4 },
  { id: 6, name: "Tease Play laser", price: "$10", image: product6 },
  { id: 3, name: "Giraffe Plush", price: "$7", image: product3 },
  { id: 7, name: "Flapping fish for cats", price: "$30", image: product7 },
  { id: 8, name: "Rubber Frisbee", price: "$10", image: product8 },
  { id: 5, name: "Royazl Canin Cat Pouche", price: "$5", image: product5 },
  { id: 9, name: "Ball Launcher", price: "$40", image: product9 },
];

const ShopInfo = () => {
  return (
    <div className="shop-container">
      <h2 className="shop-title">Shop Products</h2>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopInfo;
