import { useEffect, useState } from "react";

function WorkerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const loggedInEmail = localStorage.getItem("userEmail");

  const loadComplaints = () => {
    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const assignedComplaints = stored.filter(
      (c) =>
        c.assignedTo &&
        c.assignedTo.trim().toLowerCase() ===
          loggedInEmail?.trim().toLowerCase()
    );

    setComplaints(assignedComplaints);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const markAsCompleted = (id) => {
    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updated = stored.map((c) =>
      c.id === id ? { ...c, status: "Completed" } : c
    );

    localStorage.setItem("complaints", JSON.stringify(updated));

    loadComplaints(); // reload properly
  };

  return (
    <div>
      <h2>Worker Dashboard</h2>

      {complaints.length === 0 ? (
        <p>No assigned complaints</p>
      ) : (
        complaints.map((c) => (
          <div key={c.id} className="card">
            <h3>{c.location}</h3>
            <p><strong>Status:</strong> {c.status}</p>
            <p>{c.description}</p>

            {c.status === "Pending" && (
              <button
                className="btn"
                onClick={() => markAsCompleted(c.id)}
              >
                Mark Completed
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default WorkerDashboard;