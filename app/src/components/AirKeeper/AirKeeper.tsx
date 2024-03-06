import { Dispatch, useState } from 'react'
import './AirKeeper.scss'

export default function AirKeeper(): JSX.Element {
    const [section, setSection] = useState<number>(0);
    return(
        <main className="AirKeeper">
            <LeftBar active={section} setActive={setSection} />
            {
                section === 0 ? <OverView /> :
                section === 1 ? <Map /> :
                section === 2 ? <Statistics /> :
                <Settings />
            }
        </main>
    )
}

function LeftBar({active, setActive}: {active: number, setActive: Dispatch<number>}): JSX.Element {
    const path = "/assets/air-keeper/"
    const sections = [
        {
            label: "Overview",
            image: path + "weather.svg"
        }, {
            label: "Map",
            image: path + "map.svg"
        }, {
            label: "Statistics",
            image: path + "statistic.svg"
        }, {
            label: "Settings",
            image: path + "settings.svg"
        }
    ]

    return (
        <nav className="leftbar">
            { sections.map((s, i) => (
                <div
                    onClick={() => setActive(i)}
                    className={`section ${active===i?"active":""}`}
                >
                    <img src={s.image} alt="" />
                    <h3>{s.label}</h3>
                </div>
            )) }
        </nav>
    )
}

function OverView(): JSX.Element {

    const parameters = [
        {}
    ]

    return (
        <div className="overview">
            <div className="parameter-wrapper">
                <div className="parameter">
                    <div className="name">Humidity</div>
                    <div className="scale2_">
                        <div className="baseline"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="color leftred"></div>
                        <div className="color leftyellow"></div>
                        <div className="color middle"></div>
                        <div className="color rightyellow"></div>
                        <div className="color rightred"></div>
                    </div>
                    <div className="scale">
                        <div className="left">
                            <h3>Danger</h3>
                        </div>
                        <div className="middle">
                            <h3>Warning</h3>
                        </div>
                        <div className="right">
                            <h3>Good</h3>
                        </div>
                        <div className="line"></div>
                        <div className="current"></div>
                        <h3 className="value">54%</h3>
                    </div>
                </div>
                <div className="parameter">
                    <div className="name">Temperature</div>
                    <div className="scale">
                        <div className="left">
                            <h3>Danger</h3>
                        </div>
                        <div className="middle">
                            <h3>Warning</h3>
                        </div>
                        <div className="right">
                            <h3>Good</h3>
                        </div>
                        <div className="line"></div>
                        <div className="current"></div>
                        <h3 className="value">22C</h3>
                    </div>
                </div>
            </div>
            <div className="diagram">

            </div>
        </div>
    )
}
function Map(): JSX.Element {
    return (<>Map</>)
}
function Statistics(): JSX.Element {
    return (<>Statistics</>)
}
function Settings(): JSX.Element {
    return (<>Settings</>)
}