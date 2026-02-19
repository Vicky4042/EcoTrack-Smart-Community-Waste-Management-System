import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("Citizen");
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("role", role);
    navigate("/");
  };

  return (
    <div className="card">
      <h2>Login</h2>

      <select
        className="input"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Citizen</option>
        <option>Worker</option>
        <option>Admin</option>
      </select>

      <button className="btn" onClick={handleLogin}>
        Login as {role}
      </button>
    </div>
  );
}

export default Login;
