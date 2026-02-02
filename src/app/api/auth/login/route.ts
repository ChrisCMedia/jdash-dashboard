import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { password } = body

    // In a real app, use an environment variable. 
    // For this task, we can use a hardcoded fallback or ENV.
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'secret'

    if (password === ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true }, { status: 200 })

        // Set a cookie
        response.cookies.set('auth-token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })

        return response
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
}
