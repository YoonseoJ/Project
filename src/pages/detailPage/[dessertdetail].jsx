import CardMedia from "@mui/material/CardMedia";
import RecommendDessert from "../../components/recommendscarf";

export default function DetailPage({props}) {
    console.log(props.desserts)
    return (
        <>
        <div className="detail_card_div">
            <div className="detail_backgroud"></div>
            <div className="detail_backgroud2"></div>
            <div className="detail_card_info">
                <div className="detail_card_image_div">
                    <CardMedia className="detail_card_image"
                        component="img"
                        image={props.data.image}
                        alt="image"
                        sx={{width: "20rem", height: "20rem"}}
                    />
                </div>
                <div className="detail_card_info_elements">
                    <p className="detail_card_title">{props.data.name}</p>
                    <p className="detail_card_desc">Amount: {props.data.amount}</p>
                    <p className="detail_card_desc">Ingredients: {props.data.ingredients}</p>

                    <p className="detail_card_buy_price">Price: $ {props.data.price}</p>
                        
                    <div className="detail_card_buy">
                        <button className="detail_card_buy_button" onClick={() => alert(`Go to order page (not implemented yet)`)}>
                            Buy Dessert</button>
                        <button className="detail_card_buy_button detail_card_buy_button2" onClick={() => alert(`The item added to cart  (not implemented yet)`)}>
                            Add to Cart</button>
                    </div>

                </div>
            </div>
            <p className="detail_desserts_title">Checkout these other desserts</p>
            <div className="detail_desserts_div">
            {
                props.desserts.map(
                    (dessert) => {
                        return (
                            <RecommendDessert dessert={dessert} />
                        )
                    }
                )
            }
            </div>
        </div>
        </>
    )
}

DetailPage.getInitialProps = async (ctx) => {
    const { query } = ctx;
    const response = await fetch(`${process.env.PUBLIC_URL}/api/onePost/` + query.dessertdetail);   
    const data = await response.json();

    const dsrt = await fetch("http://localhost:3000/api/dessert");
    const dsrts = await dsrt.json()
    console.log(dsrts)

    const ranNums = Array.from({length: 4}, () => Math.floor(Math.random() * dsrts.length));

    const desserts = [];
    for(let i = 0; i < 4; i++) {
        desserts.push(dsrts[ranNums[i]])
    }
    console.log(desserts)

    return {
        props : {
            data,
            desserts
        }
    }
}

