import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react';

export default function Map(){
    const myLocation = [44.865749, 20.642635]
    const markerIcon2 = L.icon({
        iconUrl: "/assets/location.png",
        iconSize: [32, 32], // Size of the icon
        iconAnchor: [16, 32], // Point of the icon that corresponds to the marker's location
        popupAnchor: [0, -32] // Point from which the popup should open relative to the iconAnchor
    });

    const markerIcon = L.divIcon({
        className: 'custom-icon',
        html: '<div>Marker Text</div>',
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });

    useEffect(() => {
        const map = L.map('map').setView(myLocation, 17);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© OpenStreetMap contributors'}).addTo(map);
        L.marker([44.865749, 20.642635], {icon: markerIcon}).addTo(map)

        return () => map.remove()
    }, [])

    return <div id="map" style={{ height: '96vh', width: '100%' }}></div>
}