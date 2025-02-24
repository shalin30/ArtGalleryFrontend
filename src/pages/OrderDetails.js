import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/OrderDetail.css';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        if (!response.ok) throw new Error('Failed to fetch order details');
        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      {order ? (
        <div className="order-info">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Status:</strong> {order.status}</p>

          <h3>Items:</h3>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.name} - ${item.price} x {item.quantity}
              </li>
            ))}
          </ul>

          <p><strong>Total:</strong> ${order.total}</p>
        </div>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderDetails;