import React from "react";
import CardMedia from '@mui/material/CardMedia';
import { useRouter } from 'next/router';

export default function RecommendScarf(props) {
    const router = useRouter();
    const scarf = props.scarf;
    console.log("** ", props)
    return (
        <div key={scarf.id} className="recommend" onClick={() => router.push(`/detailPage/${scarf._id}`)}>
            <CardMedia className="recommend_image"
                component="img"
                image={scarf.image}
                alt="image"
            />
            <div className="recommend_info">
                <p>{scarf.name}</p>
                <div className="recommend_price_div">
                    <p>{scarf.price}</p>
                    <img src="/skull-icon.png" alt="" />
                </div>
            </div>
        </div>
    )
}