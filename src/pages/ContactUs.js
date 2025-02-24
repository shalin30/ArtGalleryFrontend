import React, { useState } from 'react';
import '../css/ContactUs.css';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-left">
        <h1 className="contact-title">Hey there!</h1>
        <p className="contact-description">
          We’re thrilled that you want to connect with us! Whether you have a question, need assistance, or just want to share your thoughts, we’re all ears. 🎨✨
          Drop us a message, and we’ll get back to you faster than you can say, “Wow, that was quick!” 🚀
        </p>

        <form onSubmit={handleSubmit} className="contact-form">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </form>
      </div>

      <div className="contact-right">
        <h2 className="contact-info-title">Need to get in touch sooner?</h2>
        <p className="contact-info">Having an issue with your order or need urgent assistance?</p>
        <p className="contact-info"> No worries! You can also reach us directly through these channels:
        </p>
        <p className="contact-details">📧 Email: support@artgallery.com</p>
        <p className="contact-details">📞 Phone: +1 (123) 456-7890</p>
        <p className="contact-details">📍 Address: 123 Art St, New York, NY</p>
      </div>
    </div>
  );
}

export default ContactUs;