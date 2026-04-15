import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import CameraCapture from "../components/CameraCapture";

// Fix marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

// 📍 Map click handler
function LocationPicker({ setLocation, setPosition }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );
        const data = await res.json();

        if (data?.display_name) {
          setLocation(data.display_name);
        } else {
          setLocation(`${lat}, ${lng}`);
        }
      } catch {
        setLocation(`${lat}, ${lng}`);
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

  // 📸 Capture image
  const handleCapture = (img) => {
    setImage(img);
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
      priority,

      // 🔥 Approval system
      beforeImage: null,
      afterImage: null,

      // 📸 Captured image
      image,

      // 📍 Coordinates
      lat: position?.[0],
      lng: position?.[1],

      createdAt: new Date().toLocaleString()
    };

    const existing =
      JSON.parse(localStorage.getItem("complaints")) || [];

    localStorage.setItem(
      "complaints",
      JSON.stringify([...existing, newComplaint])
    );

    alert("Complaint Submitted Successfully!");

    // Reset
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

        {/* 🗺 MAP */}
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={13}
          style={{ height: "300px", marginBottom: "1rem" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationPicker
            setLocation={setLocation}
            setPosition={setPosition}
          />
          {position && <Marker position={position} />}
        </MapContainer>

        {/* PRIORITY */}
        <select
          className="input"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        {/* LOCATION */}
        <input
          type="text"
          placeholder="Click map to select location"
          value={location}
          readOnly
          className="input"
          required
        />

        {/* TYPE */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="input"
        >
          <option>Plastic</option>
          <option>Organic</option>
          <option>E-Waste</option>
        </select>

        {/* DESCRIPTION */}
        <textarea
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />

        {/* 🔥 CAMERA */}
        <h4>Capture Image</h4>
        <CameraCapture onCapture={handleCapture} />

        {/* PREVIEW */}
        {image && (
          <img
            src={image}
            alt="Captured"
            style={{
              width: "100%",
              marginTop: "10px",
              borderRadius: "10px"
            }}
          />
        )}

        {/* SUBMIT */}
        <button type="submit" className="btn">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ReportWaste;