import React from "react";
import { useState } from 'react'
import Header from "../components/header";
import Footer from "../components/footer";
import Homepage from "../components/hompage";
import { getScarves } from "../backend/database";
import Scarf from "../components/scarf";

export default function Home(props) {
    const [search, setSearch] = useState("");
    console.log("test: ", props.scarves)

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }
    return (
        <div>
            <Header/>
            <Homepage/>
            <div className="searchbar">
                <input type="text" onChange={handleSearch} placeholder="Search ..." className="search"/>
            </div>

            <div className="display_bananas">
                <p className="banana_type">Show Your Cursed Knitted Scarf</p>
                <div className="banana_div">
                {
                    props.scarves.filter((scarves) => {
                        if (search == "") {
                            return scarves
                        }
                        else if (
                            scarves.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            scarves.witch.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            scarves.material.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            scarves.length.toString().includes(search.toLocaleLowerCase()) ||
                            scarves.width.toString().includes(search.toLocaleLowerCase()) ||
                            scarves.weight.toString().includes(search.toLocaleLowerCase()) ||
                            scarves.price.toString().includes(search.toLocaleLowerCase()) ||
                            scarves.location.toLowerCase().includes(search.toLocaleLowerCase()) ||
                            scarves.description.toLowerCase().includes(search.toLocaleLowerCase())) {
                            return scarves
                        }
                        
                    }).map(
                        (scarf) => {
                            return (
                                <Scarf scarf={scarf}/>
                            )
                        }
                    )
                }
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export async function getServerSideProps() {
    const data = await getScarves();
    console.log('data', data);
    const scarves = data.reverse().map(
        (scarf) => {
            return {
                id: scarf.id.toString(),
                name: scarf.name,
                witch: scarf.witch,
                material: scarf.material,
                length: scarf.length,
                width: scarf.width,
                weight: scarf.weight,
                price: scarf.price,
                location: scarf.location,
                description: scarf.description,
                image: scarf.image,
            };
        }
    )
    // console.log('cards', cards)

    return {
        props : {
            scarves
        }
    }
}