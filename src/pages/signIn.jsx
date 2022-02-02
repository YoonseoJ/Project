import React from "react";
import { useState } from 'react'
import { providers, signIn, getSession, csrfToken, useSession } from "next-auth/client";
import Header from '../components/header';
import Footer from "../components/footer";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import PersonIcon from '@mui/icons-material/Person';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { isValidEmail, isValidName, isValidPassword, hashPassword } from "../components/validation";
import { compare, hash, genSalt } from 'bcryptjs';
import { passwordHash } from 'password-hash';

export default function SignIn({ providers, csrfToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

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

    const checkuser = async () => {
        const data = {email};
        const body = JSON.stringify(data);

        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            },
            // body: body
        };
        const response = await fetch(`${process.env.PUBLIC_URL}/api/checkuser`, requestOptions);
        const test = await response.json()
        console.log("test! ", test);
        for(let i = 0; i < test.length; i++) {
            if(test[i].email == email) {
                return test[i];
            }else {
                return null;
            }
        }
        console.log(test[0].email);
        // const found = test.find(element => element.includes(email));
        // console.log("found: ", found)
        // return test;
    }

    const signin = async () => {
        if(username == "") {setUsernameError("Please enter username")}
        if(!isValidName(username)) {setUsernameError("Username is invalid")}
        if(email == "") {setEmailError("Please enter email")}
        if(!isValidEmail(email)) {setEmailError("Email is invalid")}
        if(password == "") {setPasswordError("Please enter password")}
        if(!isValidPassword(password)) {setPasswordError("Requirs: minleng=6, maxleng=16, alphabet, number, special charactor")}
        
        if (
            username != "" &&
            isValidName(username) &&
            email != "" &&
            isValidEmail(email) &&
            password != "" && 
            isValidPassword(password)
        ) {
            const response = await checkuser();
            console.log("user no--", await response.name)
            if(response == null) {
                // console.log("user no--", response)
                alert("User does not exist. Please Sign up first.")
            }
            if(response.name != username) {
                setUsernameError("Username does not match")
            }
            if(response.password != password) { // passwordHash.generate(password)
                setPasswordError("Password does not match")
            }
            try {
                if(response != null && response.name == username && response.password == password) {
                    // password = await hashPassword(password)
                    signIn("credentials", { username: username, email: email, password: password })
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
                                <br />
                                <a variant="outline" onClick={signin} className="signin_button">
                                    Log In
                                </a>
                            </form>
                            </>
                        )}
                        {provider.name != 'Credentials' && (
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