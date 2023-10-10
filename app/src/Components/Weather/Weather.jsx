import { useState, useEffect } from "react";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './style/Weather.css'

import Sidebar from "../Sidebar/Sidebar";

export default function Weather(){
    const [mode, setMode] = useState("Dashboard");
    
    return(
        <main className="Weather">
            <Sidebar mode={mode} setMode={setMode} />
            {
                mode === "Dashboard" ? <Dashboard /> : 
                mode === "Map" ? <Map /> :
                mode === "Cities" ? <Cities /> :
                mode === "Settings" ? <Settings /> : "Some Error"
            }
        </main>
    );
}

function Dashboard(){
    const weatherType = 0;
    const weatherText = ["Suncano", "Oblacno", "Kisovito"]
    const measurementTypes = ["Humidity", "Wind", "Gas", "Methane", "Radiation", "Toxic Particles"]
    const measurementValues = ["22%", "3.5m/s", "8mol", "12mol/m3", "103Bq", "0.1μm"]
    const weekDays = ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"]
    const currentDay = "Sre"

    return(
        <main className="mainContent">
            <div className="today">
                <div className="top">
                    <div className="text-data">
                        <div className="location">
                            <img src="/assets/location.png" alt="" />
                            <h1>Pancevo, Srbija</h1>
                        </div>
                        <h1 className="temperature">36°C</h1>
                    </div>
                    <div className="visual-data">
                        <img src={`/assets/weatherTypes/${weatherType}.png`} alt="" />
                    </div>
                </div>

                <div className="bottom">
                    {
                        measurementTypes.map((type, i) => (
                            <div className="measurement" key={type}>
                                <div className="data">
                                    <div className="left">
                                        <img src={`/assets/measurementIcons/${type.split(" ")[0].toLocaleLowerCase()}.png`} alt="" />
                                    </div>
                                    <div className="right">
                                        <h3 className="title">{type}:</h3>
                                        <h3>{measurementValues[i]}</h3>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="week">
                <h3>This weeks data:</h3>
                <div className="daysWrapper">
                {
                    weekDays.map(weekDay => {
                        const num = Math.round((Math.random()-0.25)*2)
                        const before = weekDays[weekDays.indexOf(weekDay)+1]
                        return (
                            <div className={currentDay===weekDay?'currentDay day':before===currentDay?'before day':'day'}>
                                <h3 className="dayName">{weekDay}</h3>
                                <img src={`/assets/weatherTypes/${num}.png`} alt="" />
                                <h3 className="weatherText">{weatherText[num]}</h3>
                                <h3 className="temp">23°C</h3>
                            </div>
                        )
                    })
                }
                </div>
                
            </div>
        </main>
    )
}

function Map(){
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

function Cities(){
    return(
        <main className="mainContent">
            Cities
        </main>
    )
}

function Settings(){
    return(
        <main className="mainContent">
            Settings
        </main>
    )
}