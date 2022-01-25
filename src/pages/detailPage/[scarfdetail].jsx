import Header from '../../components/header';
import Footer from '../../components/footer';
import CardMedia from '@mui/material/CardMedia';
import RecommendScarf from '../../components/recommendscarf';
import { useState } from 'react'

export default function DetailPage({props}) {
    //console.log("props--", props.data)
    //console.log("props22--", props.scarves)
    const details = `Created by ${props.data.witch}. Material: ${props.data.material}. Length: ${props.data.length}.
                        Width: ${props.data.width}. Weight: ${props.data.weight}. Location: ${props.data.location}`;

    const [description, setDescription] = useState(details);

    const handleCurseUpdate = async () => {
        
    }

    

    return (
        <>
        <Header/>
        <div className="detail_card_div">
            
            <div className="detail_card_info">
                <CardMedia className="detail_card_image"
                    component="img"
                    image={props.data.image}
                    alt="image"
                />
                <div className="detail_card_info_elements">
                    <p className="detail_card_title">{props.data.name}</p>
                    <p className="detail_card_desc">{description}</p>

                    <p className="detail_card_buy_price">Total curses: {props.data.price}</p>
                        
                    <div className="detail_card_buy">
                        <button className="detail_card_buy_button" onClick={() => alert(`removed one curse`)}>
                            Remove curse <img src="/smile1.png" alt="" className="button_icon"/></button>
                        <button className="detail_card_buy_button detail_card_buy_button2" onClick={() => alert(`added one curse`)}>
                            Add curse <img src="/smile1.png" alt="" className="button_icon"/></button>
                    </div>

                    <div className="detail_card_buy2">
                        <button className="detail_card_buy_button_dscrt" onClick={() => setDescription(details)}>
                            DETAILS</button>
                        <button className="detail_card_buy_button_dscrt" onClick={() => setDescription(props.data.description)}>
                            STORY</button>
                    </div>
                </div>
            </div>
            <p className="detail_scarves_title">Checkout these other cursed scarves</p>
            <div className="detail_scarves_div">
            {
                props.scarves.map(
                    (scarf) => {
                        return (
                            <RecommendScarf scarf={scarf} />
                        )
                    }
                )
            }
            </div>
        </div>
        <Footer/>
        </>
    )
}

DetailPage.getInitialProps = async (ctx) => {
    const { query } = ctx;
    const response = await fetch(`http://localhost:3000/api/onePost/` + query.scarfdetail);   
    const data = await response.json();
    console.log("data: ", data)

    const scvs = await fetch("http://localhost:3000/api/scarf");
    const scrvs = await scvs.json()

    const scarves = [];
    for(let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * scrvs.length);
        scarves.push(scrvs[index])
    }
    console.log(scarves)

    return {
        props : {
            data,
            scarves
        }
    }
}

