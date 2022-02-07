import { useRouter } from "next/router";
import React from "react";
import { useState } from "react"
import { useSession } from "next-auth/client";
import { isValidPositiveFractionNumber } from "../components/validation";
import NoSession from "../components/nosession";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddAPhotoRoundedIcon from "@mui/icons-material/AddAPhotoRounded";
import CardMedia from "@mui/material/CardMedia";

export default function Upload() {
    const router = useRouter();
    const [session, loadingSession] = useSession();

    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [image, setImage] = useState("");

    const [nameError, setNameError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [imageError, setImageError] = useState("");

    const handleName = (event) => { setName(event.target.value); setNameError("");}
    const handleAmount = (event) => { setAmount(event.target.value); setAmountError("");}
    const handleIngredients = (event) => { setIngredients(event.target.value);}
    const handlePrice = (event) => { setPrice(event.target.value); setPriceError("");}

    const handleSetImage = async (event) => {
        await getImageToBase64(event.target.files[0], (result) => {
            setImage(result);
            setImageError("");
        });
    };

    const getImageToBase64 = (file, cb) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
    };

    const validateInputAndUpload = () => {
        if(name == "") {setNameError("Please enter dessert name")}
        if(name.length > 100) {setNameError("Name is invalid (max length 100)")}
        if(amount == "" || parseInt(amount) <= 0) {setAmountError("Please enter length")}
        if(!isValidPositiveFractionNumber(parseInt(amount)) || parseInt(amount) >= 100) {setAmountError("Amount is invalid (number between 1 to 100)")}
        if(price == "" || parseInt(price) <= 0) {setPriceError("Please enter price")}
        if(!isValidPositiveFractionNumber(parseInt(price)) || parseInt(price) >= 1000) {setPriceError("Price is invalid (number between 1 to 1000)")}
        if(image == "") {setImageError("Please select image")}

        if (
            name != "" &&
            name.length < 100 &&
            amount != "" &&
            parseInt(amount) > 0 &&
            parseInt(amount) < 100 &&
            isValidPositiveFractionNumber(parseInt(amount)) &&
            price != "" &&
            parseInt(price) > 0 &&
            isValidPositiveFractionNumber(parseInt(price)) &&
            image != ""
        ) {
            handleUpload()
        }
    }

    const handleUpload = async () => {
        const theprice = parseInt(price)
        console.log("session: ", session.id)
        const data = {
            name,
            amount,
            price,
            ingredients,
            image,
            userID: session.id
        }
        const body = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        };

        try {
            const response = await fetch(`/api/dessert`, requestOptions);
        } catch(error) {
            console.log("error**: ", error);
        }
        setName("");
        setAmount("");
        setIngredients("");
        setPrice("");
        setImage("");
        router.push("/");
    }

    if (loadingSession) {
        return <p>Loading...</p>;
    }
    return (
        <div className="upload_div">
            {!session && (
                <>
                <NoSession/>
                </>
            )}
            {session && (
                <>
                <p className="upload_title">Upload Dessert</p>
                <div className="upload_form">
                    <p className="upload_description">Dessert Information</p>
                    <TextField
                        label="Name of dessert"
                        variant="filled"
                        onChange={handleName}
                        value={name}
                        sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                        inputProps={{maxLength: 100}}
                        error={!!nameError}
                        helperText={nameError}
                    />
                    <div className="upload_input_div">
                        <TextField
                            label="Amount"
                            variant="filled"
                            type="number"
                            onChange={handleAmount}
                            value={amount}
                            sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                            InputProps={{
                                inputProps: { min: 0, max: 100 }
                            }}
                            error={!!amountError}
                            helperText={amountError}
                        />
                        <div className="upload_input_div_space"/>
                        <TextField
                            label="Price"
                            variant="filled"
                            type="number"
                            onChange={handlePrice}
                            value={price}
                            sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">CAD
                                    </InputAdornment>
                                ),
                                inputProps: { min: 0, max: 1000 }
                            }}
                            error={!!priceError}
                            helperText={priceError}
                        />
                    </div>
                    
                    <TextField
                        multiline
                        rows={4}
                        label="Ingredients"
                        variant="filled"
                        onChange={handleIngredients}
                        value={ingredients}
                        sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                        inputProps={{maxLength: 1000}}
                    />
                    <div className="upload_image_div_div">
                        <div className="upload_image_div">
                            <label className="upload_image">
                                {image == "" && (
                                    <AddAPhotoRoundedIcon sx={{fontSize: "5rem", color: "#9e9e9e", margin: "4.5rem 7.5rem"}}/>
                                )}
                                {image != "" && (
                                    <div className="input_image_div">
                                        <CardMedia className="selected_image"
                                            component="img"
                                            image={image}
                                            alt="missing pet/person image"
                                            sx={{width: "20rem", height: "20rem", borderRadius: "10px"}}
                                        />
                                    </div>
                                )}
                                <input type="file" className="upload_input" onChange={handleSetImage}/>
                            </label>
                        </div>
                        <div className="upload_image_div">
                            <label className="upload_image">
                                {image == "" && (
                                    <AddRoundedIcon sx={{fontSize: "5rem", color: "#9e9e9e", margin: "4.5rem 7.5rem"}}/>
                                )}
                                {image != "" && (
                                    <div className="input_image_div">
                                        <CardMedia className="selected_image"
                                            component="img"
                                            image={image}
                                            alt="missing pet/person image"
                                            sx={{width: "20rem", height: "20rem", borderRadius: "10px"}}
                                        />
                                    </div>
                                )}
                                <input type="file" className="upload_input" onChange={handleSetImage}/>
                            </label>
                        </div>
                    </div>
                    <p className="newpost_image_error">{imageError}</p>
                </div>
                <div className="upload_button_div">
                    <a onClick={validateInputAndUpload} className="upload_button">Upload</a>
                </div>
                </>
            )}
        </div>
    )
}