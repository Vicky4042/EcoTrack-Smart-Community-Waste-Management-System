import { useEffect, useState } from "react";

function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers =
      JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const updateUsers = (updated) => {
    localStorage.setItem("users", JSON.stringify(updated));
    setUsers(updated);
  };

  const changeRole = (email, newRole) => {
    const updated = users.map((u) =>
      u.email === email ? { ...u, role: newRole } : u
    );
    updateUsers(updated);
  };

  const deleteUser = (email) => {
    const updated = users.filter((u) => u.email !== email);
    updateUsers(updated);
  };

  return (
    <div>
      <h2>User Management (Admin Only)</h2>

      {users.map((u) => (
        <div key={u.email} className="card">
          <p><strong>Email:</strong> {u.email}</p>
          <p><strong>Role:</strong> {u.role}</p>

          {u.role === "Citizen" && (
            <button
              className="btn"
              onClick={() => changeRole(u.email, "Worker")}
            >
              Promote to Worker
            </button>
          )}

          {u.role === "Worker" && (
            <button
              className="btn"
              onClick={() => changeRole(u.email, "Citizen")}
            >
              Demote to Citizen
            </button>
          )}

          {u.role !== "Admin" && (
            <button
              className="btn"
              style={{ background: "#d32f2f", marginTop: "5px" }}
              onClick={() => deleteUser(u.email)}
            >
              Delete User
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminUsers;