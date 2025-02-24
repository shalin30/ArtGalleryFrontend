import React from 'react';
import '../css/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-us-section">
        <div className="about-us-left">
          <h2>Our Vision: Making Art Accessible to All</h2>
          <p><strong>Bringing Art to Your Doorstep</strong></p>
          <p>Welcome to our Art Gallery! 🎨 We are a passionate team dedicated to bringing exceptional art pieces from talented artists around the world directly to your fingertips. Our gallery showcases a diverse collection of artworks, ranging from contemporary to classic styles, offering something for every taste. Whether you're an art enthusiast, a seasoned collector, or someone discovering the world of art for the first time, you'll find something here that speaks to you.</p>
        </div>
        <div className="about-us-right">
          <img src="/images/Bringing_Art_To_Doorstep.jpg" alt="Art Gallery" />
        </div>
      </div>

      <hr className="divider" />

      <div className="about-us-section reverse">
        <div className="about-us-left">
          <h2>A Place for Connection: Art for Every Passion</h2>
          <p><strong>Where Art Meets People</strong></p>
          <p>Our mission is to make art accessible to everyone, regardless of their background or experience. We believe art should be celebrated, shared, and enjoyed by all, and we’ve created a space where collectors, artists, and fans can connect and explore. By offering an easy-to-navigate online platform, we aim to simplify the process of discovering and purchasing beautiful pieces of art.</p>
        </div>
        <div className="about-us-right">
          <img src="/images/Art_meets_people.png" alt="Art Connection" />
        </div>
      </div>

      <hr className="divider" />

      <div className="about-us-section">
        <div className="about-us-left">
          <h2>Quality and Authenticity: Curated with Care</h2>
          <p><strong>Discover the Highest Standard of Art</strong></p>
          <p>At the core of our gallery is a commitment to quality and authenticity. Every piece we feature is carefully curated, ensuring that our collection includes only works that reflect the highest standards of artistic excellence. We take pride in supporting both established and emerging artists, providing them with a platform to showcase their creations and reach a wider audience.</p>
        </div>
        <div className="about-us-right">
          <img src="/images/Highest_standard_of_Art.jpg" alt="Art Quality" />
        </div>
      </div>

      <hr className="divider" />
      
      <div className="about-us-section reverse">
        <div className="about-us-left">
          <h2>Knowledge and Transparency: Learn More About Art</h2>
          <p><strong>Empowering You to Make Informed Choices</strong></p>
          <p>In addition to offering a wide range of art pieces, we also provide detailed information about each artist and artwork, making it easier for you to make informed decisions. Whether you're looking for a striking painting to brighten your living room or a unique sculpture to add character to your space, our gallery is here to help you find the perfect piece.</p>
        </div>
        <div className="about-us-right">
          <img src="/images/Knowledge_Art.jpeg" alt="Learn About Art" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;