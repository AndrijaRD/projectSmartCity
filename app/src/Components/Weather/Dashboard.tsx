import { useEffect, useState } from "react";

type MeasurementType = {[type: string]: number | string};

export default function Dashboard(): JSX.Element {

    const [weekForecast, setWeekForecast] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [measurements, setMeasurements] = useState<MeasurementType>({});
    const [location, setLocation] = useState<string>("Pancevo, Srbija");
    const [today, setToday] = useState<number>(0);
    
    const forecastTypes: string[] = [ "Suncano", "Oblacno", "Kisovito" ]
    const measurementTypes: { type: string, unit: string }[] = [
        { type: "Vlaznost", unit: "%" },
        { type: "Brzina Vetra", unit: "m/s" },
        { type: "Gasovi", unit: "ppm" },
        { type: "Metan", unit: "ppm" },
        { type: "Radiacija", unit: "µSv/h" },
        { type: "Toksicne Cestice", unit: "µg/m³" }
    ]
    /*
        Measurements that are sent from api need to have all of the measurementTypes[types] plus "temperatura"
        so measurements after fetching should look like this:
        {
            "temperatura": 30.2
            "Vlaznost": 44.9
            "Brzina Vetra": 2.8
            ... (The rest of the measurementTypes types.)
        }
    */
    const weekDays: string[] = [ "Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned" ]

    const API_URL = "http://localhost:4001/app/weather/measurements"
    useEffect(() => {
        fetch(API_URL).then(res => {
            if(!res.ok) throw new Error("Network problems.")
            return res.json()
        }).then((res: MeasurementType): void => {
            setMeasurements(res || {});
            setToday((new Date()).getDay())
            console.log(res)
        }).catch((error): void => {
            console.log("An unknown error occurred: ", error);
        })
    }, [])

    return (
        <main className="dashboard">
            <div className="today">
                <div className="top">
                    <div className="text-data">
                        <div className="location">
                            <img src="/weather/map/location.png" alt="" />
                            <h1>{location}</h1>
                        </div>
                        <h1 className="temperature">{measurements['temperatura']}°C</h1>
                    </div>
                    <div className="visual-data">
                        <img src={`/weather/forecast/${weekForecast[today]}.png`} alt="" />
                    </div>
                </div>

                <div className="bottom">
                    {
                        measurementTypes.map(type => (
                            <div className="measurement" key={type.type}>
                                <div className="data">
                                    <div className="left">
                                        <img src={`/weather/measurementIcons/${type.type.replaceAll(" ", "_").toLocaleLowerCase()}.png`} alt="" />
                                    </div>
                                    <div className="right">
                                        <h3 className="title">{type.type}:</h3>
                                        <h3>{measurements[type.type.toLocaleLowerCase().replaceAll(" ", "_")] + type.unit}</h3>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="week">
                <h3>This weeks data:</h3>
                <div className="daysWrapper">
                {
                    weekDays.map((weekDay, i) => {
                        const num: number = Math.round((Math.random()-0.25)*2)
                        const before: number = weekDays.indexOf(weekDay)+1
                        return (
                            <div key={weekDay} className={today===i?'currentDay day':before===today?'before day':'day'}>
                                <h3 className="dayName">{weekDay}</h3>
                                <img src={`/weather/forecast/${today===i?weekForecast[today]:num}.png`} alt="" />
                                <h3 className="weatherText">{today===i?forecastTypes[weekForecast[today]]:forecastTypes[num]}</h3>
                                <h3 className="temp">23°C</h3>
                            </div>
                        )
                    })
                }
                </div>
                
            </div>
        </main>
    )
}