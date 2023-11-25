import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NavBar from "../partials/header";

function EventDetailsForm() {
  const { eventId } = useParams();

  const [eventDetails, setEventDetails] = useState({
    event_name: "",
    event_description: "",
    event_date: "",
    venue_id: "",
    _id: ""
  });

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch event details
    axios
      .get(`https://comp305groupproject.onrender.com/api/events/${eventId}`)
      .then((response) => {
        setEventDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });

    // Fetch tickets for the event
    axios
      .get(`https://comp305groupproject.onrender.com/api/tickets/event/${eventId}`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, [eventId]);

  return (
    <div>
      <NavBar />
      <div className="container mt-4">
        <h1 className="card-title mb-4">Event Details</h1>
        <div className="card">
          <div className="card-body">
            <p className="card-text">
              <strong>Event Name:</strong> {eventDetails.event_name}
            </p>
            <p className="card-text">
              <strong>Event Description:</strong> {eventDetails.event_description}
            </p>
            <p className="card-text">
              <strong>Event Date:</strong> {eventDetails.event_date}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h6 className="mb-3">Available Tickets</h6>
          {tickets.map(ticket => (
            <div key={ticket.id} className="card mb-2 card-hover">
              <div className="card-body">
                <p className="card-text"><strong>Seat Number:</strong> {ticket.seat_number}</p>
                <p className="card-text"><strong>Price:</strong> ${ticket.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventDetailsForm;
