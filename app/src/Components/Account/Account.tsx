import { useState } from 'react'
import { api } from '../../assets/const'
import './css/Account.css'
import { useParams } from 'react-router-dom'

let passwordResetStage = 1

async function req(url: string, mode: "POST" | "GET" | "PUT" | "DELETE" = "GET", data = {}) {
    let config: {[items: string]: string | {[items: string]: string}} = {
        method: mode,
        mode: "cors",
        cache: "no-cache",
        redirect: "follow"
        
    }
    if(mode!=="GET") {
        config["headers"] = {"Content-Type": "application/json"}
        config["body"] = JSON.stringify(data)
    }
    console.log(config)
    
    const response = await fetch(url, config);
    return response.json();
}

export default function Account(): JSX.Element {
    const { mode } = useParams();
    const [error, setError] = useState<string>("")

    const handleLogin = async (e: HTMLButtonElement) => {
        const email = e.parentElement?.querySelector("input#email")?.value
        const password = e.parentElement?.querySelector("input#password")?.value
        req(api+"/account/login", "POST", {email: email, password: password}).then((data: {matching: boolean, token: ""}) => {
            if(data.matching){
                localStorage.setItem("token", data.token)
                localStorage.setItem("freshLogin", "true")
                window.location.href = "/#apps"
            }
            else setError("Incorrect credentials.")
        })
    }
    const handleSignup = () => {}

    const LoginJSX = ({active = false}: {active: boolean}) => {
        if(!active) return
        return(
            <div className="login">
                    <h1>Welcome Back!</h1>
                    <input type="text" placeholder='Email' id='email' />
                    <input type="password" placeholder='Password' id='password' />
                    <div className="options">
                        <a href="/account/password-reset">Forgot password?</a>
                        <a href="/account/signup">Signup</a>
                    </div>
                    <button type='submit' onClick={e => handleLogin(e.currentTarget)}>Log In</button>
            </div>
        )
    }
    const SignupJSX = ({active = false}: {active: boolean}) => {
        if(!active) return
        return (
            <form className="signup" onSubmit={handleSignup}>
                <h1>Create new Account!</h1>
                <input type="text" placeholder='Name' />
                <input type="text" placeholder='Email' />
                <input type="date" placeholder='Birthdate' />
                <input type="password" placeholder='Password' />
                <div className="options">
                        <a href="/account/password-reset"></a>
                        <a href="/account/login">Login</a>
                    </div>
                <button type='submit'>Sign Up</button>
            </form>
        )
    }

    const handlePassowrdReset = (e: HTMLButtonElement) => {
        if(passwordResetStage===1){
            const email = e.parentElement?.querySelector("input")?.value
        } else if(passwordResetStage===2){
            const code = e.parentElement?.querySelector("input")?.value
        } else{
            const newPassword1 = e.parentElement?.querySelector("input#newPassword1")?.value;
            const newPassword2 = e.parentElement?.querySelector("input#newPassword2")?.value;
            if(newPassword1===newPassword2){

            } else{

            }
        }
    }

    const PasswordResetJSX = ({active = false}: {active: boolean}) => {
        if(!active) return
        return (
            <div className="pr-wrapper">
                <h1>Reset Password</h1>
                <div className={"stepone " + (passwordResetStage===1?"active":"")} >
                    <h3>We will send you a confirmation code on the email.</h3>
                    <input type="email" placeholder='Email' />
                    <button onClick={(e) => handlePassowrdReset(e.currentTarget)} >Send Verification Code</button>
                </div>
                <div className="steptwo">
                <h3>We sent you a confirmation code on the email.</h3>
                    <input type="text" placeholder='Code' />
                    <button>Continue</button>
                </div>
                <div className="stepthree">
                    <h3>You can now enter your new password.</h3>
                    <input type="text" placeholder='New Password' id='newPassword1' />
                    <input type="text" placeholder='Confirm New Password' id='newPassword2' />
                    <button>Save Changes</button>
                </div>
            </div>
        )
    }

    return(
        <main className="Account">
            <div className="landscape">
                <LoginJSX active={mode?.includes("login")} />
                <SignupJSX active={mode?.includes("signup")} />
                <PasswordResetJSX active={mode?.includes("password-reset")} />
            </div>
        </main>
    )
}