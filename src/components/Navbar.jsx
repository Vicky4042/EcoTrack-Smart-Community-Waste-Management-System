import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      <h3>EcoTrack</h3>

 <div>

  {/* Admin Links */}
  {role === "Admin" && (
    <>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/admin-users" style={linkStyle}>Manage Users</Link>
    </>
  )}

  {/* Citizen Link */}
  {role === "Citizen" && (
    <Link to="/report" style={linkStyle}>Report</Link>
  )}

  {/* All Logged Users */}
  {role && (
    <Link to="/complaints" style={linkStyle}>Complaints</Link>
  )}

  {role && (
    <>
      <span style={{ marginLeft: "10px" }}>
        Logged in as: <strong>{role}</strong>
      </span>

      <button onClick={logout} style={logoutStyle}>
        Logout
      </button>
    </>
  )}

</div>
    </nav>
  );
}

const navStyle = {
  padding: "1rem",
  background: "#2e7d32",
  color: "white",
  textAlign: "center"
};

const linkStyle = {
  color: "white",
  margin: "0 10px",
  textDecoration: "none"
};

const logoutStyle = {
  marginLeft: "10px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer"
};

export default Navbar;
