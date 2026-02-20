import { useEffect, useState } from "react";

function WorkerDashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(stored);
  }, []);

  return (
    <div>
      <h2>Worker Dashboard</h2>

      {complaints.length === 0 ? (
        <p>No complaints available</p>
      ) : (
        complaints.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.location}</h3>
            <p><strong>Status:</strong> {c.status}</p>
            <p>{c.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default WorkerDashboard;