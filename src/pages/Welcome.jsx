import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Welcome() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // trigger animation
  }, []);

  return (
    <div
      style={{
        ...container,
        opacity: show ? 1 : 0,
        transition: "opacity 1.2s ease-in-out"
      }}
      onClick={() => navigate("/login")}
    >
      <div style={card}>
        
        {/* 🔥 LOGO ANIMATION */}
        <h1
          style={{
            ...logo,
            transform: show ? "scale(1)" : "scale(0.5)",
            transition: "transform 0.8s ease-in-out"
          }}
        >
          ♻ EcoTrack
        </h1>

        {/* TEXT FADE */}
        <p
          style={{
            marginTop: "10px",
            opacity: show ? 1 : 0,
            transition: "opacity 1.5s ease-in-out"
          }}
        >
          Smart Waste Management System
        </p>

        {/* HINT */}
        <p
          style={{
            marginTop: "20px",
            fontSize: "0.9rem",
            opacity: show ? 0.8 : 0,
            transition: "opacity 2s ease-in-out"
          }}
        >
          Click anywhere to continue →
        </p>
      </div>
    </div>
  );
}

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #1b5e20, #4caf50)",
  color: "white",
  cursor: "pointer"
};

const card = {
  textAlign: "center",
  background: "rgba(255,255,255,0.1)",
  padding: "40px",
  borderRadius: "15px",
  backdropFilter: "blur(10px)"
};

const logo = {
  fontSize: "3rem",
  fontWeight: "bold"
};

export default Welcome;