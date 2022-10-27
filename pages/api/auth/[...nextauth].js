// import libary
import NextAuth from 'next-auth'
import FacebookProvider from "next-auth/providers/facebook";
import InstagramProvider from "next-auth/providers/instagram";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
  CredentialsProvider({
      credentials: {
        Password: { placeholder: `password`, type: "password" }
      },
      authorize(credentials) {
        if (credentials.Password === "password") {
          return {
            name: "John Doe",
            email: "john@doe.com",
            image: "https://www.fillmurray.com/200/200"
          };
        }
      }
    }),
  FacebookProvider({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET
  }),
  ],
  pages: {
    signIn: "/auth/signIn",
    signUp: "/auth/SignUp"
  },
})