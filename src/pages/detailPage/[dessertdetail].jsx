import CardMedia from "@mui/material/CardMedia";
import RecommendDessert from "../../components/recommenddessert";
import { useSession } from "next-auth/client";

export default function DetailPage({props}) {
    const [session, loadingSession] = useSession();

    // adding dessert to user's cart
    const handleAddCart = async () => {
        const data = {
            dessertID: props.data._id,
            userID: session.id
        }
        const body = JSON.stringify(data);

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: body
        };

        try {
            const response = await fetch(`/api/usercart`, requestOptions);
            if(!response.ok) {
                alert(`The item already exist in the cart`)
            }
            if(response.ok) {
                alert(`The item added to cart`)
            }
        } catch(error) {
            console.log("error**: ", error);
        }
    }

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
                        <button className="detail_card_buy_button detail_card_buy_button2" onClick={handleAddCart}>
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

    const dsrt = await fetch(`${process.env.PUBLIC_URL}/api/dessert`);
    const dsrts = await dsrt.json()

    const ranNums = Array.from({length: 4}, () => Math.floor(Math.random() * dsrts.length));

    const desserts = [];
    for(let i = 0; i < 4; i++) {
        desserts.push(dsrts[ranNums[i]])
    }

    return {
        props : {
            data,
            desserts
        }
    }
}

