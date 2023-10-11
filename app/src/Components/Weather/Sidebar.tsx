export default function Sidebar({ mode, setMode }) {
    const modesList = ["Dashboard", "Map", "Cities", "Settings"]

    const changeTheme = () => {
        const weather = document.querySelector("main.Weather");
        if(weather.classList.contains("lightmode")){
            return weather.classList.remove("lightmode");
        } weather.classList.add("lightmode")
    }

    return(
        <nav className="sidebar">
            <div className="logo">
                <img src="/assets/logo.png" alt="" />
            </div>
            <div className="modes">
            {
                modesList.map(item => (
                    <div key={item} className={item===mode ? "option active" : "option"} onClick={e => setMode(item)} >
                        <img src={`/assets/sidebar/${item.toLocaleLowerCase()}.png`} alt="" />
                        <h3>{item}</h3>
                    </div>
                ))
            }
            </div>
            <div className="theme" onClick={changeTheme}>
                <img src="/assets/sidebar/theme.png" alt="" />
            </div>
        </nav>
    )
}