import React, { useEffect, useState } from "react";
import axios from "axios";
import "./orders.css";
import NavBar from "../partials/header";  // Import the NavBar component

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
          {
            withCredentials: true,
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  return (
    <>
      <NavBar />  {/* NavBar component */}
      <div className="orders-container">
        <h1>Your Orders</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                <div>Order ID: {order._id}</div>
                <div>Order Date: {new Date(order.order_date).toLocaleDateString()}</div>
                <div>Card Holder: {order.cardHolder}</div>
                <div>Card Number: {order.cardNumber}</div>
                <div>CVV: {order.cvv}</div>
                <div>Expiry Date: {order.expiryDate}</div>
                <div>Ticket ID: {order.ticket._id}</div>
                <div>Event ID: {order.ticket.event_id}</div>
                <div>Price: ${order.ticket.price.toFixed(2)}</div>
                <div>Seat Number: {order.ticket.seat_number}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default Orders;
