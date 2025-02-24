import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/ArtPiecesByCategory.css';

function ArtPiecesByCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [artPieces, setArtPieces] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8080/categories/${categoryId}/artpieces`, { withCredentials: true })
      .then(response => setArtPieces(response.data))
      .catch(() => setError('Failed to load art pieces.'));
  }, [categoryId]);

  return (
    <main>
      {error && <p className="error">{error}</p>}
      <div className="art-card-list">
        {artPieces.length === 0 && !error ? (
          <p>Loading art pieces...</p>
        ) : (
          artPieces.map(piece => (
            <div
              key={piece.artId}
              className="art-card"
              onClick={() => navigate(`/pieces/${piece.artId}`)} 
            >
              <div className="art-piece-image">
                <img src={piece.imageUrl || 'https://via.placeholder.com/150'} alt={piece.title} />
              </div>
              <div className="price-and-title">
                <p className="art-title">{piece.title}</p>
                <p className="art-price">${piece.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

export default ArtPiecesByCategory;