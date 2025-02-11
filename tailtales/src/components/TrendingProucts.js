import React from "react";
import { motion } from "framer-motion";
// import "../styles/TrendingProducts.css";

export default function TrendingProducts() {
  const productVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, staggerChildren: 0.2 } },
  };

  const products = [
    { id: 1, name: "Product 1", price: "$20" },
    { id: 2, name: "Product 2", price: "$30" },
    { id: 3, name: "Product 3", price: "$40" },
  ];

  return (
    <motion.div
      className="trending-products"
      initial="hidden"
      animate="visible"
      variants={productVariants}
    >
      <h2>Trending Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <motion.div key={product.id} className="product-card" variants={productVariants}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}