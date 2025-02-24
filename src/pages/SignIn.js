import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Signin.css';

const messages = [
  "Where were you all this time? Ready to finally sign in and discover what you’ve been missing?",
  "Don't worry, we've saved all the art just for you. Time to sign in and catch up!",
  "You missed out on some masterpieces, but hey, it's not too late. Sign in now!",
  "I bet you were just waiting for the perfect moment to sign in... Well, here it is!",
  "Procrastination has its perks, but you’ve missed a lot of stunning art. Sign in to make up for it!",
  "Ah, you probably missed the fantastic collection the other day, huh? Sign in and see what you’ve been ignoring!",
  "We’ve been waiting for you... Sign in and unlock a world of art you didn't know you were missing!",
  "You know, scrolling aimlessly on the internet won't get you a masterpiece. Time to sign in and get some art!",
  "Lost in the void? It’s time to sign in and find your way back to the art world!",
  "Where were you hiding all this time? Come on, sign in and get your art game on!",
  "We get it, life’s busy. But how about signing in and making it more art-filled?",
  "We saved the good stuff for you. Time to sign in and make it yours before it’s gone!",
  "So you’ve been busy... But did you miss out on our collection? No worries, sign in to see what's new!",
  "Missing out on art, huh? Well, it’s not too late—just sign in and thank us later.",
  "Finally ready to join the art world? Sign in and see what you’ve been missing out on!",
  "Oh, you’ve been busy? We get it. Now sign in and explore what you've been ignoring!",
  "Did you think we’d forget you? Nah, sign in and catch up on the art you’ve missed!",
  "Don’t make us wait any longer. Sign in and let’s get you some art!",
  "We know you’ve been avoiding it... Sign in and let us show you what you’ve missed!",
  "Come on, what’s holding you back? Sign in now and finally unlock the art treasure you’ve been ignoring!"
];

const SignIn = () => {
  const navigate = useNavigate();
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [randomMessage, setRandomMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const message = messages[Math.floor(Math.random() * messages.length)];
    setRandomMessage(message);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, email, password }),
      });
      if (response.ok) {
        setShowSuccessModal(true); 
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/login'); 
        }, 2000);

      } else {
        setMessage('Failed to create account.');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <div className="signup-page"> 
      <div className="intro-message">
        <h3>Start Your Artistic Journey</h3>
        <p>{randomMessage}</p> 
      </div>

      <div className="signin-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              className="input-field" 
              placeholder="User Name" 
              value={userName} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              className="input-field" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              className="input-field" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {message && <p className="signin-response-message"> 
                    {message}
                </p>}
          <button type="submit" className="signup-button">Sign Up</button>
          
        </form>
      </div>
      {showSuccessModal && (
        <div className="password-update-modal-overlay">
          <div className="password-update-modal-content">
            <p>Account created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;