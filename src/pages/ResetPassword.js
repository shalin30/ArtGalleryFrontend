import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../css/ResetPassword.css'; 

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token'); 

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'TraceId': crypto.randomUUID(), 
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        sessionStorage.removeItem('authToken'); 
        setShowSuccessModal(true); 

        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/login'); 
        }, 2000);
      } else {
        setMessage(data.message || 'Error: Password reset failed');
      }
    } catch (error) {
      setMessage('Error: Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="password-reset-container">
      <div className="password-reset-form">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              onPaste={(e) => e.preventDefault()} 
            />
          </div>
          {message && <p className="response-message">{message}</p>}
          <button className="password-reset-btn" type="submit" disabled={loading}>
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>
      </div>

      {showSuccessModal && (
        <div className="password-update-modal-overlay">
          <div className="password-update-modal-content">
            <p>Password updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;