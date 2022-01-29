import React from "react";
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';

export default function Dessert(props) {
    const router = useRouter();
    const dessert = props.dessert;
    return (
        <div key={dessert.id} className="cards" onClick={() => router.push(`/detailPage/${dessert.id}`)}>
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