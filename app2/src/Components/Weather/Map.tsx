import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react';

export default function Map(){
    const myLocation: LatLngExpression = [44.865749, 20.642635]

    const markerIcon = L.divIcon({
        className: 'custom-icon',
        html: '<div>Marker Text</div>',
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });

    useEffect((): any => {
        const map = L.map('map').setView(myLocation, 17);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '© OpenStreetMap contributors'}).addTo(map);
        L.marker([44.865749, 20.642635], {icon: markerIcon}).addTo(map)

        return () => map.remove()
    })

    return <div id="map" style={{ height: '96vh', width: '100%' }}></div>
}