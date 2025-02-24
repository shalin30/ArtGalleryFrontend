import React, { useState, useEffect } from 'react';
import '../css/UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({ name: '', email: '', joined: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/profile', {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
          },
        });
        if (!response.ok) {
          console.error('Failed to fetch user profile:', response.statusText);
          return;
        }
        const data = await response.json();
        setUser(data);
        setFormData({ name: data.name, email: data.email, password: '' });
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authToken')}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        console.error('Failed to update user profile:', response.statusText);
        return;
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="user-profile-container">
      <h2 className="user-profile-title">Welcome {user.name}!</h2>
      {!isEditing ? (
        <>
          <p className="user-profile-info"><strong>Name:</strong> {user.name}</p>
          <p className="user-profile-info"><strong>Email:</strong> {user.email}</p>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="user-profile-update-form">
          <div className="user-profile-form-group">
            <label htmlFor="name" className="user-profile-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="user-profile-input"
            />
          </div>
          <div className="user-profile-form-group">
            <label htmlFor="email" className="user-profile-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="user-profile-input"
            />
          </div>
          <div className="user-profile-form-group">
            <label htmlFor="password" className="user-profile-label">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="user-profile-input"
            />
          </div>
          <button type="submit" className="user-profile-submit-button">Update Profile</button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;