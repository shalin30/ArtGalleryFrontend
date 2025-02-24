import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/Categories.css';

function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/categories`, { withCredentials: true })
      .then(response => {
        console.log('Backend Response:', response);
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        if (error.response) {
          console.log('Error Response:', error.response);
        } else if (error.request) {
          console.log('Error Request:', error.request);
        } else {
          console.log('Error Message:', error.message);
        }
        setError('Error fetching categories');
      });
  }, []);

  return (
    <main>
      <h2>Art Categories</h2>
      {error && <p className="error">{error}</p>}
      <div className="category-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div className="card" key={category.categoryId}>
              <div className="image-container">
                <img src="https://via.placeholder.com/150" alt="category" className="category-image" />
              </div>
              <h3>{category.name}</h3>
              <Link to={`/categories/${category.categoryId}/artpieces`}>
                <span>Explore &gt;</span>
              </Link>
            </div>
          ))
        ) : (
          <p>Loading categories...</p>
        )}
      </div>
    </main>
  );
}

export default Categories;