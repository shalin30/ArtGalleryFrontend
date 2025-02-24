import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ArtPieceDetails.css'; 

function ArtPieceDetails() {
  const { artId } = useParams();
  const [artPiece, setArtPiece] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);  
  const [offset, setOffset] = useState({ x: 0, y: 0 }); 
  const [dragging, setDragging] = useState(false);  
  const modalRef = useRef(null);  

  useEffect(() => {
    axios
      .get(`http://localhost:8080/pieces/${artId}`, { withCredentials: true })
      .then(response => setArtPiece(response.data))
      .catch(() => setError('Failed to load art piece details.'));
  }, [artId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

const handleMouseDown = (e) => {
  setDragging(true);
  const startX = e.clientX - offset.x;
  const startY = e.clientY - offset.y;

  modalRef.current.classList.add("dragging");

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const newX = e.clientX - startX;
    const newY = e.clientY - startY;
    setOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    modalRef.current.classList.remove("dragging");
    modalRef.current.removeEventListener('mousemove', handleMouseMove);
    modalRef.current.removeEventListener('mouseup', handleMouseUp);
  };

  modalRef.current.addEventListener('mousemove', handleMouseMove);
  modalRef.current.addEventListener('mouseup', handleMouseUp);
};

  const handleWheel = (e) => {
    e.preventDefault();

    if (dragging) return;

    if (e.deltaY < 0) {
      setZoomLevel(prevZoom => Math.min(prevZoom + 0.1, 3)); 
    } else {
      setZoomLevel(prevZoom => Math.max(prevZoom - 0.1, 1)); 
    }
  };

  const addToCart = () => {
    if (!artPiece) return;

    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    const existingItemIndex = cart.findIndex(item => item.artId === artPiece.artId);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            artId: artPiece.artId, 
            artName: artPiece.title,  
            artCategory: artPiece.category || "Unknown", 
            artPrice: artPiece.price,  
            imageUrl: artPiece.imageUrl, 
            quantity: 1
        });
    }
    sessionStorage.setItem('cart', JSON.stringify(cart));

    setShowSuccessModal(true); 
        setTimeout(() => {
          setShowSuccessModal(false);
        }, 400);
  };

  if (error) return <p className="error">{error}</p>;

  return (
    <main>
      {artPiece ? (
        <div className="art-piece-details">
          <div className="art-piece-page-image">
            <img src={artPiece.imageUrl || 'https://via.placeholder.com/150'} alt={artPiece.title} onClick={openModal} style={{ cursor: 'pointer' }} />
          </div>
          <div className="art-piece-info">
            <h2>{artPiece.title}</h2>
            <p>{artPiece.description}</p>
            <p><strong>Artist:</strong> {artPiece.artist}</p>
            <p><strong>Year:</strong> {artPiece.year}</p>
            <p><strong>Dimensions:</strong> {artPiece.dimensions}</p>
            <p><strong>Medium:</strong> {artPiece.medium}</p>
            <p><strong>${artPiece.price}</strong></p>
            <button className="add-to-cart-button" onClick={addToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Loading art piece details...</p>
      )}

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            ref={modalRef}
          >
          <div className="zoom-level">Zoom Level: {zoomLevel.toFixed(1)}x</div>
            <img
              src={artPiece.imageUrl || 'https://via.placeholder.com/150'}
              alt={artPiece.title}
              style={{
                transform: `scale(${zoomLevel}) translate(${offset.x}px, ${offset.y}px)`, 
                transition: 'transform 0.3s ease',
                cursor: dragging ? 'grabbing' : 'grab'  
              }}
            />
          </div>
        </div>
      )}

      {showSuccessModal && (
                          <div className="cart-update-modal-overlay">
                          <div className="cart-update-modal-content">
                              <p>Added to cart</p>
                          </div>
                          </div>
                      )}
        </main>
      );
}

export default ArtPieceDetails;