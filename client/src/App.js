import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';

let socket;

function App() {
  const [rides, setRides] = useState([]);
  const [userType, setUserType] = useState('passenger');

  useEffect(() => {
    socket = io('http://localhost:5000');

    socket.on('ride-requested', (data) => {
      console.log('Ride requested:', data);
      setRides([...rides, data]);
    });

    return () => socket.disconnect();
  }, [rides]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>🚗 Ride-Share App</h1>
          <p>Welcome to the ride-sharing platform</p>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h2>Get a ride in minutes</h2>
        <p>Safe, reliable, and affordable transportation</p>
        <button className="btn-primary">Request a Ride</button>
      </div>
    </div>
  );
}

export default App;
