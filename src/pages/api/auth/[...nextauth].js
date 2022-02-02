import NextAuth from 'next-auth'
import Providers from "next-auth/providers";
import { checkUser, findUser } from '../../../backend/database';
import { isValidName, ValidateError, isValidEmail, isValidPassword, hashPassword } from '../../../components/validation';
import { compare, hash, genSalt } from 'bcryptjs';
import { passwordHash } from 'password-hash';

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith"
                },
                email: { 
                    label: "Username", 
                    type: "text ", 
                    placeholder: "jsmith" 
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials, req) {
                // TODO: store in mongodb
                // console.log('credentials are ', credentials);
                if(!isValidName(credentials.username) && credentials.username.length < 25 && credentials.username.length >= 0) {
                    throw ValidateError("username", "username is required. maxlength 25")
                }
                if(!isValidEmail(credentials.email) && credentials.email.length < 50 && credentials.email.length >= 0) {
                    throw ValidateError("email", "email is required. valid email maxlength 50")
                }
                if(!isValidPassword(credentials.password) && credentials.password.length < 16 && credentials.password.length >= 0) {
                    throw ValidateError("password", "password is required. minleng=6, maxleng=16, alphabet, number, special charactor")
                }
                const salt = await genSalt(12)
                const data = {
                    username: credentials.username,
                    email: credentials.email,
                    password: credentials.password // passwordHash.generate(credentials.password)
                };

                const user = {
                    name: data.username,
                    email: data.email,
                    image: "https://picsum.photos/300/250",
                    password: data.password
                }
                console.log("pw 3: ", user.password)
                const u = await findUser(user.email);
                if(!u) {
                    throw ValidateError("credentialuser", "user not found in the database")
                }
                console.log("1 ", user.password)
                console.log("2 ", u.password)
                // const checkPassword = await compare(user.password, u.password)
                if(user.password != u.password) {
                    throw ValidateError("credentialuser", "user password does not match")
                }

                if (u) {
                    // console.log("test credential::: ", user)
                    return user
                }
                return null
            }
        }),
        Providers.Discord({
            clientId: process.env.DISCORD_ID,
            clientSecret: process.env.DISCORD_SECRET
        }),
        Providers.Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],
    session: {
        jwt: true
    },

    pages: {
        signIn: '/signIn',
    },
    callbacks: {
        async session({ session, user, token }) {
            session = {};
            session.user = user;
            // console.log("-----", session)

            const u = await checkUser(user)
            
            const Myuser = {
                id: u.id.toString(),
                name: u.name,
                email: u.email,
                image: u.image
            }

            // console.log('MyUser: ', Myuser);

            session = Myuser
            // console.log('new session: ', session)
            return session;
        },

        async redirect({url, baseUrl}) {
            return Promise.resolve(url)
        }
    },
    secret: process.env.NEXT_AUTH_SECRET
})