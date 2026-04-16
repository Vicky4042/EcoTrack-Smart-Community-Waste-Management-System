import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const email = localStorage.getItem("userEmail");
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <div style={container}>
      <div style={card}>
        <h2>Profile</h2>

        <p><strong>Email:</strong> {email}</p>
        <p><strong>Role:</strong> {role}</p>

        <button style={btn} onClick={logout}>
          Logout
        </button>

        {/* 🔥 VERSION */}
        <p style={version}>
          EcoTrack v1.0.0
        </p>
      </div>
    </div>
  );
}

const container = {
  display: "flex",
  justifyContent: "center",
  marginTop: "50px"
};

const card = {
  padding: "30px",
  borderRadius: "10px",
  background: "#fff",
  width: "300px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
};

const btn = {
  marginTop: "15px",
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  background: "#d32f2f",
  color: "white"
};

const version = {
  marginTop: "20px",
  fontSize: "0.8rem",
  color: "#777"
};

export default Profile;