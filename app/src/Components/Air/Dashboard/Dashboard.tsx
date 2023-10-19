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
            const data = {
                temperatura: 33,
                vlaznost: 44.9,
                brzina_vetra: 2.9,
                gasovi: 15,
                metan: 3.8,
                radiacija: 152,
                toksicne_cestice: 5.8
            }
            setMeasurements(data);
            setToday((new Date()).getDay())
        })
    }, [])

    const swichViews = (to: string): void => {
        if(to==="today") {
            document.getElementsByClassName("week")[0].classList.remove("active")
            document.getElementsByClassName("today-stats")[0].classList.add("active")
            document.getElementsByClassName("week-stats")[0].classList.remove("active")
        }
        else {
            document.getElementsByClassName("today")[0].classList.remove("active")
            document.getElementsByClassName("week-stats")[0].classList.add("active")
            document.getElementsByClassName("today-stats")[0].classList.remove("active")
        }
        document.getElementsByClassName(to)[0].classList.add("active")
    }

    return (
        <main className="Dashboard">
            <div className="portrait">
                <div className="top">
                    <img src="/weather/back.jpg" alt="" />
                    <h1>Pancevo, Srbija</h1>
                    <h3>{measurements['temperatura']}°C</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--color1)" fill-opacity="1" d="M0,128L60,154.7C120,181,240,235,360,224C480,213,600,139,720,122.7C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                </div>
                <div className="swich">
                    <h3 className="today active" onClick={() => swichViews("today")}>Danas</h3>
                    <h3 className="week" onClick={() => swichViews("week")}>Nedelja</h3>
                </div>
                <div className="today-stats active">
                {
                    measurementTypes.map(type => (
                        <div className="measurement" key={type.type}>
                            <img src={`/weather/measurementIcons/${type.type.replaceAll(" ", "_").toLocaleLowerCase()}.png`} alt="" />
                            <h3 className="title">{type.type}:</h3>
                            <h3>{measurements[type.type.toLocaleLowerCase().replaceAll(" ", "_")] + type.unit}</h3>
                        </div>
                    ))
                }
                </div>
                <div className="week-stats"> {
                    weekDays.map((weekDay, i) => {
                        const num: number = Math.round((Math.random()-0.25)*2)
                        return (
                            <div key={weekDay} className={today===i?'currentDay day':'day'}>
                                <h3 className="dayName">{weekDay}</h3>
                                <img src={`/weather/forecast/${today===i?weekForecast[today]:num}.png`} alt="" />
                                <h3 className="weatherText">{today===i?forecastTypes[weekForecast[today]]:forecastTypes[num]}</h3>
                                <h3 className="temp">{Math.round((Math.random())*30)}°C</h3>
                            </div>
                        )
                    })
                } </div>
            </div>
            <div className="landscape">
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
            </div>
        </main>
    )
}