import { Dispatch, SetStateAction } from "react"
import changeTheme from "../../../Functions/ChangeTheam";

export default function NavBar({ mode, setMode }: { mode: string, setMode: Dispatch<SetStateAction<string>> }): JSX.Element {
    const modesList: string[] = [ "Dashboard", "Map", "Stats", "Settings" ];
    
    return(
        <nav className="NavBar collapsed">
            <div className="logo">
                <img id="logo" onClick={(): void => {window.location.href = "/"}} src="/logo.png" alt="" />
                <img id="menu" onClick={(): void => console.log("menu")} src="/weather/sidebar/menu.png" alt="" />
            </div>
            <div className="modes"> {
                modesList.map((item): JSX.Element => (
                    <div key={item} className={item===mode ? "option active" : "option"} onClick={(): void => setMode(item)} >
                        <img src={`/weather/sidebar/${item.toLocaleLowerCase()}.png`} alt="" />
                        <h3>{item}</h3>
                    </div>
                ))
            } </div>
            <div className="theme" onClick={changeTheme}>  <img src="/weather/sidebar/theme.png" alt="" />  </div>
        </nav>
    )
}