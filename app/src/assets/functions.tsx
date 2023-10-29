import { Polyline, circle as L_circle, marker, divIcon, LatLngExpression, Map as L_Map, polygon, Circle, Marker } from 'leaflet';
import { api, dpk } from './const';


export const round = (num: number, digits: number):number => Math.round(num*(10**digits))/(10**digits)



//------------------// EXPORTS FOR MAP COMPONENTS //------------------//

export const createActiveSensorMarker = (map: L_Map, location: LatLngExpression, sensorID: number | string, measurement: { [item: string]: string }): (Marker | Circle)[] => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `
            <div class="marker"
                <h5 class="title">SENSOR ${sensorID}</h1>
            </div>
        `.replaceAll(",", ""),
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });
    const markerE: any = marker(location, {icon: markerIcon}).addTo(map);

    markerE.on('mouseover', function (this: any) {
        let text = "<h2>Poslednje merenje</h2>"
        Object.keys(measurement).map(key => text += key + ": " + measurement[key] + "<br />")
        this.bindPopup(text).openPopup();
    });
    markerE.on('mouseout', function (this: any) {this.closePopup();});

    const l1 = L_circle(location, { color: '', fillColor: "#ff00338f", fillOpacity: 1,radius: 30});
    const l2 = L_circle(location, { color: '', fillColor: "#ff00338f", fillOpacity: 1,radius: 50});
    const l3 = L_circle(location, { color: '', fillColor: "#ff00338f", fillOpacity: 1,radius: 70});
    l1.addTo(map);
    l2.addTo(map);
    l3.addTo(map);

    return [markerE, l1, l2, l3]
}
export const createOutOfScopeSensorMarker = (map: L_Map, location: LatLngExpression, sensorID: number | string): void => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `
            <div class="marker outOfScope"
                <h5 class="title">SENSOR ${sensorID}</h1>
            </div>
        `,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });

    [
        { fillColor: "#101010ff", radius: 20 },
        { fillColor: "#101010ff", radius: 40 },
        { fillColor: "#101010ff", radius: 60 }
    ].map(c => 
        L_circle(location, {
            color: '',
            fillColor: c.fillColor,
            radius: c.radius
        }).addTo(map)
    )
    marker(location, {icon: markerIcon}).addTo(map);
}
export const createUserMarker = (map: L_Map, location: LatLngExpression): (Marker | Circle)[] => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `
            <div class="user marker"
                <h5 class="title">YOU</h1>
            </div>
            `,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });
    const m = marker(location, {icon: markerIcon});
    const c = L_circle(location, {color: '#000EA8',fillColor: '#000EA8',radius: 75})
    m.addTo(map);
    c.addTo(map);
    return [m, c]
}
export const createSelectedMarker = (map: L_Map, location: number[], options: string[]): (Circle | Marker)[] => {
    const markerIcon = divIcon({
        className: 'custom-icon',
        html: `
            <div class="selected marker"
                <h5 class="title">SELECTED</h1>
                <div id="custom-menu">
                    ${options.map(o => `<div class='option'>${o}</div>`).toString().replaceAll(",", "")}
                </div>
            </div>
            `,
        iconSize: [80, 40],
        iconAnchor: [40, 20]
    });
    const m = marker([location[0], location[1]], {icon: markerIcon})
    const c = L_circle([location[0], location[1]], {color: '#266c1a',fillColor: '#266c1a',radius: 75})
    m.addTo(map)
    c.addTo(map)
    return [m, c]
}
export const createStatsCircle = (map: L_Map, location: number[]): (Polyline | Circle)[] => {
    const c: Circle<any> = L_circle([location[0], location[1]], {color: '#266c1a',fillColor: '#266c1a',radius: 10_000})
    const p: Polyline<any> = createPolyline(map, [location[0], location[1]], [location[0]+(dpk*10), location[1]])
    c.addTo(map)
    return [c, p]
}
export const createPolyline = (map: L_Map, p1: LatLngExpression, p2: LatLngExpression): Polyline => {
    const p = new Polyline([p1, p2], {
        color: 'red',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
    }).addTo(map);
    return p
}
export const createArea = (map: L_Map, points: LatLngExpression[]): void => { polygon(points).addTo(map); }
export const generateData = () => {
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
    
    fetch(api+"/sensors/air", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sensorLocations)
    })
    console.log("NEW DATA GENERATED!")
    return [activeSensors, ouOfScopeSensors]
}



