import { useSession, getSession } from "next-auth/client"
import NoSession from "../../components/nosession"
import { useRouter } from "next/router"
import { getDessertsByUserID, getDessertsInUserCart } from "../../backend/database";
import UserDessert from "../../components/userdessert";
import CartDessert from "../../components/cartdessert";

export default function User(props) {
    const [session, loadingSession] = useSession();
    const sessionInfo = props.session;
    const router = useRouter()

    const displaySelect = props.display;

    if (loadingSession) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {!session && (
                <>
                <NoSession/>
                </>
            )}
            {session && (
                <>
                <div className="user_div">
                    <div className="user_nav">
                        <div className="user_img_div">
                            <img src={sessionInfo.image} alt="user profile image" className="user_img"/>
                        </div>
                        <div className="user_info">
                            <p>{sessionInfo.name}</p>
                            <p>{sessionInfo.email}</p>
                        </div>
                        <div className="user_buttons">
                            <p className="user_button" onClick={() => router.push("/user/profile")}>My Desserts</p>
                            <p className="user_button" onClick={() => router.push("/user/edit")}>Edit Profile</p>
                            <p className="user_button" onClick={() => router.push("/user/cart")}>Cart</p>
                            <p className="user_button" onClick={() => router.push("/user/order")}>My Order</p>
                        </div>
                    </div>
                    <div className="user_display">
                        {displaySelect == "profile" && (
                            <>
                            <p>My Desserts</p>
                            <div className="user_cards">
                                {props.desserts.map(
                                    (dessert) => {
                                        return (
                                            <UserDessert dessert={dessert}/>
                                        )
                                    }
                                )}
                            </div>
                            </>
                        )}
                        {displaySelect == "edit" && (
                            <>
                            <p>Edit Profile</p>
                            <p>to be updated...</p>
                            </>
                        )}
                        {displaySelect == "cart" && (
                            <>
                            <div className="cart_div">
                                <p>Cart</p>
                                <div className="order_button_div">
                                    <a onClick={() => alert("going to order page (Not implemented yet)")} className="order_button">ORDER</a>
                                </div>
                            </div>
                            <div className="cart_cards">
                                {props.cartdesserts.map(
                                    (dessert) => {
                                        return (
                                            <CartDessert dessert={dessert}/>
                                        )
                                    }
                                )}
                            </div>
                            </>
                        )}
                        {displaySelect == "order" && (
                            <>
                            <p>Order</p>
                            <p>to be updated...</p>
                            </>
                        )}
                    </div>
                </div>
                </>
            )}
        </div>
    )
}

export async function getServerSideProps(ctx) {
    const { req, query } = ctx;
    const display = query.userdisplay;
    const session = await getSession({ req });

    if(!session) {
        return {
            props: {
                desserts: null,
                session: null
            }
        }
    }
    else if(session) {
        const dessertsdata = await getDessertsByUserID(session.id);
        const cart = await getDessertsInUserCart(session.id);

        const desserts = dessertsdata.reverse().map(
            (dessert) => {
                return {
                    id: dessert.id.toString(),
                    name: dessert.name,
                    amount: dessert.amount,
                    price: dessert.price,
                    ingredients: dessert.ingredients,
                    image: dessert.image
                }
            }
        )
        
        const cartdesserts = cart.reverse().map(
            (dessert) => {
                return {
                    id: dessert.id.toString(),
                    name: dessert.name,
                    amount: dessert.amount,
                    price: dessert.price,
                    ingredients: dessert.ingredients,
                    image: dessert.image
                }
            }
        )

        return {
            props: {
                session,
                display,
                desserts,
                cartdesserts
            }
        }
    }
}