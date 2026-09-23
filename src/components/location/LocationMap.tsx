"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
    coordinates: [number, number];
    address?: string;
    title?: string;
}

const markerIcon = L.icon({
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function LocationMap({
    coordinates,
    address,
    title,
}: LocationMapProps) {
    const [longitude, latitude] = coordinates;

    return (
        <div className="h-[400px] w-full overflow-hidden rounded-2xl">
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={false}
                className="h-full w-full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={[latitude, longitude]}
                    icon={markerIcon}
                >
                    {(title || address) && (
                        <Popup>
                            {title && (
                                <strong className="block">{title}</strong>
                            )}

                            {address && (
                                <span className="block">{address}</span>
                            )}
                        </Popup>
                    )}
                </Marker>
            </MapContainer>
        </div>
    );
}