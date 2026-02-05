import { NextResponse } from 'next/server'

export async function POST(request: Request) {
// EMERGENCY BYPASS
const response = NextResponse.json({ success: true }, { status: 200 })
response.cookies.set('auth-token', 'authenticated', {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'strict',
maxAge: 60 * 60 * 24 * 7,
path: '/',
})
return response
}
