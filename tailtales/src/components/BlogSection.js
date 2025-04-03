import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/BlogSection.css";

export default function BlogSection() {
  const navigate = useNavigate();

  const blogArticles = [
    {
      id: 1,
      title: "My Pet is the Best",
      snippet: "Regular dog walks provide essential exercise and mental stimulation...",
      link: "/blog/1",
    },
    {
      id: 2,
      title: "Fun Activities for Your Pet",
      snippet: "Enhance your pet walks with activities like fetch, hide & seek...",
      link: "/blog/2",
    },
  ];

  return (
    <section className="blog-section">
      <h2>Pet Care Tips</h2>
      <div className="blog-cards">
        {blogArticles.map((article) => (
          <div key={article.id} className="blog-card" onClick={() => navigate(article.link)}>
            <h3>{article.title}</h3>
            <p>{article.snippet}</p>
            <button>Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
}