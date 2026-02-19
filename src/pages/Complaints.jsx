import { useState, useEffect } from "react";

function Complaints() {
  const role = localStorage.getItem("role");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [complaintsData, setComplaintsData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaintsData(storedComplaints);
  }, []);

  const updateStorage = (updatedData) => {
    localStorage.setItem("complaints", JSON.stringify(updatedData));
    setComplaintsData(updatedData);
  };

  const deleteComplaint = (id) => {
    const updated = complaintsData.filter((c) => c.id !== id);
    updateStorage(updated);
  };

  const markAsCompleted = (id) => {
    const updated = complaintsData.map((c) =>
      c.id === id ? { ...c, status: "Completed" } : c
    );
    updateStorage(updated);
  };

  const startEditing = (id, currentText) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const saveEdit = (id) => {
    const updated = complaintsData.map((c) =>
      c.id === id ? { ...c, description: editedText } : c
    );
    updateStorage(updated);
    setEditingId(null);
  };

  const filteredComplaints = complaintsData.filter((c) => {
    const matchesSearch = c.location
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || c.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Complaints List</h2>

      <input
        type="text"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="input"
      >
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      <div className="grid">
        {filteredComplaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          filteredComplaints.map((c) => (
            <div key={c.id} className="card">
              <h3>{c.location}</h3>
              <p><strong>Type:</strong> {c.type}</p>
              <p><strong>Status:</strong> {c.status}</p>

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

              <div style={{ marginTop: "10px" }}>

                {/* Worker → Only Mark Completed */}
                {role === "Worker" && c.status === "Pending" && (
                  <button
                    className="btn"
                    onClick={() => markAsCompleted(c.id)}
                  >
                    Mark Completed
                  </button>
                )}

                {/* Admin → Edit + Delete */}
                {role === "Admin" && (
                  <>
                    <button
                      className="btn"
                      style={{ marginTop: "5px", background: "#ff9800" }}
                      onClick={() =>
                        startEditing(c.id, c.description)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="btn"
                      style={{ marginTop: "5px", background: "#d32f2f" }}
                      onClick={() => deleteComplaint(c.id)}
                    >
                      Delete
                    </button>
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
