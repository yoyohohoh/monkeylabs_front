import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp/signup';
import LogIn from './components/LogIn/login';
import Profile from './components/Profile/profile';

const Home = () => (
  <div className="container mt-5">
    <h2>Welcome to our App!</h2>
    <p>Choose an action:</p>
    <Link to="/signup" className="d-block">
      <button className="btn btn-primary">Sign Up</button>
    </Link>
    <Link to="/login" className="d-block mt-2">
      <button className="btn btn-secondary">Login</button>
    </Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile/:userId" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;