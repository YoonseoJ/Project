import React from "react";
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';

export default function Scarf(props) {
    const router = useRouter();
    const scarf = props.scarf;
    return (
        <div key={scarf.id} className="cards" onClick={() => router.push(`/detailPage/${scarf.id}`)}>
            <p className="card_title">{scarf.name}</p>
            <img src="/skull-icon-small.png" alt="" className="card_skull_icon"/>
            <CardMedia className="card_image"
                component="img"
                image={scarf.image}
                alt="image"
            />
            <div className="card_design">
                <img src="/icon.PNG" alt="" />
            </div>
            
            <div className="card_info">
                <p>Made by {scarf.name}</p>
            </div>
            <a href="" className="card_button">DETAILS</a>
        </div>
    )
}