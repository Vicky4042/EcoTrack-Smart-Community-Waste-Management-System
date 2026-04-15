import { useEffect, useState } from "react";

function WorkerDashboard() {
  const [complaints, setComplaints] = useState([]);
  const loggedInEmail = localStorage.getItem("userEmail");

  const loadComplaints = () => {
    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];

    const assigned = stored.filter(
      (c) =>
        c.assignedTo &&
        c.assignedTo.trim().toLowerCase() ===
          loggedInEmail?.trim().toLowerCase()
    );

    setComplaints(assigned);
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  // 🔥 AFTER IMAGE (FIXED)
  const handleAfterImage = (id, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const stored =
        JSON.parse(localStorage.getItem("complaints")) || [];

      const updated = stored.map((c) =>
        c.id === id
          ? {
              ...c,
              afterImage: reader.result, // ✅ base64
              status: "Waiting Approval"
            }
          : c
      );

      localStorage.setItem("complaints", JSON.stringify(updated));
      loadComplaints();
    };

    reader.readAsDataURL(file); // 🔥 IMPORTANT
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

            {/* AFTER IMAGE ONLY */}
            <p><strong>Upload After Work Image:</strong></p>

            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) => handleAfterImage(c.id, e)}
              className="input"
            />

            {/* PREVIEW */}
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

            {/* STATUS MESSAGE */}
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