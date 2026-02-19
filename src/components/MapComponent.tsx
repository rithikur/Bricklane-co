import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';

// Fix leaflet icon issue in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
    properties: Array<{
        id: number;
        price: string | number;
        address: string;
        rooms: number;
        baths: number;
        area: number;
        image: string;
        lat?: number;
        lng?: number;
    }>;
}

const MapComponent = ({ properties }: MapComponentProps) => {
    const defaultPosition: [number, number] = [19.0760, 72.8777]; // Mumbai coordinates

    return (
        <MapContainer center={defaultPosition} zoom={11} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {properties.map((property) => (
                <Marker
                    key={property.id}
                    position={[
                        property.lat || 19.0760 + (Math.random() - 0.5) * 0.1,
                        property.lng || 72.8777 + (Math.random() - 0.5) * 0.1
                    ]}
                >
                    <Popup>
                        <div className="min-w-[150px]">
                            <img src={property.image} alt={property.address} className="w-full h-24 object-cover rounded-md mb-2" />
                            <div className="font-bold text-sm mb-1">₹{property.price}</div>
                            <div className="text-xs text-neutral-grey mb-2">{property.address}</div>
                            <Link to={`/property/${property.id}`} className="block text-center bg-primary-black text-white text-xs py-1 rounded hover:bg-neutral-grey transition-colors">
                                View Details
                            </Link>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;
