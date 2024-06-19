import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
    const { pathname } = req.nextUrl

    // Permettre l'accès à la page de connexion et aux routes d'authentification API
    if (pathname.startsWith('/auth') || pathname.startsWith('/api/auth')) {
        return NextResponse.next()
    }

    // Rediriger si le token n'est pas présent ou a expiré
    if (!token || token.iat + 60 * 60 * 12 < Date.now()/1000) {
        const url = req.nextUrl.clone()
        url.pathname = '/auth/signin'
        return NextResponse.redirect(url)
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - icon.png (favicon file)
         */
        '/((?!_next/static|_next/image|icon.png).*)',
    ],
}
