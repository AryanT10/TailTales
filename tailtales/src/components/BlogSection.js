import React from "react";

export default function BlogSection() {
  return (
    <section className="blog-section">
      <div className="blog-card">
        <h3>My Pet is the Best</h3>
        <p>
          Regular dog walks provide essential exercise and mental stimulation,
          ensuring your furry friend stays healthy and happy.
        </p>
        <button>Read More</button>
      </div>
      <div className="blog-card">
        <h3>Do you enjoy fun activities?</h3>
        <p>
          Enhance your pet walks with fun activities like fetch, hide and seek,
          and obstacle courses.
        </p>
        <button>Read More</button>
      </div>
    </section>
  );
}
