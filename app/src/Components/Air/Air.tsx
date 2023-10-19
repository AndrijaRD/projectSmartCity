import { useState } from "react"
import "./css/Air.css"

import NavBar from "./NavBar/NavBar"
import Dashboard from "./Dashboard/Dashboard";
import Map from "./Map/Map";
import Stats from "./Stats/Stats";
import Settings from "./Settings/Settings";

export default function Air(): JSX.Element {
    const [mode, setMode] = useState<string>("Dashboard");

    return(
        <main className="Air">
            <NavBar mode={mode} setMode={setMode} />
            {
                mode==="Dashboard"?<Dashboard />:
                mode==="Map"?<Map />:
                mode==="Stats"?<Stats />:
                mode==="Settings"?<Settings />: "Error"
            }
        </main>
    )
}