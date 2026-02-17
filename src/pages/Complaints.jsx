import { useState, useEffect } from "react";

function Complaints() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [complaintsData, setComplaintsData] = useState([]);

  useEffect(() => {
    const storedComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaintsData(storedComplaints);
  }, []);

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
      <h2>Complaints List</h2>

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
              <p>Type: {c.type}</p>
              <p>Status: {c.status}</p>
              <p>{c.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Complaints;
