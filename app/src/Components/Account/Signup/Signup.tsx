import { api } from "../../../global/const"
import request from "../../../global/request"
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function Signup(): JSX.Element {
    const [error, setError] = useState<string>("");
    const redirect = new URLSearchParams(useLocation().search).get('redirect');
    const today = new Date();

    const getValueById = (id: string): string => document.getElementById(id)?.value
    const eyeHandler = (input: any) => input.type==="password" ? input.type="text" : input.type="password"
    const handleSignup = () => {
        const name: string = getValueById("name")
        const email: string = getValueById("email")
        const year: number = parseInt(getValueById("year"));
        const month: number = parseInt(getValueById("month"));
        const day: number = parseInt(getValueById("day"));
        const password: string = getValueById("password");
        
        if(name.split(" ").length < 2) return setError("Nepotpuno ime!");
        if(!(email.includes("@") && email.includes(".")) || email.includes(";") || email.includes(":")) return setError("Nepravilna email adresa!")
        if(!(year || month || day)) return setError("Molim vas upisite validan datum rodjena.");
        if(year >= today.getFullYear()-8) return setError("Da bi ste napravili nalog morate biti stariji od 8 godina!")
        if(password.length < 8 || password.length > 128) return setError("Lozinka mora da bude izmedju 8 i 128 karaktera dugacka!")
        setError("")

        request(api + "/account/signup", "POST", {
            name: name,
            email: email,
            birthdate: `${year}-${month}-${day}`,
            password: password
        }).then((data: {succesfull: boolean, token: string}): any => {
            if(!data.succesfull) return setError("Problemi sa serverom molim vas pokusajte kasnije!")
            localStorage.setItem("token", data.token)
            location.href = redirect===null ? "/" : redirect
        })
    }

    return(
        <div className="Signup">
            <div className="left">
                <img src="/icon.png" alt="" />
                <h1>Project Smart City - Signup!</h1>
            </div>
            <div className="right">
                <h1>Signup</h1>
                <h2 className="error">{error}</h2>
                <h4>Puno ime:</h4>
                <input type="text" placeholder="Ime i Prezime" id="name" className="input" />
                <h4>Email:</h4>
                <input type="email" placeholder="user@gmail.com" id="email" className="input" />
                <h4>Datum rodjenja:</h4>
                <div className="birthdate">
                    <input type="number" max={31} min={1} id="day" placeholder="dan" className="input" />
                    <input type="number" max={12} min={1} id="month" placeholder="mesec" className="input" />
                    <input type="number" max={today.getFullYear()} min={today.getFullYear()-100} id="year" placeholder="godina" className="input" />
                </div>
                <h4>Lozinka:</h4>
                <div className="password-wrapper">
                    <input type="password" className="input" placeholder="Password" id="password" />
                    <img src="/eye.png" alt="" onClick={e => eyeHandler(e.currentTarget.previousSibling)} />
                </div>
                <button className="button" onClick={() => handleSignup()}>Signup</button>
                <h4 className="login">Vec imate nalog? <a href="/account/login">Uloguj te se</a>.</h4>
            </div>
        </div>
    )
}