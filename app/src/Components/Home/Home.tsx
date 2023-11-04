import './css/Home.css'

export default function Home(): JSX.Element {

    const handleThemeChange = () => document.body.classList.contains("lightmode")?document.body.classList.remove("lightmode"):document.body.classList.add("lightmode")

    return (
        <main className="Home">
            <img src="/theme.png" id='theme' onClick={handleThemeChange} alt="" />
            <div className="top">
                <div className="left">
                    <h1>Project Smart City</h1>
                    <h2>Projekat koji ima za cilj da automatizuje svakodnevni zivot i da prosiri svest o zagadjensoti.</h2>
                    <button onClick={() => location.href = "/account/signup"} className='button'>Napravi Nalog</button>
                    <h3>Vec imas nalog? <a href="/account/login">Uloguj se</a>.</h3>
                </div>
                <img src="/hovering-city.svg" alt="" />
            </div>
            <div className="bottom">
                <h1>Nasi Programi:</h1>
                <div className="app-wrapper">
                    <div className="app" onClick={() => location.href="/air"} style={{background: "#06D6A0"}}>
                        <img src="/wind(4).png" alt="" />
                        <h1>Kvalitet Vazduha</h1>
                    </div>
                    <div className="app" style={{background: "#8D86C9"}}>
                        <img src="/quality.png" alt="" />
                        <h1>Kvalitet Vode</h1>
                    </div>
                    <div className="app" style={{background: "#ff1178"}}>
                        <img src="/traffic.png" alt="" />
                        <h1>Saobracaj</h1>
                    </div>
                    <div className="app" style={{background: "#ff1178"}}>
                        <img src="/traffic.png" alt="" />
                        <h1>Toplana</h1>
                    </div>
                    <div className="app" style={{background: "#ff1178"}}>
                        <img src="/traffic.png" alt="" />
                        <h1>Kanalizacija</h1>
                    </div>
                </div>
            </div>
        </main>
    )
}