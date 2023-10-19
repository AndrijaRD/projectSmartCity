import { map as L_map, circle as L_circle, tileLayer, marker, divIcon, LatLngExpression, Map as L_Map, polygon, circle } from 'leaflet';
import { useEffect } from 'react';

const createActiveSensorMarker = (map: L_Map, location: LatLngExpression, sensorID: number): void => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `<h5 class="marker">SENSOR ${sensorID}</h1>`,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });
    marker(location, {icon: markerIcon}).addTo(map);

    [
        { fillColor: "#ff00338f", radius: 20 },
        { fillColor: "#ff00336f", radius: 40 },
        { fillColor: "#ff00334f", radius: 60 }
    ].map(c => 
        L_circle(location, {
            color: '',
            fillColor: c.fillColor,
            fillOpacity: 1,
            radius: c.radius
        }).addTo(map)
    )
}

const createOutOfScopeSensorMarker = (map: L_Map, location: LatLngExpression, sensorID: number): void => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `<h5 class="marker out-of-scope">SENSOR ${sensorID}</h1>`,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });

    [
        { fillColor: "#333333ff", radius: 10 },
        { fillColor: "#333333ff", radius: 20 },
        { fillColor: "#333333ff", radius: 30 }
    ].map(c => 
        L_circle(location, {
            color: '',
            fillColor: c.fillColor,
            radius: c.radius
        }).addTo(map)
    )
    marker(location, {icon: markerIcon}).addTo(map);
}

const createUserMarker = (map: L_Map, location: LatLngExpression): void => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `<h5 class="user">You</h1>`,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });
    marker(location, {icon: markerIcon}).addTo(map)
    L_circle(location, {
        color: '#000EA8',
        fillColor: '#000EA8',
        radius: 50
    }).addTo(map);
}

const createArea = (map: L_Map, points: LatLngExpression[]): void => { polygon(points).addTo(map); }

const generateData = () => {
    var sensorLocations: LatLngExpression[] = [];
    var activeSensors: {location: LatLngExpression, id: number}[] = [];
    var ouOfScopeSensors: {location: LatLngExpression, id: number}[] = []
    for(var i = 0; i < 100; i++){
        const lat = 44.865749 + ( (Math.random()/50) * (Math.random()>0.5?-1:1) )
        const lon = 20.642635 + ( (Math.random()/50) * (Math.random()>0.5?-1:1) )
        const location: LatLngExpression = [lat, lon]
        sensorLocations.push(location)
        const item = {location: location, id: i}
        if(activeSensors.length < 3) activeSensors.push(item)
        else ouOfScopeSensors.push(item)
    }
    console.log(sensorLocations)
    return [activeSensors, ouOfScopeSensors]
}

export default function Map(){
    const userLocation: LatLngExpression = [44.865749, 20.642635]

    const [activeSensors, ouOfScopeSensors] = generateData();

    useEffect((): any => {
        const map: any = L_map('map').setView(activeSensors[0].location, 17);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        activeSensors.map(loc => createActiveSensorMarker(map, loc.location, loc.id))
        ouOfScopeSensors.map(loc => createOutOfScopeSensorMarker(map, loc.location, loc.id))
        //createArea(map, sensorLocations);
        createUserMarker(map, userLocation);

        return () => map.remove()
    })


    return <div id="map" style={{ height: '96vh', width: '100%' }}></div>
}