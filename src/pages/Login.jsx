import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      u => u.email === email && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("role", foundUser.role);
      localStorage.setItem("userEmail", foundUser.email);

      // 🔥 FIXED REDIRECT
      if (foundUser.role === "Admin") {
        navigate("/dashboard");
      } else if (foundUser.role === "Worker") {
        navigate("/worker");
      } else {
        navigate("/report");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="btn" onClick={handleLogin}>
        Login
      </button>

      <p style={{ marginTop: "10px" }}>
        New User?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/register")}
        >
          Register here
        </span>
      </p>
    </div>
  );
}

export default Login;