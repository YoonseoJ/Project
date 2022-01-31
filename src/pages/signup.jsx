import React from "react";
import { useRouter } from 'next/router';
import { useState } from 'react'
import { providers, signIn, getSession, csrfToken, useSession } from "next-auth/client";
import Header from '../components/header';
import Footer from "../components/footer";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { isValidEmail, isValidName, isValidPassword } from "../components/validation";

export default function SignUp({ providers, csrfToken }) {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const handleUsername = (event) => {
        setUsername(event.target.value);
        setUsernameError("");
    }
    const handleEmail = (event) => {
        setEmail(event.target.value);
        setEmailError("");
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordError("");
    }
    const handleConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
        setConfirmPasswordError("");
    }

    const signup = async () => {
        if(username == "") {setUsernameError("Please enter username")}
        if(!isValidName(username)) {setUsernameError("Username is invalid")}
        if(email == "") {setEmailError("Please enter email")}
        if(!isValidEmail(email)) {setEmailError("Email is invalid")}
        if(password == "") {setPasswordError("Please enter password")}
        if(!isValidPassword(password)) {setPasswordError("Requirs: minleng=6, maxleng=16, alphabet, number, special charactor")}
        if(confirmPassword == "") {setConfirmPasswordError("Please enter confirm password")}
        if(!isValidPassword(confirmPassword)) {setConfirmPasswordError("Requirs: minleng=6, maxleng=16, alphabet, number, special charactor")}
        if(password != confirmPassword) {setConfirmPasswordError("Confirm password does not match with Password")}
        const image = "https://picsum.photos/300/250";
        if (
            username != "" &&
            isValidName(username) &&
            email != "" &&
            isValidEmail(email) &&
            password != "" && 
            isValidPassword(password) &&
            confirmPassword !="" &&
            isValidPassword(confirmPassword) &&
            password == confirmPassword
        ) {
            try {
                const data = {
                    username,
                    email,
                    image,
                    password
                };
                const body = JSON.stringify(data);
                console.log("pw 1: ", password)
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: body
                };
                const response = await fetch("http://localhost:3000/api/signup", requestOptions);
                if(!response.ok) {
                    alert("User already exist. Please log in.")
                }
            } catch(error) {
                console.log("error**: ", error);
            }
            // signIn()
        }
    }
    return (
        <div>
            <div className="signin_div"> 
                <h1>
                    Sign Up Page
                </h1>
                <div className="signin_forms">
                {Object.values(providers).map((provider) => {
                    return (
                    <div key={provider.name} className="signin_form">
                        {provider.name == 'Credentials' && (
                            <>
                            <form method="post" action="/api/auth/signin/credentials" className="signin_forms">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                <TextField
                                    label="Username"
                                    variant="filled"
                                    onChange={handleUsername}
                                    value={username}
                                    sx={{backgroundColor: "white", borderRadius: "10px", width: "60%", 
                                        margin: "0.5rem auto", border: "4px solid #D0B5A5"}}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <PersonIcon sx={{color: "#9e9e9e"}} />
                                            </InputAdornment>
                                        )
                                    }}
                                    inputProps={{maxLength: 25}}
                                    error={!!usernameError}
                                    helperText={usernameError}
                                />
                                <TextField
                                    type="email"
                                    label="Email"
                                    variant="filled"
                                    onChange={handleEmail}
                                    value={email}
                                    sx={{backgroundColor: "white", borderRadius: "10px", width: "60%", 
                                        margin: "0.5rem auto", border: "4px solid #D0B5A5"}}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <EmailRoundedIcon sx={{color: "#9e9e9e"}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{maxLength: 50}}
                                    error={!!emailError}
                                    helperText={emailError}
                                />
                                <TextField
                                    type="password"
                                    label="Password"
                                    variant="filled"
                                    onChange={handlePassword}
                                    value={password}
                                    sx={{backgroundColor: "white", borderRadius: "10px", width: "60%", 
                                        margin: "0.5rem auto", border: "4px solid #D0B5A5"}}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <VpnKeyRoundedIcon sx={{color: "#9e9e9e"}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{maxLength: 16}}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                />
                                <TextField
                                    type="password"
                                    label="Confirm Password"
                                    variant="filled"
                                    onChange={handleConfirmPassword}
                                    value={confirmPassword}
                                    sx={{backgroundColor: "white", borderRadius: "10px", width: "60%", 
                                        margin: "0.5rem auto", border: "4px solid #D0B5A5"}}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <VpnKeyRoundedIcon sx={{color: "#9e9e9e"}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputProps={{maxLength: 16}}
                                    error={!!confirmPasswordError}
                                    helperText={confirmPasswordError}
                                />
                                <br />
                                <a variant="outline" onClick={signup} className="signin_button">
                                    Sign up
                                </a>
                            </form>
                            </>
                        )}
                        {provider.name != 'Credentials' && (
                            <button variant="outline" onClick={() => signIn(provider.id)} className="signin_button">
                            Sign up with {provider.name}
                            </button>
                        )}
                    </div>
                    );
                })}
                </div>
            </div>
        </div>
    );
}

SignUp.getInitialProps = async (context) => {
    const { req, res } = context;
    const session = await getSession({ req });
    // console.log("signin session", session)

    if (session && res && session.accessToken) {
        // console.log('if worked');
        res.writeHead(302, {
        Location: "/",
        });
        res.end();
        return;
    }
    // console.log('if did not worked');
    return {
        session: await getSession(context),
        providers: await providers(context),
        csrfToken: await csrfToken(context),
    };
};