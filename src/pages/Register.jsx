import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);

    if (exists) {
      alert("User already exists");
      return;
    }

    users.push({
      email,
      password,
      role: "Citizen"
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="card">
      <h2>Citizen Register</h2>

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

      <button className="btn" onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}

export default Register;