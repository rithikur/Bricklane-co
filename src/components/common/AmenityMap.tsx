import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { School, TreePine, Hospital, ShoppingBag, Coffee, Train } from 'lucide-react';
import { renderToString } from 'react-dom/server';

// Fix leaflet icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons for amenities using Lucide
const createCustomIcon = (iconComponent: React.ReactNode, color: string) => {
    return L.divIcon({
        html: renderToString(
            <div style={{
                backgroundColor: color,
                padding: '6px',
                borderRadius: '50%',
                color: 'white',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {iconComponent}
            </div>
        ),
        className: 'custom-leaflet-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });
};

const amenityIcons = {
    school: createCustomIcon(<School size={16} />, '#4F46E5'), // Indigo
    park: createCustomIcon(<TreePine size={16} />, '#10B981'), // Green
    hospital: createCustomIcon(<Hospital size={16} />, '#EF4444'), // Red
    shopping: createCustomIcon(<ShoppingBag size={16} />, '#F59E0B'), // Amber
    cafe: createCustomIcon(<Coffee size={16} />, '#8B4513'), // Brown
    station: createCustomIcon(<Train size={16} />, '#3B82F6') // Blue
};

interface AmenityMapProps {
    lat: number;
    lng: number;
    propertyName: string;
}

import { useTheme } from '../../context/ThemeContext';

const AmenityMap = ({ lat, lng, propertyName }: AmenityMapProps) => {
    const { theme } = useTheme();
    const position: [number, number] = [lat, lng];

    const lightTiles = "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
    const darkTiles = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

    // Mock amenities based on the property location
    const amenities = [
        { type: 'school', name: 'Global International School', pos: [lat + 0.005, lng - 0.003], dist: '450m' },
        { type: 'park', name: 'Green Valley Park', pos: [lat - 0.004, lng + 0.006], dist: '600m' },
        { type: 'hospital', name: 'City Care Hospital', pos: [lat + 0.008, lng + 0.002], dist: '1.2km' },
        { type: 'shopping', name: 'Metropolis Mall', pos: [lat - 0.006, lng - 0.005], dist: '850m' },
        { type: 'station', name: 'Central Metro Station', pos: [lat + 0.002, lng + 0.009], dist: '1km' },
        { type: 'cafe', name: 'Artisan Coffee House', pos: [lat - 0.002, lng - 0.002], dist: '200m' },
    ];

    return (
        <div className="h-[450px] w-full rounded-std overflow-hidden border border-light-grey dark:border-dark-border shadow-sm">
            <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url={theme === 'dark' ? darkTiles : lightTiles}
                />

                {/* Property Marker */}
                <Marker position={position}>
                    <Popup>
                        <div className="font-bold text-primary-black">{propertyName}</div>
                        <div className="text-xs text-neutral-grey dark:text-neutral-grey/60">Property Location</div>
                    </Popup>
                </Marker>

                {/* Circle showing "Walkable Distance" */}
                <Circle center={position} radius={500} pathOptions={{ color: '#D4AF37', fillColor: '#D4AF37', fillOpacity: 0.1 }} />

                {/* Amenity Markers */}
                {amenities.map((amenity, idx) => (
                    <Marker
                        key={idx}
                        position={amenity.pos as [number, number]}
                        icon={amenityIcons[amenity.type as keyof typeof amenityIcons]}
                    >
                        <Popup>
                            <div className="font-bold text-sm text-primary-black">{amenity.name}</div>
                            <p className="text-xs text-neutral-grey dark:text-neutral-grey/60 capitalize">{amenity.type} · {amenity.dist}</p>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default AmenityMap;
