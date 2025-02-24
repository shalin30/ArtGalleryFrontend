import React, { useState } from 'react';
import '../css/ForgotPassword.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }
    setLoading(true);

    try {
        const response = await fetch(`http://localhost:8080/forgot-password?email=${encodeURIComponent(email)}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

      const data = await response.json();
      if (response.ok) {
        setMessage('If this email exists, you will receive a password reset link soon.');
      } else {
        setMessage(data.message || 'Error: Could not process request');
      }
    } catch (error) {
      setMessage('Error: Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container"> 
        <div>
        <p className="reset-instruction-text"> 
            Forgot your password? No worries, we’ve got you covered. 
        </p>
        <p className="reset-instruction-text"> 
            Simply enter the email address associated with your account, and we will send you a secure link to reset your password immediately.
        </p>
        </div>
        <div className="password-reset-form">  
            <h2>Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group"> 
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    placeholder="Enter your email"
                />
                </div>
                {message && <p className="forgot-password-response-message"> 
                    {message}
                </p>}
                <button className="password-reset-btn" type="submit" disabled={loading}> 
                {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default PasswordReset;