import { useState } from "react";
import './style/Weather.css'

import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import Map from "./Map";
import Cities from "./Cities"
import Settings from "./Settings"

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