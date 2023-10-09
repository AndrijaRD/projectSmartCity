import { useState, useEffect, use } from "react";
import './style/Weather.css'

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
    return(
        <main className="Dashboard">
            Dashboard
        </main>
    )
}

function Map(){
    return(
        <main className="Map">
            Map
        </main>
    )
}

function Cities(){
    return(
        <main className="Cities">
            Cities
        </main>
    )
}

function Settings(){
    return(
        <main className="Settings">
            Settings
        </main>
    )
}

function Sidebar({ mode, setMode }) {
    const modesList = ["Dashboard", "Map", "Cities", "Settings"]

    const changeTheme = () => {
        const weather = document.querySelector("main.Weather");
        if(weather.classList.contains("lightmode")){
            return weather.classList.remove("lightmode");
        } weather.classList.add("lightmode")
    }

    return(
        <nav className="sidebar">
            <div className="logo">
                <img src="/assets/logo.png" alt="" />
            </div>
            <div className="modes">
            {
                modesList.map(item => (
                    <div key={item} className={item===mode ? "option active" : "option"} onClick={e => setMode(item)} >
                        <img src={`/assets/${item.toLocaleLowerCase()}.png`} alt="" />
                        <h3>{item}</h3>
                    </div>
                ))
            }
            </div>
            <div className="theme" onClick={changeTheme}>
                <img src="/assets/theme.png" alt="" />
            </div>
        </nav>
    )
}