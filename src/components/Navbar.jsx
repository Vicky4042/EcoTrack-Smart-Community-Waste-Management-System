import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "white", fontSize: "16px" }}>
        EcoTrack – Smart Community Waste Management System
      </h2>
      <div style={{ marginTop: "8px" }}>
        <Link to="/" style={linkStyle}>Dashboard</Link>
        <Link to="/report" style={linkStyle}>Report Waste</Link>
      </div>
    </nav>
  );
}

const navStyle = {
  padding: "1rem",
  background: "#2e7d32",
  textAlign: "center"
};

const linkStyle = {
  color: "white",
  margin: "0 10px",
  textDecoration: "none",
  fontWeight: "bold"
};

export default Navbar;
