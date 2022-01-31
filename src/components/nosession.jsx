import { signin } from "next-auth/client"

export default function NoSession() {
    return (
        <div className="nossession_div">
            <p className="nosession_1">Not logged in</p>
            <p className="nosession_2">Please LogIn first</p>
            <button onClick={() => signin()} className="nosession_button">LOGIN</button>
        </div>
    )
}