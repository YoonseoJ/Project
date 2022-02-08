import React from "react";
import CardMedia from "@mui/material/CardMedia";

export default function RecommendDessert(props) {
    const dessert = props.dessert;
    return (
        <div key={dessert.id} className="recommend" onClick={() => location.href = `/detailPage/${dessert._id}`}>
            <CardMedia className="recommend_image"
                component="img"
                image={dessert.image}
                alt="image"
            />
            <div className="recommend_info">
                <p>{dessert.name}</p>
                <div className="recommend_price_div">
                    $ <p>{dessert.price}</p>
                </div>
            </div>
        </div>
    )
}