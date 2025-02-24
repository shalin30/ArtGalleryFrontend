import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/OrderHistory.css';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('authToken');

    if (!userId) {
      setError('User not logged in.');
      return;
    }

    if (!token) {
      setError('Authentication token not found.');
      return;
    }

    axios
      .get(`http://localhost:8080/user/${userId}/order-details`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (!response.data || response.data.length === 0) {
          setError('No purchase history found.');
        } else {
          setOrders(response.data);
          console.log('Purchase history:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching purchase history:', error);
        setError('Failed to fetch purchase history. Please try again later.');
      });
  }, []);

  return (
    <div className="order-history-container">
      <h2>Purchase History</h2>
      {error ? (
        <p className="error-text">{error}</p>
      ) : (
        orders.map((order) => (
          <div key={order.orderId} className="order-item-container">
            <div className="order-details-section">
              <p>
                <strong>Order Number:</strong> {order.orderId || 'N/A'}
              </p>
              <p>
                <strong>Order Date:</strong> {order.orderDate || 'N/A'}
              </p>
              <p>
                <strong>Status: {order.status || 'N/A'}</strong>
              </p>
              <p>
                <strong>Total Price:</strong> <span className="total-amount">${order.totalAmount ? parseFloat(order.totalAmount).toFixed(2) : '0.00'}</span>
              </p>
              <p>
                <strong>Art Pieces:</strong>
              </p>
              <div className="art-item-container">
                {order.orderItems && order.orderItems.length > 0 ? (
                  order.orderItems.map((item, idx) => (
                    <div key={idx} className="art-item">
                      <img src={item.imageUrl} alt={item.artPieceName} className="art-piece-img" />
                      <p><strong>{item.artTitle}</strong></p>
                      <p>Price: ${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  ))
                ) : (
                  <p>No items found</p>
                )}
              </div>
              
            </div>

            <div className="shipping-info-section">
              <p><strong>Shipping Address:</strong></p>
              <p>{order.address1 || 'N/A'}, {order.address2 || ''}</p>
              <p>{order.city || 'N/A'}, {order.state || 'N/A'}, {order.postalCode || 'N/A'}</p>
              <p>{order.phoneNumber || 'N/A'}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;