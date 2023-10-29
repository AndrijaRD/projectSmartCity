import { Circle, map as L_map, Marker, tileLayer} from 'leaflet';
import { Dispatch, useEffect, useState } from 'react';
import { createPolyline, createActiveSensorMarker, createUserMarker, createOutOfScopeSensorMarker, createSelectedMarker, createStatsCircle } from '../../../assets/functions';
import { sensorsDataType } from '../../../assets/types';

const lastSelectedMarker: (Marker | Circle)[] = []
const activeSenorLayers: any = []
var newLocation: number[] = [0, 0];

`
0.0097, 0.0332
0.0064, 0.0965
`

export default function Map(
    // ---       ,                   ---         ,          USED TO SET NEW LOCATION,             USED TO RE-FETCH DATA WITH NEW LOCATION
    { sensorsData,                   userLocation,          setUserLocation,                      reFetchData }: 
    {sensorsData: sensorsDataType[], userLocation: number[], setUserLocation: Dispatch<number[]>, reFetchData: Dispatch<boolean>}
){

    const [statsCircle, setStatsCircle] = useState<boolean>(false);

    useEffect((): any => {
        const activeSensors: number[] = []; sensorsData.map(s=>s.active?activeSensors.push(s.id):"");
        console.log(" +++ +++ +++ ReRendering Map +++ +++ +++ \n Location: " + userLocation + ", AS: " + activeSensors)
        
        const map: any = L_map('map').setView([userLocation[0], userLocation[1]], statsCircle?12:16);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        handleSensorPlacing(map);

        map.on('contextmenu', (e: {latlng: {lat: number, lng: number}}): void => handleSelectMarker(map, e.latlng.lat, e.latlng.lng));
        map.on('click', (): (Marker<any> | Circle<any>)[] => lastSelectedMarker.map(e => e.remove()));
        
        return () => map.remove()
    }, [sensorsData, userLocation, statsCircle])

    const handleSensorPlacing = (map: any) => {
        activeSenorLayers.length = 0
        sensorsData.map(sensor => {
            if(statsCircle) return
            if(sensor.active) {
                activeSenorLayers.push(createPolyline(map, [userLocation[0], userLocation[1]], sensor.location))
                createActiveSensorMarker(map, sensor.location, sensor.id, sensor.measurement).map(e => activeSenorLayers.push(e))
            }
            else createOutOfScopeSensorMarker(map, sensor.location, sensor.id)
        })
        createUserMarker(map, [userLocation[0], userLocation[1]]);
        if(statsCircle){
            createStatsCircle(map, [userLocation[0], userLocation[1]])
        }
    }

    const handleLocationCopy = (): void => {
        navigator.clipboard.writeText(userLocation.toString())
        window.alert("Current Location copied.")
    }

    const handleSelectMarker = (map: any, lat: number, lng: number) => {
        const options: {[key: string]: () => void} = {
            "Copy current location": () => handleLocationCopy(),
            "Set new location": () => handleLocationChange(),
            "Show/Hide stats circle": () => setStatsCircle(!statsCircle)
        }
        lastSelectedMarker.forEach((marker: any) => marker.remove());
        lastSelectedMarker.length = 0;
        createSelectedMarker(map, [lat, lng], Object.keys(options).map(o => o))
        .map(e => lastSelectedMarker.push(e)) 
        document.querySelectorAll('#custom-menu .option').forEach((e: any, i: number) => e.onclick=options[Object.keys(options)[i]])

        newLocation = [lat, lng];
    }

    const handleLocationChange = () => {
        console.log("Setting new location: " + newLocation)
        activeSenorLayers.map((layer: any) => layer.remove())
        setUserLocation(newLocation);
        reFetchData(true);
    }
    
    return <div id="map" style={{ height: '96vh', width: '100%' }}></div>
}