import { useRouter } from 'next/router';
import { useSession, signIn, signOut, signin } from "next-auth/client"
import Link from 'next/link'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Header() {
    const router = useRouter();
    const [session] = useSession();
    return (
        <div className="header_div">
            <div className="header_left">
                <p><Link href="/upload">UPLOAD</Link></p>
                <p><Link href="/">SHOPPING</Link></p>
                <p><Link href="/">ABOUT US</Link></p>
            </div>
            {!session && (
                <>
                <div className="header_right">
                    <button onClick={() => signin()} className="header_button">LOGIN</button>
                    <Link href="/signup"><button className="header_button">SIGNUP</button></Link>
                </div>
                </>
            )}
            {session && (
                <>
                <div className="header_right">
                    <Link href="/"><AccountCircleOutlinedIcon fontSize="large" className="header_icon"/></Link>
                    <Link href="/"><img src="/skull-icon.png" alt="" className="header_skull_icon"/></Link>
                    <Link href="/"><button onClick={() => signOut({redirect: false, callbackUrl: "/"})} className="header_button">SIGNOUT</button></Link>
                </div>
                </>
            )}
            
        </div>
    )
}