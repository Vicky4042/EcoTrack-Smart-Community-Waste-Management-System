import { useState, useEffect } from "react";

function Complaints() {
  const role = localStorage.getItem("role");
  const loggedInEmail = localStorage.getItem("userEmail");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [complaintsData, setComplaintsData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaintsData(stored);
  }, []);

  const updateStorage = (updatedData) => {
    localStorage.setItem("complaints", JSON.stringify(updatedData));
    setComplaintsData(updatedData);
  };

  // 🔥 DELETE
  const deleteComplaint = (id) => {
    const updated = complaintsData.filter((c) => c.id !== id);
    updateStorage(updated);
  };

  // 🔥 ASSIGN WORKER
  const assignWorker = (id, workerEmail) => {
    const updated = complaintsData.map((c) =>
      c.id === id ? { ...c, assignedTo: workerEmail } : c
    );
    updateStorage(updated);
  };

  // 🔥 EDIT
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = (id) => {
    const updated = complaintsData.map((c) =>
      c.id === id ? { ...c, description: editedText } : c
    );
    updateStorage(updated);
    setEditingId(null);
  };

  // 🔥 APPROVE
  const approveWork = (id) => {
    const updated = complaintsData.map((c) =>
      c.id === id ? { ...c, status: "Completed" } : c
    );
    updateStorage(updated);
  };

  // 🔥 REJECT
  const rejectWork = (id) => {
    const updated = complaintsData.map((c) =>
      c.id === id
        ? { ...c, status: "Pending", afterImage: null }
        : c
    );
    updateStorage(updated);
  };

  // 🔍 FILTER
  const filteredComplaints = complaintsData.filter((c) => {
    const matchSearch = c.location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || c.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Complaints List</h2>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      {/* 🔽 FILTER */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="input"
      >
        <option>All</option>
        <option>Pending</option>
        <option>Waiting Approval</option>
        <option>Completed</option>
      </select>

      <div className="grid">
        {filteredComplaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          filteredComplaints.map((c) => (
            <div key={c.id} className="card">
              <h3>{c.location}</h3>

              {/* PRIORITY */}
              <p>
                <strong>Priority:</strong>{" "}
                <span
                  style={{
                    color:
                      c.priority === "High"
                        ? "red"
                        : c.priority === "Medium"
                        ? "orange"
                        : "green",
                    fontWeight: "bold"
                  }}
                >
                  {c.priority || "Low"}
                </span>
              </p>

              <p><strong>Type:</strong> {c.type}</p>

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

              {/* ASSIGNED */}
              {c.assignedTo && (
                <p><strong>Assigned To:</strong> {c.assignedTo}</p>
              )}

              {/* DESCRIPTION */}
              {editingId === c.id ? (
                <>
                  <textarea
                    className="input"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                  />
                  <button
                    className="btn"
                    onClick={() => saveEdit(c.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <p><strong>Description:</strong> {c.description}</p>
              )}

              {/* 🖼 BEFORE IMAGE */}
              {c.beforeImage && (
                <>
                  <p><strong>Before Image:</strong></p>
                  <img
                    src={c.beforeImage}
                    alt="Before"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </>
              )}

              {/* 🖼 AFTER IMAGE */}
              {c.afterImage && (
                <>
                  <p><strong>After Image:</strong></p>
                  <img
                    src={c.afterImage}
                    alt="After"
                    style={{ width: "100%", borderRadius: "10px" }}
                  />
                </>
              )}

              <div style={{ marginTop: "10px" }}>

                {/* 🔧 WORKER VIEW */}
                {role === "Worker" &&
                  c.assignedTo === loggedInEmail &&
                  c.status === "Pending" && (
                    <p style={{ color: "blue" }}>
                      Upload work proof from Worker Dashboard
                    </p>
                )}

                {/* 👨‍💼 ADMIN CONTROLS */}
                {role === "Admin" && (
                  <>
                    {/* ASSIGN */}
                    {c.status !== "Waiting Approval" && (
                      <select
                        className="input"
                        onChange={(e) =>
                          assignWorker(c.id, e.target.value)
                        }
                      >
                        <option value="">Assign Worker</option>
                        {users
                          .filter((u) => u.role === "Worker")
                          .map((w) => (
                            <option key={w.email} value={w.email}>
                              {w.email}
                            </option>
                          ))}
                      </select>
                    )}

                    {/* EDIT */}
                    {c.status !== "Waiting Approval" && (
                      <button
                        className="btn"
                        style={{
                          marginTop: "5px",
                          background: "#ff9800"
                        }}
                        onClick={() =>
                          startEditing(c.id, c.description)
                        }
                      >
                        Edit
                      </button>
                    )}

                    {/* DELETE */}
                    {c.status !== "Waiting Approval" && (
                      <button
                        className="btn"
                        style={{
                          marginTop: "5px",
                          background: "#d32f2f"
                        }}
                        onClick={() => deleteComplaint(c.id)}
                      >
                        Delete
                      </button>
                    )}

                    {/* 🔥 APPROVAL */}
                    {c.status === "Waiting Approval" && (
                      <>
                        <p style={{ color: "orange", fontWeight: "bold" }}>
                          🔍 Awaiting Verification
                        </p>

                        <button
                          className="btn"
                          style={{ background: "green", marginTop: "5px" }}
                          onClick={() => approveWork(c.id)}
                        >
                          Approve
                        </button>

                        <button
                          className="btn"
                          style={{ background: "red", marginTop: "5px" }}
                          onClick={() => rejectWork(c.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </>
                )}

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;