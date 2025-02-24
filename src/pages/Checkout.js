import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Checkout.css';

function Checkout() {
    const [cart, setCart] = useState([]);
    const [message, setMessage] = useState('');
    const [address, setAddress] = useState({
        name: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        postalCode: '',
        phoneNumber: '',
    });
    const [isAddressFetched, setIsAddressFetched] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);  
    const taxRate = 0.08;
    const userId = sessionStorage.getItem('userId');
    const token = sessionStorage.getItem('authToken');
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);

        const total = storedCart.reduce((sum, item) => sum + (parseFloat(item.artPrice) * item.quantity), 0);
        setSubtotal(total);

        if (userId) {
            axios.get(`http://localhost:8080/user/address/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => {
                if (response.data && response.data.address) {
                    setAddress(response.data.address);
                    setIsAddressFetched(true);
                } else {
                    setIsAddressFetched(false); 
                    setIsModalOpen(true); 
                }
            })
            .catch(error => {
                console.error('Error fetching address:', error);
                setIsAddressFetched(false);
                setIsModalOpen(true);
            });
        }
    }, [userId, token]);

    const handleAddressChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const validateAddress = () => {
        const { name, address1, city, state, postalCode, phoneNumber } = address;
        if (!name || !address1 || !city || !state || !postalCode || !phoneNumber) {
            setMessage('Please fill in all address fields.');
            return false;
        }

        const phonePattern = /^[0-9]{10}$/;
        const postalCodePattern = /^[0-9]+$/;
        if (!postalCodePattern.test(postalCode)) {
            setMessage('Please enter a valid postal code.');
            return false;
        }
        if (!phonePattern.test(phoneNumber)) {
            setMessage('Please enter a valid phone number.');
            return false;
        }

        return true;
    };

    const confirmAddress = () => {
        if (validateAddress()) {
            setIsAddressFetched(true);
            setIsModalOpen(false); 
        }
    };

    const placeOrder = () => {
        if(!validateAddress()){
            return;
        }

        if (!userId) {
            navigate('/login');
            return;
        }

        const orderData = {
            userId,
            artPieceDetails: cart.map(item => ({
                artPieceId: String(item.artId), 
                quantity: String(item.quantity)
            })),
            address1: address.address1,
            address2: address.address2,
            city: address.city,
            state: address.state,
            postalCode: address.postalCode,
            phoneNumber: address.phoneNumber,
            totalAmount: (subtotal + subtotal * taxRate).toFixed(2),
        };

        setIsLoading(true);
        axios.post('http://localhost:8080/user/create-order', orderData, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            setIsLoading(false);
            setShowSuccessModal(true); 
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/');
        }, 2000);

            sessionStorage.removeItem('cart');
        })
        .catch(error => {
            setIsLoading(false);
            console.error('Error placing order:', error);
        });
    };

    return (
        <div className="checkout-wrapper">
            <h2>Checkout</h2>

            <div className="checkout-body">
                <div className="checkout-left">
                    <div className="address-box">
                        <div className="c">
                            <p><strong>Delivery Address</strong></p>
                            <button className="change-address" onClick={() => setIsModalOpen(true)}>
                                Edit Address
                            </button>
                        </div>
                        {isAddressFetched && !isModalOpen ? (
                            <div className="address-details">
                                <p><strong>Name:</strong> {address.name}</p>
                                <p><strong>Address Line 1:</strong> {address.address1}</p>
                                <p><strong>Address Line 2:</strong> {address.address2}</p>
                                <p><strong>City:</strong> {address.city}</p>
                                <p><strong>State:</strong> {address.state}</p>
                                <p><strong>Postal Code:</strong> {address.postalCode}</p>
                                <p><strong>Phone Number:</strong> {address.phoneNumber}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className="cart-items-box">
                        <h3>Items in Your Order</h3>
                        {cart.map((item, index) => (
                            <React.Fragment key={item.artId}>
                                <div className="cart-item-details">
                                    <img src={item.imageUrl} alt={item.artName} />
                                    <p>{item.artName}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${parseFloat(item.artPrice).toFixed(2)}</p>
                                </div>
                                {index !== cart.length - 1 && <div className="border-bottom"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="checkout-right">
                    <div className="order-summary-box">
                        <h3>Order Summary</h3>
                        <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
                        <p><strong>Tax:</strong> ${(subtotal * taxRate).toFixed(2)}</p>
                        <div className="border-bottom"></div>
                        <p className="total-price"><strong>Total:</strong> ${(subtotal + subtotal * taxRate).toFixed(2)}</p>
                        <button className="place-order-btn" onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="address-modal">
                    <div className="modal-content">
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>&times;</button>
                        <h3>Edit Address</h3>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Name" 
                            value={address.name} 
                            onChange={handleAddressChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address1" 
                            placeholder="Address Line 1" 
                            value={address.address1} 
                            onChange={handleAddressChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address2" 
                            placeholder="Address Line 2" 
                            value={address.address2} 
                            onChange={handleAddressChange} 
                        />
                        <input 
                            type="text" 
                            name="city" 
                            placeholder="City" 
                            value={address.city} 
                            onChange={handleAddressChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="state" 
                            placeholder="State" 
                            value={address.state} 
                            onChange={handleAddressChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="postalCode" 
                            placeholder="Postal Code" 
                            value={address.postalCode} 
                            onChange={handleAddressChange} 
                            required 
                            pattern="[0-9]+" 
                        />
                        <input 
                            type="tel" 
                            name="phoneNumber" 
                            placeholder="Phone Number" 
                            value={address.phoneNumber} 
                            onChange={handleAddressChange} 
                            required 
                            pattern="[0-9]{10}" 
                        />
                        {message && <p className="login-response-message"> 
                            {message}
                            </p>}
                        <button className="confirm-address" onClick={confirmAddress}>
                            Confirm Address
                        </button>
                    
                    </div>
                </div>
            )}

            {showSuccessModal && (
                    <div className="password-update-modal-overlay">
                    <div className="password-update-modal-content">
                        <p>Order placed successfully!</p>
                    </div>
                    </div>
                )}

            {isLoading && (
                <div className="loading-modal-overlay">
                    <div className="loading-modal-content">
                        <div className="spinner"></div>
                        <p>Processing your order...</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Checkout;