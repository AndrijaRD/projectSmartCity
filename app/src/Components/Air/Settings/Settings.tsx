import { useRef } from "react"

export default function Settings({userLocation, setUserLocation, reFetchData, activeSensors}: {userLocation: number[], setUserLocation: any, reFetchData: any, activeSensors: any}): JSX.Element {
    const latInputRef = useRef(null)
    const lngInputRef = useRef(null)
    const changeLocation = () => {
        console.log("Changing Location")
        if(!latInputRef.current || !lngInputRef.current) return
        const LatLng = [latInputRef.current.value, lngInputRef.current.value]
        setUserLocation(LatLng)
        reFetchData(true)
    }
    return (
        <div className="Settings" style={{display: "flex", flexDirection: "column"}}>
            <input ref={latInputRef} defaultValue={userLocation[0]} type="number" />
            <input ref={lngInputRef} defaultValue={userLocation[1]} type="number" />
            <button onClick={changeLocation}>Submit</button>
            <input type="text" disabled value={activeSensors} />
        </div>
    )
}