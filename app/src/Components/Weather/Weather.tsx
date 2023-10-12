import './style/Weather.css'
import { useState } from 'react';

import Sidebar from './Sidebar';
import Dashboard from './Dashboard';

export default function Weather(): JSX.Element {
    const [mode, setMode] = useState("Dashboard");

    return (
        <main className="Weather">
            <Sidebar mode={mode} setMode={setMode} />
            {
                mode === "Dashboard" ? <Dashboard /> : ""
                //mode === "Map" ? <Map /> :
                //mode === "Cities" ? <Cities /> :
                //mode === "Settings" ? <Settings /> : "Some Error"
            }
        </main>
    )
}