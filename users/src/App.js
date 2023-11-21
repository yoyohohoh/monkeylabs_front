// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignUp from './components/SignUp/signup';
import LogIn from './components/LogIn/login';
import Profile from './components/Profile/profile';

const Home = () => (
  <div>
    <h2>Welcome to our App!</h2>
    <p>Choose an action:</p>
    <Link to="/signup">
      <button>Sign Up</button>
    </Link>
    <p></p>
    <Link to="/login">
      <button>Login</button>
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
