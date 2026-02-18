import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    setComplaints(storedComplaints);
  }, []);

  const total = complaints.length;
  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const completed = complaints.filter(
    (c) => c.status === "Completed"
  ).length;

  const data = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [pending, completed],
        backgroundColor: ["#ff9800", "#4caf50"],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Dashboard Overview</h2>

      <div className="grid grid-3">
        <StatsCard title="Total Complaints" value={total} />
        <StatsCard title="Pending" value={pending} />
        <StatsCard title="Completed" value={completed} />
      </div>

      <div
        style={{
          maxWidth: "400px",
          height: "300px",
          margin: "2rem auto"
        }}
      >
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default Dashboard;
