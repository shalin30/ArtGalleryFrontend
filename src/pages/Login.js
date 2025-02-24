import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
  
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
      });
  
      if (response.ok) {
        const data = await response.json(); 
        const token = data.token;
        const userId = data.userId;
        const userName = data.userName;

        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('userId', userId);
        sessionStorage.setItem('userName', userName);
  
        login(userName);

        const localCart = JSON.parse(sessionStorage.getItem('cart')) || [];

        const tokenReceived = sessionStorage.getItem('authToken'); 

        const backendCartResponse = await fetch(`http://localhost:8080/user/cart/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${tokenReceived}`, 
                'Content-Type': 'application/json', 
            },
        });
        
        if (backendCartResponse.ok) {
          const backendCart = await backendCartResponse.json();

          const mergedCart = [...backendCart];
  
          localCart.forEach(item => {
            const existingItem = mergedCart.find(cartItem => cartItem.artId === item.artId);
            if (existingItem) {
              existingItem.quantity += item.quantity; 
            } else {
              mergedCart.push(item); 
            }
          });

          await fetch(`http://localhost:8080/cart/update/${userId}`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${tokenReceived}`, 
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify(mergedCart),
          });

          sessionStorage.setItem('cart', JSON.stringify(mergedCart));
        }

        navigate('/', { replace: true }); 
      } else {
        setMessage('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="username" 
              id="username" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              id="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {message && <p className="login-response-message"> 
                    {message}
                </p>}
          <div className="forgot-password">
            <button onClick={() => navigate('/forgot-password')}>Forgot Password?</button>
          </div>
        </form>
        <div className="signup-link">
          <p>
            Not a User? <Link to="/signIn">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;