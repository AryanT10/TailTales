import React from 'react';
import '../styles/OurStory.css';

export default function OurStory() {
  return (
    <div className="our-story-page">
      <div className="our-story-container">
        <h1>TailTales: Connecting Pet Owners & Service Providers with Ease</h1>

        <h2>The Story Behind TailTales</h2>
        <p>
          Every pet owner wants the best for their furry (or feathery, or scaly)
          friend. Whether it's grooming, boarding, training, or veterinary care,
          finding trustworthy services can be time-consuming and frustrating.
        </p>
        <p>
          That's where <strong>TailTales</strong> comes in—a one-stop platform
          designed to bridge the gap between pet owners and service providers.
        </p>

        <h2>Our Vision</h2>
        <p>
          <strong>TailTales</strong> is built to simplify the way{' '}
          <strong>pet owners find services</strong> and{' '}
          <strong>service providers manage their businesses</strong>.
        </p>
        <ul className="vision-list">
          <li>
            <span className="check-icon">✓</span>
            <div>
              <span className="list-header">For Pet Owners:</span>
              <span className="list-content">
                Easily browse, compare, and book trusted services in your area—all in one place.
                Read reviews, get pet care tips, and connect with a pet-loving community.
              </span>
            </div>
          </li>
          <li>
            <span className="check-icon">✓</span>
            <div>
              <span className="list-header">For Pet Service Providers:</span>
              <span className="list-content">
                Gain visibility, manage bookings, and interact with a network of pet owners
                looking for reliable care.
              </span>
            </div>
          </li>
        </ul>

        <h2>Why TailTales?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 17H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-title">Convenience of Service</div>
            <p>No more endless searching. Book services with just a few clicks.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-title">Trust and Transparency</div>
            <p>Verified providers and real customer reviews help ensure quality service.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 3.13C17.7699 3.58317 19.0078 5.17699 19.0078 7.005C19.0078 8.83301 17.7699 10.4268 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="feature-title">Community-Focused</div>
            <p>Connect with fellow pet owners, exchange advice, and discover new pet care tips.</p>
          </div>
        </div>

        <p>
          With <strong>TailTales</strong>, we're not just building a
          platform—we're fostering a{' '}
          <strong>stronger, more connected pet care community</strong>.
        </p>

        <a href="/shop" className="cta">
          Explore Now
        </a>
      </div>
    </div>
  );
}