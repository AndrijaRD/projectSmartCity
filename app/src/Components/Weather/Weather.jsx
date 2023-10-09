import { useState } from "react";
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
    return(
        <main className="mainContent">
            Map
        </main>
    )
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