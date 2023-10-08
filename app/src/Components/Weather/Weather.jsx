import { useState, useEffect, use } from "react";
import './style/Weather.css'

export default function Weather(){
    const [mode, setMode] = useState("dashboard");


    const Sidebar = () => {
        const modes = ["Dashboard", "Map", "Cities", "Settings"]

        return(
            <nav className="sidebar">
                <div className="logo">
                    <img src="/assets/logo.png" alt="" />
                </div>
                <div className="modes">
                {
                    modes.map((item, i) => (
                        <div className={i===0 ? "option active" : "option"}>
                            <img src={`/assets/${item.toLocaleLowerCase()}.png`} alt="" />
                            <h3>{item}</h3>
                        </div>
                    ))
                }
                </div>
            </nav>
        )
    }

    return(
        <main className="Weather">
            <Sidebar />
        </main>
    );
}