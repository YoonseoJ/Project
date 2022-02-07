import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { useRouter } from "next/router";

export default function UserDessert({dessert}) {
    const router = useRouter();
    return (
        <div key={dessert.id} className="usercards" onClick={() => location.href = `/detailPage/${dessert.id}`}>
            <p className="usercard_title">{dessert.name}</p>
            <CardMedia className="usercard_image"
                component="img"
                image={dessert.image}
                alt="image"
            />
            <div className="usercard_button_div">
                <a href="" className="usercard_button">EDIT</a>
            </div>
        </div>
    )
}