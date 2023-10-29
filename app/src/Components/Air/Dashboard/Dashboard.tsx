import { useEffect, useState } from "react";
import { sensorsDataType } from "../../../assets/types";
import { AMD, weekDays, forecastTypes } from "../../../assets/const";
import { round } from "../../../assets/functions";

type MeasurementType = {[type: string]: number | string};

const getAverage = (sensorData: sensorsDataType[]) => {
    const averageValues: {[item: string]: number} = {}
    sensorData.map(s => {
        if(!s.active) return
        Object.keys(s.measurement).forEach(m => {
            if(!averageValues[m]) return averageValues[m] = parseInt(s.measurement[m])
            averageValues[m] = averageValues[m]+parseInt(s.measurement[m])
        })
    })
    Object.keys(averageValues).forEach(m => {averageValues[m] = Math.round(averageValues[m]/3*10)/10;})
    return averageValues
}

export default function Dashboard( { sensorData, userLocation }: {sensorData: sensorsDataType[], userLocation: number[]} ): JSX.Element {
    const [weekForecast, setWeekForecast] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);
    const [data, setData] = useState<MeasurementType>({});
    const [today, setToday] = useState<number>(0);    

    useEffect(() => {
        //fetch(api+"/algorithm/weekForecast/latitude/longitude").then(res => res.json()).then(forecast => setWeekForecast(forecast))
        setToday((new Date()).getDay())
        setData(getAverage(sensorData))
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
    //return(<main className="Dashboard"></main>)
    return (
        <main className="Dashboard">
            <div className="portrait">
                <div className="top">
                    <img src="/weather/back.jpg" alt="" />
                    <h1>Pancevo, Srbija</h1>
                    <h3>{data['temperature']}°C</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="var(--color1)" fillOpacity="1" d="M0,128L60,154.7C120,181,240,235,360,224C480,213,600,139,720,122.7C840,107,960,149,1080,170.7C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                </div>
                <div className="swich">
                    <h3 className="today active" onClick={() => swichViews("today")}>Danas</h3>
                    <h3 className="week" onClick={() => swichViews("week")}>Nedelja</h3>
                </div>
                <div className="today-stats active">
                {
                    // Air Measurement Dictionary
                    AMD.map(type => (
                        <div className="measurement" key={type.type}>
                            <img src={`/weather/measurementIcons/${type.srb.replaceAll(" ", "_").toLocaleLowerCase()}.png`} alt="" />
                            <h3 className="title">{type.srb}:</h3>
                            <h3>{data[type.srb.toLocaleLowerCase().replaceAll(" ", "_")] + type.unit}</h3>
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
                                <h1>{round(userLocation[0], 4)}, {round(userLocation[1], 4)}</h1>
                            </div>
                            <h1 className="temperature">{data['temperature']}°C</h1>
                        </div>
                        <div className="visual-data">
                            <img src={`/weather/forecast/${weekForecast[today]}.png`} alt="" />
                        </div>
                    </div>

                    <div className="bottom">
                        {
                            AMD.map(type => (
                                <div className="measurement" key={type.type}>
                                    <div className="data">
                                        <div className="left">
                                            <img src={`/weather/measurementIcons/${type.srb.replaceAll(" ", "_").toLocaleLowerCase()}.png`} alt="" />
                                        </div>
                                        <div className="right">
                                            <h3 className="title">{type.type}:</h3>
                                            <h3>{data[type.type] + type.unit}</h3>
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