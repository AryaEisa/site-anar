import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import logoImg from '../images/logo.png';
import 'leaflet/dist/leaflet.css';
import { ANAR, PARKING_LOTS } from '../data/parkingData';

const ANAR_ICON_SIZE = 48;

const anarIcon = L.icon({
  iconUrl: logoImg,
  iconSize: [ANAR_ICON_SIZE, ANAR_ICON_SIZE],
  iconAnchor: [ANAR_ICON_SIZE / 2, ANAR_ICON_SIZE / 2],
  popupAnchor: [0, -ANAR_ICON_SIZE / 2],
  className: 'parking-page-anar-marker',
});

const parkingIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (!points?.length) return;
    const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 17 });
  }, [map, points]);
  return null;
}

function mapsPlaceUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

export default function ParkingMap() {
  const fitPoints = useMemo(
    () => [{ lat: ANAR.lat, lng: ANAR.lng }, ...PARKING_LOTS.map((l) => ({ lat: l.lat, lng: l.lng }))],
    []
  );
  // Kartrutorna kommer från OpenStreetMaps gemensamma servrar. Laddas ingen ruta alls får gästen en
  // länk till Google Maps i stället för en grå yta.
  const [tiles, setTiles] = useState({ loaded: 0, failed: 0 });
  const tilesBroken = tiles.loaded === 0 && tiles.failed >= 3;

  return (
    <>
      <MapContainer
        className="parking-page-leaflet"
        center={[ANAR.lat, ANAR.lng]}
        zoom={16}
        // Sidan ska gå att scrolla förbi kartan: hjulet zoomar inte. Allt annat går: dra, knapparna + och -,
        // nypa, dubbelklicka, tangentbordet.
        scrollWheelZoom={false}
        zoomControl={false}
        aria-label="Karta med Anar och parkeringar"
      >
        <FitBounds points={fitPoints} />
        <ZoomControl position="bottomright" zoomInTitle="Zooma in" zoomOutTitle="Zooma ut" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // Sajten skickar annars ingen Referer alls (no-referrer i index.html), och OpenStreetMaps
          // användarvillkor för kartrutor kräver en. Bara adressen (origin) skickas, aldrig sidan.
          referrerPolicy="origin"
          eventHandlers={{
            tileload: () => setTiles((t) => ({ ...t, loaded: t.loaded + 1 })),
            tileerror: () => setTiles((t) => ({ ...t, failed: t.failed + 1 })),
          }}
        />

        <Marker position={[ANAR.lat, ANAR.lng]} icon={anarIcon}>
          <Popup>
            <strong>{ANAR.label}</strong>
            <br />
            {ANAR.address}
            <br />
            <a href={mapsPlaceUrl(ANAR.address)} target="_blank" rel="noopener noreferrer">
              Google Maps
            </a>
          </Popup>
        </Marker>

        {PARKING_LOTS.map((lot) => (
          <Marker key={lot.address} position={[lot.lat, lot.lng]} icon={parkingIcon}>
            <Popup>
              <strong>{lot.name}</strong>
              <br />
              ~{lot.distanceM} m från Anar · {lot.spaces} platser
              <br />
              {lot.address}
              <br />
              <a href={mapsPlaceUrl(lot.address)} target="_blank" rel="noopener noreferrer">
                Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {tilesBroken && (
        <p className="parking-page-map-fallback" role="status">
          Kartan kunde inte laddas just nu.{' '}
          <a href={mapsPlaceUrl(ANAR.address)} target="_blank" rel="noopener noreferrer">
            Öppna Anar i Google Maps
          </a>
        </p>
      )}
    </>
  );
}
