import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers : [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Email",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith@gmail.com" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            if (user) {
                // Any object returned will be saved in `user` property of the JWT
                return user
            } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
            }
        }
    })
  ],
    // For server side rendering
    secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }