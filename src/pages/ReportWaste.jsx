import { useState } from "react";

function ReportWaste() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Plastic");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location || !description) {
      alert("Please fill all required fields");
      return;
    }

    alert("Complaint Submitted Successfully!");
    setLocation("");
    setDescription("");
    setImage(null);
  };

  return (
    <div className="card">
      <h2>Report Waste</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option>Plastic</option>
          <option>Organic</option>
          <option>E-Waste</option>
        </select>

        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />

        <input type="file" onChange={handleImage} className="input" />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: "100%", marginTop: "10px", borderRadius: "10px" }}
          />
        )}

        <button type="submit" className="btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ReportWaste;
