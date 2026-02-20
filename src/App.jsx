import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import Complaints from "./pages/Complaints";
import WorkerDashboard from "./pages/WorkerDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminUsers from "./pages/AdminUsers";
function App() {

  // Initialize default Admin
 useEffect(() => {
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check Admin
  const adminExists = users.some(
    (u) => u.email === "admin@ecotrack.com"
  );

  // Check Worker
  const workerExists = users.some(
    (u) => u.email === "worker@ecotrack.com"
  );

  // Add Admin if missing
  if (!adminExists) {
    users.push({
      email: "admin@ecotrack.com",
      password: "admin123",
      role: "Admin"
    });
  }

  // Add Worker if missing
  if (!workerExists) {
    users.push({
      email: "worker@ecotrack.com",
      password: "worker123",
      role: "Worker"
    });
  }

  localStorage.setItem("users", JSON.stringify(users));
}, []);

  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report"
            element={
              <ProtectedRoute allowedRoles={["Citizen"]}>
                <ReportWaste />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker"
            element={
              <ProtectedRoute allowedRoles={["Worker"]}>
                <WorkerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />
          <Route
  path="/admin-users"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <AdminUsers />
    </ProtectedRoute>
  }
/>
 </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;