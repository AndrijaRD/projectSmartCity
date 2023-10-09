import { useState, useEffect, use } from "react";
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