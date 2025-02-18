import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import product1 from "../images/product1.png";
import product2 from "../images/product2.png";
import product3 from "../images/product3.png";
import product4 from "../images/product4.png";
import product5 from "../images/product5.png";
import product6 from "../images/product6.png";
import product7 from "../images/product7.png";
import product8 from "../images/product8.png";
import product9 from "../images/product9.png";


import "../styles/TrendingProducts.css";

export default function TrendingProducts() {
  const products = [
    { id: 1, name: "Royal Canin Small Dog food", price: "7.80", image: product1},
    { id: 2, name: "Rug rope for Dogs", price: "$10", image: product2},
    { id: 3, name: "Giraffe Plush", price: "$7", image: product3 },
    { id: 4, name: "Royal Canin Canned Cat food ", price: "$7.80", image: product4 },
    { id: 5, name: "Royal Canin Cat Pouches Chunks In Gravy ", price: "$5", image: product5 },
    { id: 6, name: "Tease Play laser", price: "$10", image: product6 },
    { id: 7, name: "Flapping fish for cats", price: "$30", image: product7 },
    { id: 8, name: "Rubber Frisbee", price: "$10", image: product8 },
    { id: 9, name: "Ball Launcher", price: "$40", image: product9 },
  ];

  const visibleItems = 9; // Number of visible items
  const centerIndex = Math.floor(visibleItems / 2); // Center item index

  const [displayedProducts, setDisplayedProducts] = useState(products.slice(0, visibleItems));

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayedProducts((prev) => {
        const firstItem = prev[0]; // Capture first product
        const newProducts = [...prev.slice(1), firstItem]; // Move first to end
        return newProducts;
      });
    }, 3000); // Move every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="trending-products-container">
      <h2>Trending Products</h2>
      <div className="carousel-wrapper">
        <motion.div className="carousel">
          <AnimatePresence mode="popLayout">
            {displayedProducts.map((product, index) => {
              const isCenter = index === centerIndex;
              const isNextCenter = index === centerIndex - 1;

              return (
                <motion.div
                  key={product.id}
                  className="product-card"
                  initial={{ opacity: 0, x: 100, scale: 0.9 }} // Enter from right
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: isCenter 
                        ? [1.1, 1.3, 1.25] // Starts slightly zoomed, zooms in, stabilizes
                        : isNextCenter 
                        ? [1, 1.2, 1.15]  // Smooth scaling for incoming product
                        : [1, 0.95, 0.9] // Gradually shrinks instead of snapping

                  }}
                  exit={{opacity: 0.5, x: -80, scale: [1.3, 1.1, 0.9], transition: { duration: 2, ease: "easeInOut" }}} // Shrink as it exits left
                  transition={{
                    duration: 1.5, // Smoothens both shrinking & zooming
                    ease: "easeInOut",
                    staggerChildren: 1,
                  }}
                  layout
                >
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}