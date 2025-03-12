import React from 'react'
import '../styles/OurStory.css'

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
          That’s where <strong>TailTales</strong> comes in—a one-stop platform
          designed to bridge the gap between pet owners and service providers.
        </p>

        <h2>Our Vision</h2>
        <p>
          <strong>TailTales</strong> is built to simplify the way{' '}
          <strong>pet owners find services</strong> and{' '}
          <strong>service providers manage their businesses</strong>.
        </p>
        <ul className="vision-list">
          ✔ <strong>For Pet Owners:</strong> Easily browse, compare, and book
          trusted services in your area—all in one place. Read reviews, get pet
          care tips, and connect with a pet-loving community. <br />
          <br />✔ <strong>For Pet Service Providers:</strong> Gain visibility,
          manage bookings, and interact with a network of pet owners looking for
          reliable care.
        </ul>

        <br />

        <h2>Why TailTales?</h2>
        <ul className="why-list">
          <li>
          <div>Convenience of Service</div>
           No more endless searching. <br/>
           Book services with just a few clicks.
          </li>
          <li>
            <div>Trust and Transparency</div>
            Verified providers and real
            customer reviews help ensure quality service.
          </li>
          <li>
            <div>Community-Focused</div>
            Connect with fellow pet owners, exchange advice, and discover new pet care tips.
          </li>
        </ul>

        <p>
          <br />
          With <strong>TailTales</strong>, we’re not just building a
          platform—we’re fostering a{' '}
          <strong>stronger, more connected pet care community</strong>.
        </p>

        <a href="/shop" className="cta">
          Explore Now
        </a>
      </div>
    </div>
  )
}
