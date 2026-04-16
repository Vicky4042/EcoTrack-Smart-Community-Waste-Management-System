import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h3>EcoTrack</h3>

      <div style={{ display: "flex", alignItems: "center" }}>

        {/* Admin */}
        {role === "Admin" && (
          <>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            <Link to="/admin-users" style={linkStyle}>Users</Link>
          </>
        )}

        {/* Citizen */}
        {role === "Citizen" && (
          <Link to="/report" style={linkStyle}>Report</Link>
        )}

        {/* Worker */}
        {role === "Worker" && (
          <Link to="/worker" style={linkStyle}>Worker</Link>
        )}

        {/* Complaints */}
        {role && role !== "Worker" && (
          <Link to="/complaints" style={linkStyle}>Complaints</Link>
        )}

        {/* 🔥 PROFILE AVATAR */}
        {role && (
          <div style={{ position: "relative" }}>
            <div
              style={avatar}
              onClick={() => setOpen(!open)}
            >
              {role.charAt(0)}
            </div>

            {/* 🔽 DROPDOWN */}
            {open && (
              <div style={dropdown}>

                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  {role}
                </p>

                <button
                  style={dropBtn}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </button>

                <button
                  style={dropBtn}
                  onClick={logout}
                >
                  Logout
                </button>

                {/* 🔥 ABOUT */}
                <div style={aboutBox}>
                  <p style={{ fontWeight: "bold" }}>About</p>

                  <p style={aboutText}>
                    EcoTrack helps manage waste efficiently using smart tracking and reporting.
                  </p>

                  <p style={quote}>
                    "Small actions lead to big environmental change 🌱"
                  </p>

                  <p style={version}>v1.0.0</p>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </nav>
  );
}

/* 🔥 STYLES */

const navStyle = {
  padding: "1rem",
  background: "#2e7d32",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const linkStyle = {
  color: "white",
  margin: "0 10px",
  textDecoration: "none"
};

const avatar = {
  marginLeft: "15px",
  width: "35px",
  height: "35px",
  borderRadius: "50%",
  background: "#ffffff",
  color: "#2e7d32",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  cursor: "pointer"
};

const dropdown = {
  position: "absolute",
  right: 0,
  top: "45px",
  background: "white",
  color: "black",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  width: "200px",
  zIndex: 100
};

const dropBtn = {
  width: "100%",
  padding: "8px",
  marginTop: "5px",
  border: "none",
  cursor: "pointer",
  background: "#eee",
  borderRadius: "5px"
};

/* ABOUT */

const aboutBox = {
  marginTop: "10px",
  paddingTop: "10px",
  borderTop: "1px solid #ddd",
  textAlign: "center"
};

const aboutText = {
  fontSize: "0.8rem",
  color: "#555"
};

const quote = {
  marginTop: "5px",
  fontStyle: "italic",
  fontSize: "0.8rem",
  color: "#2e7d32"
};

const version = {
  fontSize: "0.7rem",
  color: "#888"
};

export default Navbar;