import { useEffect, useState } from "react";
import getUserLocation from "../../assets/getUserLocation";
import { api } from "../../global/const";
import request from "../../global/request";

export default function Air(): JSX.Element {
    const [fetchLocation, setFetchLocation] = useState<boolean>(true);
    const [userLocation, setUserLocation] = useState<number[]>([0, 0]);

    const [fetchData, setFetchData] = useState<boolean>(false);
    const [data, setData] = useState<any>(false);

    useEffect(() => {
        if(fetchLocation){
            setFetchLocation(false);
            getUserLocation().then(location => {setUserLocation(location); setFetchData(true)});
        }
        if(userLocation[0] !== 0 && userLocation[1] !== 0 && fetchData){
            console.log(userLocation)
            setFetchData(false);
            request(api+"/").then(data => setData(data))
        }
        
    }, [fetchLocation, fetchData])

    return (
        <main className="Air">
            {
                data?
                    <div /> :
                    <div className="Loading" />
            }
        </main>
    )
}