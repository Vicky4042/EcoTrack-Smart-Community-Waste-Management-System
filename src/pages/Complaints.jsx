import { useState, useEffect } from "react";

function Complaints() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [complaintsData, setComplaintsData] = useState([]);

  // Load complaints from LocalStorage
  useEffect(() => {
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaintsData(storedComplaints);
  }, []);

  // Update complaint status
  const markAsCompleted = (id) => {
    const updatedComplaints = complaintsData.map((c) =>
      c.id === id ? { ...c, status: "Completed" } : c
    );

    localStorage.setItem("complaints", JSON.stringify(updatedComplaints));
    setComplaintsData(updatedComplaints);
  };

  // Search + Filter logic
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

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input"
      />

      {/* Filter Dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="input"
      >
        <option>All</option>
        <option>Pending</option>
        <option>Completed</option>
      </select>

      {/* Complaint Cards */}
      <div className="grid">
        {filteredComplaints.length === 0 ? (
          <p>No complaints found</p>
        ) : (
          filteredComplaints.map((c) => (
            <div key={c.id} className="card">
              <h3>{c.location}</h3>
              <p><strong>Type:</strong> {c.type}</p>
              <p><strong>Status:</strong> {c.status}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><small>{c.createdAt}</small></p>

              {c.status === "Pending" && (
                <button
                  className="btn"
                  onClick={() => markAsCompleted(c.id)}
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
