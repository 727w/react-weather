import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function WeatherMap({ lat, lon, location }) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={10}
      style={{ height: "300px", width: "90%", borderRadius: "10px", marginTop: "24px", marginRight: "24px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[lat, lon]} icon={customIcon}>
        <Popup>{location}</Popup>
      </Marker>
    </MapContainer>
  );
}
