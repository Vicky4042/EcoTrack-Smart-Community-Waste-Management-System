function Navbar() {
  return (
    <nav style={navStyle}>
      <h2 style={{ color: "white", fontSize: "18px" }}>
        EcoTrack – Smart Community Waste Management System
      </h2>
    </nav>
  );
}

const navStyle = {
  padding: "1rem",
  background: "#2e7d32",
  textAlign: "center"
};

export default Navbar;
