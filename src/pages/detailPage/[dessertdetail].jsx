import CardMedia from '@mui/material/CardMedia';
import RecommendScarf from '../../components/recommendscarf';
import { useState } from 'react'

export default function DetailPage({props}) {
    //console.log("props--", props.data)
    //console.log("props22--", props.scarves)
    return (
        <>
        <div className="detail_card_div">
            <div className="detail_card_info">
                <div className="detail_card_image_div">
                    <CardMedia className="detail_card_image"
                        component="img"
                        image={props.data.image}
                        alt="image"
                    />
                </div>
                <div className="detail_card_info_elements">
                    <p className="detail_card_title">{props.data.name}</p>
                    <p className="detail_card_desc">Amount: {props.data.amount}</p>
                    <p className="detail_card_desc">Ingredients: {props.data.ingredients}</p>

                    <p className="detail_card_buy_price">Price: {props.data.price}</p>
                        
                    <div className="detail_card_buy">
                        <button className="detail_card_buy_button" onClick={() => alert(`Go to order page (not implemented yet)`)}>
                            Buy Dessert <img src="/smile1.png" alt="" className="button_icon"/></button>
                        <button className="detail_card_buy_button detail_card_buy_button2" onClick={() => alert(`The item added to cart  (not implemented yet)`)}>
                            Add to Cart <img src="/smile1.png" alt="" className="button_icon"/></button>
                    </div>

                </div>
            </div>
            <p className="detail_desserts_title">Checkout these other desserts</p>
            {/* <div className="detail_desserts_div">
            {
                props.scarves.map(
                    (scarf) => {
                        return (
                            <RecommendScarf scarf={scarf} />
                        )
                    }
                )
            }
            </div> */}
        </div>
        </>
    )
}

DetailPage.getInitialProps = async (ctx) => {
    const { query } = ctx;
    const response = await fetch(`http://localhost:3000/api/onePost/` + query.dessertdetail);   
    const data = await response.json();
    // console.log("data: ", data)

    // const scvs = await fetch("http://localhost:3000/api/dessert");
    // const scrvs = await scvs.json()

    // const scarves = [];
    // for(let i = 0; i < 4; i++) {
    //     let index = Math.floor(Math.random() * scrvs.length);
    //     scarves.push(scrvs[index])
    // }
    // console.log(scarves)

    return {
        props : {
            data,
            // scarves
        }
    }
}

