
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    // Nuclear Bypass: Accept ANY login attempt
    const response = NextResponse.json({ success: true }, { status: 200 })

    // Set the auth cookie
    response.cookies.set('auth-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
    })

    return response
}
