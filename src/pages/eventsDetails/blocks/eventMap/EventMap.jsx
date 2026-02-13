//styles
import styles from './EventMap.module.scss'
//react
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

//icon
import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})

L.Marker.prototype.options.icon = DefaultIcon

export default function EventMap({ location }) {
  if (!location || !location.lat || !location.lng) return null

  const position = [location.lat, location.lng]

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            {location.address} <br /> Тут буде подія!
          </Popup>
        </Marker>
      </MapContainer>

      <div className={styles.addressBox}>
        <p className={styles.label}>Локація:</p>
        <p className={styles.address}>{location.address}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`}
          target="_blank"
          rel="noreferrer"
          className={styles.googleLink}
        >
          Відкрити в Google Maps &rarr;
        </a>
      </div>
    </div>
  )
}
