import { useState, useEffect } from "react"

import { sensorsDataType } from "../../assets/types";
import { api } from "../../assets/const";
import getUserLocation from "../../assets/GetUserLocation";
import "./css/Air.css"

import NavBar from "./NavBar/NavBar"
import Dashboard from "./Dashboard/Dashboard";
import Map from "./Map/Map";
import Stats from "./Stats/Stats";
import Settings from "./Settings/Settings";
import Loading from "./Loading/Loading";

export default function Air(): JSX.Element {
    const [mode, setMode] = useState<string>("Dashboard");
    const [fetchedLocation, setFetchedLocation] = useState<boolean>(false);
    const [fetchSensors, setFetchSensors] = useState<boolean>(false);
    const [sensorData, setSensorData] = useState<sensorsDataType[]>();

    const defaultLocation: number[] = [44.871150, 20.639400];
    const emptyLocation: number[] = [0, 0]
    const [userLocation, setUserLocation] = useState<number[]>(emptyLocation);

    useEffect(() => {
        if(userLocation === emptyLocation && !fetchedLocation) handleLocation()
        if(fetchSensors) handleDataFetching()
    }, [userLocation, sensorData, fetchSensors])

    const handleLocation = () => {
        setFetchedLocation(true)
        getUserLocation().then(location => {
            console.log(" + Got real-time location from Geolocation API or IP-Lookup!")
            setFetchSensors(true)
            setUserLocation(location)
        }).catch(() => {
            console.log(" + Unable to get real-time location, falling back to default location (Centar Pancevo, Srbija)!")
            setFetchSensors(true)
            setUserLocation(defaultLocation)
        });
    }
    const handleDataFetching = () => {
        console.log("\n ===> ===> ===> Fetching New Location <=== <=== <=== \n                " + userLocation)
        console.log(" ===> "+api+`/sensors/air/${userLocation[0]}/${userLocation[1]}`)
        
        setFetchSensors(false);
        fetch(api+`/sensors/air/${userLocation[0]}/${userLocation[1]}`).then(res => res.json()).then((data): void => {
            setSensorData(data); 
            
            // Debug code
            const AS: number[] = []; 
            data.map((s:any)=>s.active?AS.push(s.id):"");
            console.log(" ===> Got the new Sensor Data! AS: " + AS);
        });
    }
    

    return(
        <main className="Air" id="Air">
            <NavBar mode={mode} setMode={setMode} />
            {
                (sensorData)?
                    mode==="Dashboard"?<Dashboard sensorData={sensorData} userLocation={userLocation} />:
                    mode==="Map"?<Map userLocation={userLocation} sensorsData={sensorData} setUserLocation={setUserLocation} reFetchData={setFetchSensors} />:
                    mode==="Stats"?<Stats />:
                    mode==="Settings"?<Settings userLocation={userLocation} setUserLocation={setUserLocation} reFetchData={setFetchSensors} activeSensors={sensorData.map(s => s.active?s.id:null).toString().replaceAll(",,", "").slice(1, 100).split(",")}  />: "Error"
                :
                <Loading />
            }
        </main>
    )
}