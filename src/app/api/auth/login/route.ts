import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { password } = body

        // 1. Serverseitige Passwort-Überprüfung
        let role = null
        if (password === 'admin123!!!') {
            role = 'admin'
        } else if (password === 'GolfErfolg2026!') {
            role = 'client'
        }

        // 2. Fehlerfall: Kein gültiges Passwort
        if (!role) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // 3. Erfolgsfall: Cookie setzen
        // Das ist der ENTSCHEIDENDE Teil für den "Verifying-Loop":
        // Die Middleware sucht nach dem 'auth-token' Cookie.
        const response = NextResponse.json({ success: true, role }, { status: 200 })

        response.cookies.set('auth-token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // 'lax' ist oft robuster für Redirects als 'strict'
            maxAge: 60 * 60 * 24 * 7, // 1 Woche
            path: '/',
        })

        // Optional: Rolle im Cookie speichern, falls Middleware rollenbasiert prüfen soll
        response.cookies.set('user-role', role, {
            httpOnly: false, // Client kann es lesen
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        return response

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
