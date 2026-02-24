import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function LocationPicker({ setLocation, setPosition }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;

      setPosition([lat, lng]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        if (data && data.display_name) {
          setLocation(data.display_name);
        } else {
          setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
        }
      } catch (error) {
        console.error("Reverse geocoding failed:", error);
        setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
      }
    }
  });

  return null;
}

function ReportWaste() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Plastic");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [priority, setPriority] = useState("Low");
  const [position, setPosition] = useState(null);

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

    const newComplaint = {
      id: Date.now(),
      location,
      type,
      description,
      status: "Pending",
      assignedTo: null,
      priority
    };

    const existingComplaints =
      JSON.parse(localStorage.getItem("complaints")) || [];

    localStorage.setItem(
      "complaints",
      JSON.stringify([...existingComplaints, newComplaint])
    );

    alert("Complaint Submitted Successfully!");

    // Reset form
    setLocation("");
    setDescription("");
    setType("Plastic");
    setImage(null);
    setPriority("Low");
    setPosition(null);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: "1rem" }}>Report Waste</h2>

      <form onSubmit={handleSubmit}>

        {/* 🔥 MAP SECTION */}
        <MapContainer
          center={[12.9716, 77.5946]} // Bangalore default
          zoom={13}
          style={{ height: "300px", marginBottom: "1rem" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationPicker
            setLocation={setLocation}
            setPosition={setPosition}
          />
          {position && <Marker position={position} />}
        </MapContainer>

        {/* Priority */}
        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Location Auto Filled */}
        <input
          type="text"
          placeholder="Click on map to select location"
          value={location}
          readOnly
          className="input"
          required
        />

        {/* Waste Type */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option>Plastic</option>
          <option>Organic</option>
          <option>E-Waste</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          className="input"
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "10px",
              maxHeight: "300px",
              objectFit: "cover"
            }}
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