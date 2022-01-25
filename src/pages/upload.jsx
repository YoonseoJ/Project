import { useRouter } from 'next/router';
import React from "react";
import { useState } from 'react'
import Header from '../components/header';
import Footer from '../components/footer';
import { useSession } from 'next-auth/client';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import NavigationRoundedIcon from '@mui/icons-material/NavigationRounded';
import CardMedia from '@mui/material/CardMedia';
import Geocode from "react-geocode";
import { isValidName, isValidPositiveFractionNumber } from "../components/validation";

export default function Upload() {
    const router = useRouter();
    const [session] = useSession();

    const [name, setName] = useState("");
    const [witch, setWitch] = useState("");
    const [material, setMaterial] = useState("");
    const [length, setLength] = useState("");
    const [width, setWidth] = useState("");
    const [weight, setWeight] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");

    const [nameError, setNameError] = useState("");
    const [witchError, setWitchError] = useState("");
    const [materialError, setMaterialError] = useState("");
    const [lengthError, setLengthError] = useState("");
    const [widthError, setWidthError] = useState("");
    const [weightError, setWeightError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [locationError, setLocationError] = useState("");
    const [imageError, setImageError] = useState("");

    const handleName = (event) => { setName(event.target.value); setNameError("");}
    const handleWitch = (event) => { setWitch(event.target.value); setWitchError("");}
    const handleMaterial = (event) => { setMaterial(event.target.value); setMaterialError("");}
    const handleLength = (event) => { setLength(event.target.value); setLengthError("");}
    const handleWidth = (event) => { setWidth(event.target.value); setWidthError("");}
    const handleWeight = (event) => { setWeight(event.target.value); setWeightError("");}
    const handleDescription = (event) => { setDescription(event.target.value);}
    const handleLocation = (event) => { setLocation(event.target.value); setLocationError("");}
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
        if(name == "") {setNameError("Please enter scarf name")}
        if(!isValidName(name)) {setNameError("Scarf name is invalid")}
        if(witch == "") {setWitchError("Please enter witch name")}
        if(!isValidName(witch)) {setWitchError("Witch name is invalid")}
        if(material == "") {setMaterialError("Please enter material")}
        if(material.length > 100) {setMaterialError("Material is invalid. maxlength: 100")}
        if(length == "" || parseInt(length) <= 0) {setLengthError("Please enter length")}
        if(!isValidPositiveFractionNumber(parseInt(length)) || parseInt(length) >= 100) {setLengthError("length is invalid (number between 1 to 100)")}
        if(width == "" || parseInt(width) <= 0) {setWidthError("Please enter width")}
        if(!isValidPositiveFractionNumber(parseInt(width)) || parseInt(width) >= 100) {setWidthError("width is invalid (number between 1 to 100)")}
        if(weight == "" || parseInt(weight) <= 0) {setWeightError("Please enter weight")}
        if(!isValidPositiveFractionNumber(parseInt(weight)) || parseInt(weight) >= 100) {setWeightError("weight is invalid (number between 1 to 100)")}
        if(location == "") {setLocationError("Please enter location")}
        if(price == "" || parseInt(price) <= 0) {setPriceError("Please enter price")}
        if(!isValidPositiveFractionNumber(parseInt(price)) || parseInt(price) >= 1000) {setPriceError("Price is invalid (number between 1 to 1000)")}
        if(image == "") {setImageError("Please select image")}

        if (
            name != "" &&
            isValidName(name) &&
            witch != "" &&
            isValidName(witch) &&
            material != "" &&
            material.length <= 100 &&
            length != "" &&
            parseInt(length) > 0 &&
            parseInt(length) < 100 &&
            isValidPositiveFractionNumber(parseInt(length)) &&
            width != "" &&
            parseInt(width) > 0 &&
            parseInt(width) < 100 &&
            isValidPositiveFractionNumber(parseInt(width)) &&
            weight != "" &&
            parseInt(weight) > 0 &&
            parseInt(weight) < 100 &&
            isValidPositiveFractionNumber(parseInt(weight)) &&
            location != "" &&
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
            witch,
            material,
            length,
            width,
            weight,
            price,
            location,
            description,
            image,
            userID: session.id
        }

        const body = JSON.stringify(data);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        };

        try {
            const response = await fetch("http://localhost:3000/api/scarf", requestOptions);
        } catch(error) {
            console.log("error**: ", error);
            // alert(error)
        }
        setName("");
        setWitch("");
        setMaterial("");
        setLength("");
        setWidth("");
        setWeight("");
        setDescription("");
        setLocation("");
        setPrice("");
        setImage("");
        router.push("/")
    }

    // resources:
    // https://www.npmjs.com/package/react-geocode
    // https://www.pluralsight.com/guides/how-to-use-geolocation-call-in-reactjs
    const handleCurrentLocation = async () => {
        Geocode.setApiKey("AIzaSyDmVj3rGPMptqH5gvHYgzCzrmRNkBUKcR4");
        Geocode.setLanguage("en");

        navigator.geolocation.getCurrentPosition(function(position) {
            // console.log("Latitude is :", position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                (response) => {
                  const address = response.results[0].formatted_address;
                  setLocation(address)
                  // console.log("test addresss:: ", address);
                },
                (error) => {
                  console.error(error);
                }
              );
        });
    }

    return (
        <div>
            <Header/>
            <p className="upload_title">Upload My scarf</p>
            <div className="upload_form">
                <p className="upload_description">scarf Information</p>
                <TextField
                    label="Name of your scarf"
                    variant="filled"
                    onChange={handleName}
                    value={name}
                    sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                    inputProps={{maxLength: 50}}
                    error={!!nameError}
                    helperText={nameError}
                />
                <TextField
                    label="Name of witch"
                    variant="filled"
                    onChange={handleWitch}
                    value={witch}
                    sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                    inputProps={{maxLength: 50}}
                    error={!!witchError}
                    helperText={witchError}
                />
                <TextField
                    label="Material"
                    variant="filled"
                    onChange={handleMaterial}
                    value={material}
                    sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                    inputProps={{maxLength: 100}}
                    error={!!materialError}
                    helperText={materialError}
                />
                <div className="upload_input_div">
                    <TextField
                        label="Length"
                        variant="filled"
                        type="number"
                        onChange={handleLength}
                        value={length}
                        sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">inches
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, max: 100 }
                        }}
                        error={!!lengthError}
                        helperText={lengthError}
                    />
                    <div className="upload_input_div_space"/>
                    <TextField
                        label="Width"
                        variant="filled"
                        type="number"
                        onChange={handleWidth}
                        value={width}
                        sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">inches
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, max: 450 }
                        }}
                        error={!!widthError}
                        helperText={widthError}
                    />
                </div>
                <div className="upload_input_div">
                    <TextField
                        label="Weight"
                        variant="filled"
                        type="number"
                        onChange={handleWeight}
                        value={weight}
                        sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">g
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, max: 450 }
                        }}
                        error={!!weightError}
                        helperText={weightError}
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
                                <InputAdornment position="start">curses
                                </InputAdornment>
                            ),
                            inputProps: { min: 0, max: 1000 }
                        }}
                        error={!!priceError}
                        helperText={priceError}
                    />
                </div>
                <TextField
                    label="Location"
                    variant="filled"
                    onChange={handleLocation}
                    value={location}
                    sx={{backgroundColor: "white", borderRadius: "5px", width: "100%", margin: "0.5rem auto"}}
                    inputProps={{maxLength: 100}}
                    error={!!locationError}
                    helperText={locationError}
                />
                <div className="upload_location">
                    <NavigationRoundedIcon fontSize="small"/>
                    <a onClick={handleCurrentLocation}>use my location</a>
                </div>
                
                <TextField
                    multiline
                    rows={4}
                    label="Description"
                    variant="filled"
                    onChange={handleDescription}
                    value={description}
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
                                        sx={{width: "20rem", height: "14rem", borderRadius: "10px"}}
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
                                        sx={{width: "20rem", height: "14rem", borderRadius: "10px"}}
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
            <Footer/>
        </div>
    )
}