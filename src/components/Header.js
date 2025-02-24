import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import '../css/Header.css';

function Header() {
  const { isLoggedIn, userName, logout } = useContext(UserContext);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const categoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      } if(userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/categories', { withCredentials: true })
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleLogout = () => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('authToken');
    const cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    if (userId && cart.length > 0) {
      axios.post(`http://localhost:8080/cart/update/${userId}`, cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          console.log('Cart updated successfully');
        })
        .catch(error => {
          console.error('Error updating cart:', error);
        });
    }

    sessionStorage.clear();
    logout();
    navigate('/');

    setTimeout(() => {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        navigate('/');
      };
    }, 100);
  };

  return (
    <header className="header">
      <h3><Link to="/">Art Gallery</Link></h3>
      <nav>
        <ul>
          <li className="category-dropdown" ref={categoryDropdownRef}>
            <span onClick={(e) => {
              e.stopPropagation(); 
              setCategoryDropdownOpen(!categoryDropdownOpen);
              setUserDropdownOpen(false); 
            }}>
              Categories ▼
            </span>
            <div className={`dropdown-content ${categoryDropdownOpen ? 'show' : ''}`}>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <Link
                    key={category.categoryId}
                    to={`/categories/${category.categoryId}/artpieces`}
                    onClick={() => setCategoryDropdownOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))
              ) : (
                <p>Loading categories...</p>
              )}
            </div>
          </li>

          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/mycart">My Cart</Link></li>

          {isLoggedIn ? (
            <li className="user-info" ref={userDropdownRef}>
              <span className="user-name" onClick={(e) => {
                e.stopPropagation(); 
                setUserDropdownOpen(!userDropdownOpen);
                setCategoryDropdownOpen(false); 
              }}>
                Hello, {userName} ▼
              </span>
              <div className={`dropdown-content ${userDropdownOpen ? 'show' : ''}`}>
                <Link to="/purchasehistory" onClick={() => setUserDropdownOpen(false)}>My Orders</Link>
                <Link to="/profile" onClick={() => setUserDropdownOpen(false)}>Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </li>
          ) : (
            <li className="log-in"><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;