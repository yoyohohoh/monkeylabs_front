import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./event.css";
import NavBar from "../partials/header";

function EventForm() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('https://comp305groupproject.onrender.com/api/events');
                setEvents(response.data);  // Assuming response.data is an array of events
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <NavBar />
            <div className="container mt-4">
                <h1 className="mb-3 mt-5">Events</h1>
                <div className="row">
                    {events.map(event => (
                        <div key={event._id} className="col-md-4 mb-3">
                            <Link to={`/event-details/${event._id}`} className="text-decoration-none">
                                <div className="card h-100 card-hover">
                                    <div className="card-body">
                                        <h5 className="card-title">{event.event_name}</h5>
                                        <p className="card-text">Date: {event.event_date}</p>
                                        <p className="card-text">Description: {event.event_description}</p>
                                        {/* Add more event details here if needed */}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default EventForm;
