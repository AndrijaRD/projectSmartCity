import { useParams } from "react-router-dom"
import './css/Account.css'

import AccountDeletion from "./AccountDeletion/AccountDeletion"
import Login from "./Login/Login"
import PasswordReset from "./PasswordReset/PasswordReset"
import Profile from "./Profile/Profile"
import Signup from "./Signup/Signup"

export default function Account(): JSX.Element {
    const mode = useParams().mode;

    return(
        <main className="Account">
            {
                mode==="login"              ? <Login /> :
                mode==="signup"             ? <Signup /> :
                mode==="account-deletion"   ? <AccountDeletion /> :
                mode==="password-reset"     ? <PasswordReset /> :
                mode==="profile"            ? <Profile /> : 
                location.href = "/"
            }
        </main>
    )
}