import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const Home = () => {
  const images = [
    '/images/home_1.jpeg',
    '/images/Home_2.jpg',
    '/images/Home_3.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [artPieces, setArtPieces] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, [images.length]);

  useEffect(() => {
    const fetchArtPieces = async () => {
      try {
        const response = await fetch('http://localhost:8080/categories/19/artpieces');
        if (!response.ok) {
          console.error('Failed to fetch featured art:', response.statusText);
          return;
        }
        const data = await response.json();
        setArtPieces(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching featured art:', error);
      }
    };

    fetchArtPieces();
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleArtClick = (artId) => {
    navigate(`/pieces/${artId}`);
  };

  return (
    <main className="home">
      <div className="carousel">
        <button className="carousel-arrow left-arrow" onClick={goToPrevious}>&#10094;</button>

        <div
          className="carousel-slide"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 1s ease-in-out',
          }}
        >
          {images.map((image, index) => (
            <div className="carousel-item" key={index}>
              <img src={image} alt={`Artwork ${index + 1}`} />
            </div>
          ))}
        </div>

        <button className="carousel-arrow right-arrow" onClick={goToNext}>&#10095;</button>
      </div>

      <section id="featured-section" className="featured-art">
        <h2>Featured Art</h2>
        <div className="art-grid">
          {artPieces.length > 0 ? (
            artPieces.map((art) => (
              <div key={art.artId} className="art-card" onClick={() => handleArtClick(art.artId)}>
                <img src={art.imageUrl} alt={art.title} />
                <div className="art-info">
                  <h3>{art.title}</h3>
                  <p>${art.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Loading featured artworks...</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;