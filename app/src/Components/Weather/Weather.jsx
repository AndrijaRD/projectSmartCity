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
    // 0 - Suncano bez kise iz vetra

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
                    <div className="mainMeasurement measurement">
                        <div className="data">
                            <div className="left">
                                <img src="/assets/measurementIcons/humidity.png" alt="" />
                            </div>
                            <div className="right">
                                <h3 className="title">Humidity:</h3>
                                <h3>22%</h3>
                            </div>
                        </div>
                    </div>
                    <div className="mainMeasurement measurement">
                        <div className="data">
                            <div className="left">
                                <img src="/assets/measurementIcons/wind.png" alt="" />
                            </div>
                            <div className="right">
                                <h3 className="title">Wind:</h3>
                                <h3>13m/s</h3>
                            </div>
                        </div>
                    </div>


                    <div className="measurement">
                        <div className="data">
                            <div className="left">
                                <img src="/assets/measurementIcons/gas.png" alt="" />
                            </div>
                            <div className="right">
                                <h3 className="title">Gas:</h3>
                                <h3>7m3</h3>
                            </div>
                        </div>
                    </div>

                    <div className="measurement">
                        <div className="data">
                            <div className="left">
                                <img src="/assets/measurementIcons/methane.png" alt="" />
                            </div>
                            <div className="right">
                                <h3 className="title">Methane:</h3>
                                <h3>22mol</h3>
                            </div>
                        </div>
                    </div>

                    <div className="measurement">
                        <div className="data">
                            <div className="left">
                                <img src="/assets/measurementIcons/radiation.png" alt="" />
                            </div>
                            <div className="right">
                                <h3 className="title">Radiation:</h3>
                                <h3>22Pa</h3>
                            </div>
                        </div>
                    </div>

                    <div className="measurement">
                        <div className="data">
                            <div className="left">
                                <img src="/assets/measurementIcons/toxic.png" alt="" />
                            </div>
                            <div className="right">
                                <h3 className="title">Toxic Particles:</h3>
                                <h3>0.2mol</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="week">
                
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