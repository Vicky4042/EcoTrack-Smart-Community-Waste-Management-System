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

  // 📸 BEFORE IMAGE
  const handleBeforeImage = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updated = stored.map((c) =>
      c.id === id ? { ...c, beforeImage: imageUrl } : c
    );

    localStorage.setItem("complaints", JSON.stringify(updated));
    loadComplaints();
  };

  // 📸 AFTER IMAGE → WAITING APPROVAL
  const handleAfterImage = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const updated = stored.map((c) =>
      c.id === id
        ? {
            ...c,
            afterImage: imageUrl,
            status: "Waiting Approval"
          }
        : c
    );

    localStorage.setItem("complaints", JSON.stringify(updated));
    loadComplaints();
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

            {/* STATUS */}
            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    c.status === "Completed"
                      ? "green"
                      : c.status === "Waiting Approval"
                      ? "orange"
                      : "red",
                  fontWeight: "bold"
                }}
              >
                {c.status}
              </span>
            </p>

            <p>{c.description}</p>

            {/* BEFORE IMAGE */}
            <p><strong>Upload Before Image:</strong></p>
            <input
  type="file"
  accept="image/*"
  capture="environment"
  onChange={(e) => handleBeforeImage(c.id, e)}
  className="input"
/>
            {c.beforeImage && (
              <img
                src={c.beforeImage}
                alt="Before"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "10px"
                }}
              />
            )}

            {/* AFTER IMAGE */}
            <p><strong>Upload After Image:</strong></p>
           <input
  type="file"
  accept="image/*"
  capture="environment"
  onChange={(e) => handleAfterImage(c.id, e)}
  className="input"
/>
            {c.afterImage && (
              <img
                src={c.afterImage}
                alt="After"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  borderRadius: "10px"
                }}
              />
            )}

            {/* INFO MESSAGE */}
            {c.status === "Waiting Approval" && (
              <p style={{ color: "orange", marginTop: "10px" }}>
                ⏳ Waiting for Admin Approval
              </p>
            )}

            {c.status === "Completed" && (
              <p style={{ color: "green", marginTop: "10px" }}>
                ✅ Work Approved & Completed
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default WorkerDashboard;