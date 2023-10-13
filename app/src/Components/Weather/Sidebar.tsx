import { Dispatch, SetStateAction } from "react"

type SidebarParamsType = { 
    mode: string, 
    setMode: Dispatch<SetStateAction<string>> 
}

export default function Sidebar({ mode, setMode }: SidebarParamsType): JSX.Element {
    const modesList: string[] = [ "Dashboard", "Map", "Cities", "Settings" ];
    const changeTheme = (): void => {
        const weather = document.querySelector("main.Weather");
        if(weather) weather.classList.contains("lightmode") ? weather.classList.remove("lightmode") : weather.classList.add("lightmode")
    }

    return(
        <nav className="sidebar">
            <div className="logo">
                <img onClick={(): void => {window.location.href = "/"}} src="/logo.png" alt="" />
            </div>
            <div className="modes">
            {
                modesList.map((item): JSX.Element => (
                    <div key={item} className={item===mode ? "option active" : "option"} onClick={(): void => setMode(item)} >
                        <img src={`/weather/sidebar/${item.toLocaleLowerCase()}.png`} alt="" />
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