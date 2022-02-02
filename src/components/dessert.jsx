import React from "react";
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';

export default function Dessert({dessert}) {
    const router = useRouter();
    return (
        <div key={dessert.id} className="cards" onClick={() => location.href = `/detailPage/${dessert.id}`}>
            <p className="card_title">{dessert.name}</p>
            <CardMedia className="card_image"
                component="img"
                image={dessert.image}
                alt="image"
            />
            <div className="card_button_div">
                <a href="" className="card_button">DETAILS</a>
            </div>
        </div>
    )
}