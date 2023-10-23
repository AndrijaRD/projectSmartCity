import { Circle, map as L_map, Marker, Polyline, tileLayer} from 'leaflet';
import { Dispatch, useEffect } from 'react';
import { createPolyline, createActiveSensorMarker, createUserMarker, createOutOfScopeSensorMarker, createSelectedMarker, round } from '../../../assets/functions';
import { sensorsDataType } from '../../../assets/types';

const lastSelectedMarker: (Marker | Circle)[] = []
const activeSenorLayers: any = []
var newLocation: number[] = [0, 0];

export default function Map(
    // ---       ,                   ---         ,          USED TO SET NEW LOCATION,             USED TO RE-FETCH DATA WITH NEW LOCATION
    { sensorsData,                   userLocation,          setUserLocation,                      reFetchData }: 
    {sensorsData: sensorsDataType[], userLocation: number[], setUserLocation: Dispatch<number[]>, reFetchData: Dispatch<boolean>}
){

    useEffect((): any => {
        const activeSensors: number[] = []; sensorsData.map(s=>s.active?activeSensors.push(s.id):"");
        console.log(" +++ +++ +++ ReRendering Map +++ +++ +++ \n Location: " + userLocation + ", AS: " + activeSensors)
        
        const map: any = L_map('map').setView([userLocation[0], userLocation[1]], 16);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        handleSensorPlacing(map);

        map.on('contextmenu', (e: any): void => handleSelectMarker(map, e.latlng.lat, e.latlng.lng));
        
        return () => map.remove()
    }, [sensorsData, userLocation])

    const handleSensorPlacing = (map: any) => {
        activeSenorLayers.length = 0
        sensorsData.map(sensor => {
            if(sensor.active) {
                activeSenorLayers.push(createPolyline(map, [userLocation[0], userLocation[1]], sensor.location))
                createActiveSensorMarker(map, sensor.location, sensor.id, sensor.measurement).map(e => activeSenorLayers.push(e))
            }
            else createOutOfScopeSensorMarker(map, sensor.location, sensor.id)
        })
        createUserMarker(map, [userLocation[0], userLocation[1]]);
    }

    const handleSelectMarker = (map: any, lat: number, lng: number) => {
        const optionFunctions = [
            () => navigator.clipboard.writeText(newLocation.toString()),
            handleLocationChange
        ]
        lastSelectedMarker.forEach((marker: any) => marker.remove());
        lastSelectedMarker.length = 0;
        createSelectedMarker(map, [lat, lng]).map(e => lastSelectedMarker.push(e)) 
        document.querySelectorAll('#custom-menu .option').forEach((e: any, i: number) => e.onclick=optionFunctions[i])

        newLocation = [round(lat, 4), round(lng, 4)];
    }

    const handleLocationChange = () => {
        console.log("Setting new location: " + newLocation)
        activeSenorLayers.map((layer: any) => layer.remove())
        setUserLocation(newLocation);
        reFetchData(true);
    }
    
    return <div id="map" style={{ height: '96vh', width: '100%' }}></div>
}