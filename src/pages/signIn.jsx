import React from "react";
import { useState } from "react"
import { providers, signIn, getSession, csrfToken } from "next-auth/client";
import { isValidEmail, isValidPassword } from "../components/validation";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";

export default function SignIn({ providers, csrfToken }) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleEmail = (event) => {
        setEmail(event.target.value);
        setEmailError("");
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
        setPasswordError("");
    }

    const checkuser = async () => {
        const data = {email};
        const body = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        };
        const response = await fetch(`/api/checkuser`, requestOptions);
        const user = await response.json()
        return {response, user};
    }

    const signin = async () => {
        if(email == "") {setEmailError("Please enter email")}
        if(!isValidEmail(email)) {setEmailError("Email is invalid")}
        if(password == "") {setPasswordError("Please enter password")}
        if(!isValidPassword(password)) {setPasswordError("Requirs: minleng=6, maxleng=16, alphabet, number, special charactor")}
        
        if (
            email != "" &&
            isValidEmail(email) &&
            password != "" && 
            isValidPassword(password)
        ) {
            const {response, user} = await checkuser();
            if(!response.ok) {
                alert("User does not exist. Please Sign up first.")
            }
            else if(response.ok && user.password != password) { 
                setPasswordError("Password does not match")
            }
            try {
                if(response.ok && user.password == password) {
                    signIn("credentials", { email: email, password: password })
                }
            } catch(error) {
                console.log("error**: ", error);
            }
        }
    }
    return (
        <div>
            <div className="signin_div"> 
                <h1>
                    Log In
                </h1>
                <div className="signin_forms">
                {Object.values(providers).map((provider) => {
                    return (
                    <div key={provider.name} className="signin_form">
                        {provider.name == "Credentials" && (
                            <>
                            <form method="post" action="/api/auth/signin/credentials" className="signin_forms">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                                <TextField
                                    type="email"
                                    label="Email"
                                    variant="filled"
                                    onChange={handleEmail}
                                    value={email}
                                    sx={{backgroundColor: "white", borderRadius: "10px", width: "60%", 
                                        margin: "0.5rem auto", border: "4px solid #e0d9c8"}}
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
                                        margin: "0.5rem auto", border: "4px solid #e0d9c8"}}
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
                                <br />
                                <a variant="outline" onClick={signin} className="signin_button">
                                    Log In
                                </a>
                            </form>
                            </>
                        )}
                        {provider.name != "Credentials" && (
                            <button variant="outline" onClick={() => signIn(provider.id)} className="signin_button">
                            Sign in with {provider.name}
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

SignIn.getInitialProps = async (context) => {
    const { req, res } = context;
    const session = await getSession({ req });

    if (session && res && session.accessToken) {
        res.writeHead(302, {
        Location: "/",
        });
        res.end();
        return;
    }
    
    return {
        session: await getSession(context),
        providers: await providers(context),
        csrfToken: await csrfToken(context),
    };
};