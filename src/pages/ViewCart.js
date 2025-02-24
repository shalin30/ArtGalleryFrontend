import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../css/ViewCart.css';

export function UpdatedViewCart() {
    const [cart, setCart] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [randomCategory, setRandomCategory] = useState(null);
    const taxRate = 0.08;
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('authToken');
    const navigate = useNavigate();

    const calculateSubtotal = (cartItems) => {
        const total = cartItems.reduce((sum, item) => {
            const price = parseFloat(item.artPrice) || 0;
            const quantity = parseInt(item.quantity, 10) || 0;
            return sum + price * quantity;
        }, 0);
        setSubtotal(total);
    };

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];

        if (userId && storedCart.length === 0) {
            axios.get(`http://localhost:8080/user/cart/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(response => {
                    setCart(response.data);
                    sessionStorage.setItem('cart', JSON.stringify(response.data));
                    calculateSubtotal(response.data);
                })
                .catch(error => console.error('Error fetching cart:', error));
        } else {
            setCart(storedCart);
            calculateSubtotal(storedCart);
        }
    }, [userId, token]);

    useEffect(() => {
        axios.get('http://localhost:8080/categories') 
            .then(response => {
                if (response.data.length > 0) {
                    const randomIndex = Math.floor(Math.random() * response.data.length);
                    setRandomCategory(response.data[randomIndex]);
                }
            })
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const updateQuantity = (artId, amount) => {
        const updatedCart = cart.map(item =>
            item.artId === artId
                ? { ...item, quantity: Math.max(1, item.quantity + amount) }
                : item
        );

        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateSubtotal(updatedCart);
    };

    const removeItem = (artId) => {
        const updatedCart = cart.filter(item => item.artId !== artId);
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateSubtotal(updatedCart);
    };

    const syncCartToBackend = () => {
        if (userId) {
            axios.post(`http://localhost:8080/cart/update/${userId}`, cart, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then(() => console.log('Cart synced successfully'))
                .catch(error => console.error('Error syncing cart:', error));
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="view-cart">
            <div className="cart-items">
                {cart.length === 0 ? (
                    <div className="empty-cart-message">
                        <p className="empty-cart-text">Your cart is feeling a little lonely... 😢</p>
                        <p className="empty-cart-text">
                            Why not add some beautiful art to brighten it up? 🎨✨
                        </p>
                        {randomCategory && (
                            <p className="empty-cart-text">
                                Discover something unique in our{' '}
                                <Link to={`/categories/${randomCategory.categoryId}/artpieces`} className="explore-link">
                                    {randomCategory.name} collection
                                </Link>!
                            </p>
                        )}
                    </div>
                ) : (
                    cart.map(item => (
                        <div key={item.cartId} className="cart-item">
                            <div className="item-image-container">
                                <img src={item.imageUrl} alt={item.artName} />
                            </div>
                            <div className="item-details">
                                <Link to={`/pieces/${item.artId}`} className="item-name-link">
                                    <p className="item-name">{item.artName}</p>
                                </Link>
                                <p>Category: {item.artCategory}</p>
                                <p>Price: 
                                <AnimatePresence mode="popLayout">
                                    <motion.span
                                            key={`price-${item.artId}`}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ type: "spring", stiffness: 100 }}
                                            >
                                    ${isNaN(item.artPrice) ? 'N/A' : (parseFloat(item.artPrice) * item.quantity).toFixed(2)}
                                    </motion.span>
                                    </AnimatePresence>
                                </p>

                                <div className="quantity-control">
                                    <button onClick={() => updateQuantity(item.artId, -1)}>-</button>
                                    <input value={item.quantity} readOnly className="quantity-input" />
                                    <button onClick={() => updateQuantity(item.artId, 1)}>+</button>
                                </div>
                            </div>
                            <button className="remove-item" onClick={() => removeItem(item.artId)}>Remove</button>
                        </div>
                    ))
                )}
            </div>

            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <p><strong>Subtotal:</strong> 
                        <motion.span
                            key={subtotal}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            ${subtotal.toFixed(2)}
                        </motion.span>
                    </p>
                    <p><strong>Tax:</strong> 
                        <motion.span
                            key={subtotal * taxRate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            ${(subtotal * taxRate).toFixed(2)}
                        </motion.span>
                    </p>
                    <p className="total"><strong>Total: </strong>
                        <motion.span
                            key={subtotal + subtotal * taxRate}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            ${(subtotal + subtotal * taxRate).toFixed(2)}
                        </motion.span>
                    </p>
                    <button className="place-order" onClick={syncCartToBackend}>Proceed to check out</button>
                </div>
            )}
        </div>
    );
}

export default UpdatedViewCart;