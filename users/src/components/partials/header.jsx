import React from 'react';

function Navbar() {
  // Replace this with your actual logic to check if the user is logged in
  // For example, you might check if a token is stored in localStorage
  const isLoggedIn = localStorage.getItem('userToken') !== null;

  const handleLogout = () => {
    // Your logout logic here
    localStorage.removeItem('userToken');
    localStorage.removeItem("userId");
    console.log('Logged out');
    // Redirect to login or home page after logout
    window.location.href = '/';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a className="nav-link" href="/profile">Profile</a>
              </li>
            )}
          </ul>
          {isLoggedIn && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <button className="btn btn-outline-secondary" type="button" onClick={handleLogout}>Logout</button>
            </ul>
          )}
          {!isLoggedIn && (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <a className="btn btn-outline-secondary" type="button" href="/login">Login</a>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
