import { Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet/dist/images/marker-shadow.png',
});

export default function MapSection() {
    
    const position = [38.8951, -77.0364];

    return (

        <div>
            <Row>
                <Col>

                    <MapContainer center={position} zoom={12} style={{ height: "500px", width: "100%" }}>

                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />

                        <Marker position={position}>
                            <Popup>
                                A shop in Washington D.C
                            </Popup>
                        </Marker>

                    </MapContainer>
                </Col>
            </Row>
        </div>
    );
};