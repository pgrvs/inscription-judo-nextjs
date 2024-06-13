import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const validEmail = process.env.USER_EMAIL
                const validPassword = process.env.USER_PASSWORD

                if (credentials.email === validEmail && credentials.password === validPassword) {
                    return { email: validEmail }
                } else {
                    throw new Error('Adresse e-mail ou mot de passe incorrect')
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin'
    },
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60// * 24 // 1 jour
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user
            }
            return token
        },
        async session({ session, token }) {
            session.user = token.user
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
