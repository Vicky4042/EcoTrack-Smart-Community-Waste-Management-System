import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";
import Complaints from "./pages/Complaints";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />

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
            path="/complaints"
            element={
              <ProtectedRoute>
                <Complaints />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
