import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollCarousel from 'scroll-carousel';
import 'scroll-carousel/dist/scroll.carousel.min.css';


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
    { id: 1, name: "Royal Canin Small Dog food", price: "$7.80", image: product1 },
    { id: 2, name: "Rug rope for Dogs", price: "$10", image: product2 },
    { id: 3, name: "Giraffe Plush", price: "$7", image: product3 },
    { id: 4, name: "Royal Canin Canned Cat food", price: "$7.80", image: product4 },
    { id: 5, name: "Royal Canin Cat Pouches Chunks In Gravy", price: "$5", image: product5 },
    { id: 6, name: "Tease Play laser", price: "$10", image: product6 },
    { id: 7, name: "Flapping fish for cats", price: "$30", image: product7 },
    { id: 8, name: "Rubber Frisbee", price: "$10", image: product8 },
    { id: 9, name: "Ball Launcher", price: "$40", image: product9 },
  ];

  useEffect(() => {
    const carousel = new ScrollCarousel("#scroll-carousel", {
      autoplay: true,
      autoplaySpeed: 6,
      smartSpeed: true,
      direction: "ltr",
      slideSelector: ".my-slide",
      margin: 20,
    });

    return () => carousel.destroy(); // Clean up on unmount
  }, []);

  return (
    <div className="trending-products-container">
      <h2>Trending Products</h2>
      <div className="carousel-wrapper">
        <div className="my-carousel" id="scroll-carousel">
          {products.slice(0, 6).map((product) => (
            <div className="my-slide" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}