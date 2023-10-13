import './style/Home.css'

type AppsType = {
    name: string,
    icon: string,
    endpoint: string
}

export default function Home(): JSX.Element {
    const apps: AppsType[] = [
        {
            name: "Kvalitet Vazduha",
            icon: "/home/app-icons/air.png",
            endpoint: "/weather"
        }, {
            name: "Auto-Putevi",
            icon: "/home/app-icons/traffic.png",
            endpoint: "/traffic"
        }, {
            name: "Kvalitet Vode",
            icon: "/home/app-icons/water.png",
            endpoint: "/water"
        }
    ];
    const aboutUsTextBoxs: {text: string, image: string}[] = [
        {
            text: "Mi smo prva organizacija koja koristi modernu tehnologiju i povezuje je sa nasim svakodnevnim uredjima: Telefonima, Kompluterima, Tabletima...",
            image: "/assets/"
        },
        {
            text: "Ovaj projekat ima za ulogu da prosiri svest o kvalitetu nase zivotne sredine kao sto je kvalitet vazduha, vode, zemljista i nacini na koje mozemo da ih poboljsamo.",
            image: "/assets/"
        }
    ]

    return (
        <main className="Home">
            <div className="top">
                <div className="rightSide">
                    <img src="/home/images/train.png" alt="" />
                </div>
                <div className="texts">
                    <h1 className="title">Project Smart City</h1>
                    <h3 className="subtext">Prvi moderni gratski sistem kvaliteta sredine!</h3>
                    <button className="login" onClick={(): void => {window.location.href="#apps"}}>Isprobajte</button>
                </div>
                
            </div>
            <div className="middle" id="apps">
                <h1>Nase Aplikacije:</h1>
                <div className="app-list">
                    {
                        apps.map(app => (
                            <div key={app.name} className="app" onClick={(): void => {window.location.href = app.endpoint}}>
                                <img src={app.icon} alt="" />
                                <h3>{app.name}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="bottom">
                <h1>O nama: </h1>
                <div className="texts">
                    {
                        aboutUsTextBoxs.map((textbox): JSX.Element => (
                            <div className="textbox" key={textbox.text}>
                                <h3>{textbox.text}</h3>
                            </div>
                        ))
                    }
                </div>
            </div>
        </main>
    )
}