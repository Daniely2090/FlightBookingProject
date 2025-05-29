import React, { useState, useEffect } from 'react';
import api from '../api'; 
import './RoutesList.css';

const RoutesList = () => {
  const [routes, setRoutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [passengerName, setPassengerName] = useState('');
  const [seatNumber, setSeatNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);  // מצב הספינר

  useEffect(() => {
    const hardcodedRoutes = [
      { id: 1, origin: 'Tokyo', destination: 'London', flightNumber: 'JL701', departureTime: '2025-06-15 08:30', airline: 'Japan Airlines', price: 820 },
      { id: 2, origin: 'Las Vegas', destination: 'Hawaii', flightNumber: 'HA309', departureTime: '2025-07-03 10:00', airline: 'Hawaiian Airlines', price: 540 },
      { id: 3, origin: 'Paris', destination: 'Maldives', flightNumber: 'AF216', departureTime: '2025-08-01 21:45', airline: 'Air France', price: 980 },
      { id: 4, origin: 'Tel Aviv', destination: 'Phuket', flightNumber: 'LY509', departureTime: '2025-06-28 17:00', airline: 'El Al', price: 1020 },
      { id: 5, origin: 'Cape Town', destination: 'Johannesburg', flightNumber: 'SA343', departureTime: '2025-07-11 14:20', airline: 'South African Airways', price: 160 },
      { id: 6, origin: 'Dubai', destination: 'Tulum', flightNumber: 'EK785', departureTime: '2025-07-20 02:30', airline: 'Emirates', price: 1130 },
      { id: 7, origin: 'Costa Rica', destination: 'Peru', flightNumber: 'AV404', departureTime: '2025-06-30 12:15', airline: 'Avianca', price: 730 },
      { id: 8, origin: 'Barcelona', destination: 'Miami', flightNumber: 'IB349', departureTime: '2025-08-08 16:00', airline: 'Iberia', price: 860 },
      { id: 9, origin: 'Madrid', destination: 'Ibiza', flightNumber: 'UX987', departureTime: '2025-06-22 09:00', airline: 'Air Europa', price: 140 },
      { id: 10, origin: 'Roma', destination: 'Mauritius', flightNumber: 'AZ555', departureTime: '2025-07-15 19:10', airline: 'ITA Airways', price: 900 },
      { id: 11, origin: 'Bangkok', destination: 'Philippines', flightNumber: 'TG678', departureTime: '2025-08-02 07:30', airline: 'Thai Airways', price: 600 },
      { id: 12, origin: 'San Francisco', destination: 'Sri Lanka', flightNumber: 'UA974', departureTime: '2025-08-18 11:45', airline: 'United Airlines', price: 1050 }
    ];
    setRoutes(hardcodedRoutes);
  }, []);

  const filteredRoutes = routes.filter((route) =>
    route.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.destination.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openReservationForm = (route) => {
    setSelectedRoute(route);
    setPassengerName('');
    setSeatNumber('');
    setMessage('');
  };

  const handleReservation = async () => {
    // כאן מפעילים ספינר
    setIsLoading(true);
    try {
      await api.post('/reservations', {
        flightPlanId: selectedRoute.id,
        fullName: passengerName,
        seatCode: seatNumber,
      });
      setMessage(`🎉 Reservation confirmed for ${passengerName} from ${selectedRoute.origin} to ${selectedRoute.destination}`);
      setSelectedRoute(null);
    } catch (error) {
      setMessage('❌ Failed to create reservation. Please try again.');
      console.error(error);
    }
    // מכבים ספינר בסוף
    setIsLoading(false);
  };

  return (
    <div className="routes-wrapper">
      <h1>🌍 Explore Unique Flight Routes</h1>

      <input
        type="text"
        placeholder="Search routes"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div className="routes-grid">
        {filteredRoutes.map((route) => (
          <div key={route.id} className="route-box">
            <h2>{route.origin} → {route.destination}</h2>
            <p>✈️ Flight Number: {route.flightNumber}</p>
            <p>🕒 Departure: {route.departureTime}</p>
            <p>🏢 Airline: {route.airline}</p>
            <p><strong>💲Price:</strong> ${route.price}</p>
            <button onClick={() => openReservationForm(route)}>Reserve</button>
          </div>
        ))}
      </div>

      {selectedRoute && (
        <div className="reservation-form">
          <h2>✈️ Reserving Flight {selectedRoute.origin} → {selectedRoute.destination}</h2>
          <p><strong>Flight:</strong> {selectedRoute.flightNumber}</p>
          <p><strong>Airline:</strong> {selectedRoute.airline}</p>
          <p><strong>Departure:</strong> {selectedRoute.departureTime}</p>

          <input
            type="text"
            placeholder="Passenger Name"
            value={passengerName}
            onChange={(e) => {
              setPassengerName(e.target.value);
              setMessage('');
            }}
          />
          <input
            type="text"
            placeholder="Seat Number"
            value={seatNumber}
            onChange={(e) => {
              setSeatNumber(e.target.value.toUpperCase());
              setMessage('');
            }}
          />
          <button onClick={handleReservation} disabled={isLoading}>
            {isLoading ? 'Processing...' : '🎉 Confirm Reservation'}
          </button>
          <button onClick={() => setSelectedRoute(null)} disabled={isLoading}>❌ Cancel</button>
        </div>
      )}

      {message && <p className="reservation-message">{message}</p>}
    </div>
  );
};

export default RoutesList;
