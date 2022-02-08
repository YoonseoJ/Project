import React from "react";
import CardMedia from "@mui/material/CardMedia";
import { useSession } from "next-auth/client";

export default function CartDessert({dessert}) {
    const [session, loadingSession] = useSession();

    const handleRemove = async () => {
        const data = {
            dessertID: dessert.id,
            userID: session.id
        }
        const body = JSON.stringify(data);

        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        };

        try {
            const response = await fetch(`/api/usercart`, requestOptions);
            console.log("response: ", response)
            if(!response.ok) {
                alert(`not sussessful`)
            }
            if(response.ok) {
                alert(`Successfully removed from cart`)
            }
        } catch(error) {
            console.log("error**: ", error);
        }
    }

    return (
        <div key={dessert.id} className="usercards" onClick={() => location.href = `/detailPage/${dessert.id}`}>
            <p className="usercard_title">{dessert.name}</p>
            <CardMedia className="usercard_image"
                component="img"
                image={dessert.image}
                alt="image"
            />
            <div className="usercard_button_div">
                <a href="" className="cartcard_button" onClick={handleRemove}>REMOVE</a>
            </div>
        </div>
    )
}