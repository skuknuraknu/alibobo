// import libary
import NextAuth from 'next-auth'
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

export default NextAuth({
  providers: [
 LinkedInProvider({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET
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