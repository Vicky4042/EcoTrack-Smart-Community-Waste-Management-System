function StatsCard({ title, value }) {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <h4 style={{ color: "#666", marginBottom: "10px" }}>
        {title}
      </h4>
      <h1 style={{ fontSize: "2.2rem", color: "#2e7d32" }}>
        {value}
      </h1>
    </div>
  );
}

export default StatsCard;
