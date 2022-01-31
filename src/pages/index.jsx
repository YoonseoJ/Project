import React from "react";
import { useState } from 'react'
import Homepage from "../components/hompage";
import { getDesserts } from "../backend/database";
import Dessert from "../components/dessert";

export default function Home({desserts}) {
    const [search, setSearch] = useState("");
    // console.log("test: ", props.desserts)

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    return (
        <div>
            <Homepage/>
            <div className="searchbar">
                <input type="text" onChange={handleSearch} placeholder="Search ..." className="search"/>
            </div>

            <div className="display_desserts">
                <p className="dessert_type">Desserts</p>
                <div className="dessert_div">
                {
                    desserts.filter((desserts) => {
                        if (search == "") {
                            return desserts
                        }
                        else if (
                            desserts.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            desserts.amount.toString().includes(search.toLocaleLowerCase()) ||
                            desserts.price.toString().includes(search.toLocaleLowerCase()) ||
                            desserts.ingredients.toLowerCase().includes(search.toLocaleLowerCase())) {
                            return desserts
                        }
                    }).map(
                        (dessert) => {
                            return (
                                <Dessert dessert={dessert}/>
                            )
                        }
                    )
                }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await getDesserts();
    const desserts = data.reverse().map(
        (dessert) => {
            return {
                id: dessert.id.toString(),
                name: dessert.name,
                amount: dessert.amount,
                price: dessert.price,
                ingredients: dessert.ingredients,
                image: dessert.image,
            };
        }
    )

    return {
        props: {
            desserts
        }
    }
}