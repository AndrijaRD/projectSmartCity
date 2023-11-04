import { api } from "../../../global/const"
import request from "../../../global/request"
import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Login(): JSX.Element {
    const [error, setError] = useState<string>("");
    const redirect = new URLSearchParams(useLocation().search).get('redirect');

    const getValueById = (id: string): string => document.getElementById(id)?.value
    const eyeHandler = (input: any) => input.type==="password" ? input.type="text" : input.type="password"
    const handleLogin = () => {
        const email = getValueById("email")
        const password = getValueById("password")
        
        request(api + "/account/login", "POST", {email: email, password: password})
        .then((res: {found: boolean, token: string, admin: boolean}) => {
            if(!res.found || res.found === undefined) return setError("Netacno unesena Email adresa ili Lozinka.")
            setError("")
            localStorage.setItem("token", res.token)
            if(res.admin) localStorage.setItem("admin", "true")
            location.href = redirect===null ? "/" : redirect
        })
    }

    return(
        <div className="Login">
            <div className="left">
                <img src="/icon.png" alt="" />
                <h1>Dobrodosli nazad!</h1>
            </div>
            <div className="right">
                <h1>Login</h1>
                <h2 className="error">{error}</h2>
                <input type="email" placeholder="Email" id="email" className="input" />
                <div className="password-wrapper">
                    <input type="password" placeholder="Password" id="password" className="input" />
                    <img src="/eye.png" alt="" onClick={e => eyeHandler(e.currentTarget.previousSibling)} />
                </div>
                <h3 className="forgoten-password">Zaboravljena Lozinka?</h3>
                <button onClick={() => handleLogin()} className="button">Login</button>
                <h4 className="signup">Nemate Nalog? <a href="/account/signup">Napravi te ga</a>.</h4>
            </div>
        </div>
    )
}