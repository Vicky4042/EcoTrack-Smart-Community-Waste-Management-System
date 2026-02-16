import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ReportWaste from "./pages/ReportWaste";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<ReportWaste />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
