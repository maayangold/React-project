import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "5%" }}>
      <div style={{ width: "50%", backgroundColor: "#f0f0f0", padding: "50px", borderRadius: "10px" }}>

        <h2 style={{ fontSize: '4rem', marginBottom: '20px' }}>404</h2>
        <p style={{ fontSize: '2.5rem', marginBottom: '20px' }}>.Oops! Page not found🤔</p>
        <p style={{ fontSize: '1rem', marginBottom: '40px' }}>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 20px', fontSize: '1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
