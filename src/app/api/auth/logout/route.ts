import { NextResponse } from 'next/server'

export async function POST() {
    const response = NextResponse.json({ success: true }, { status: 200 })

    // Delete cookies
    response.cookies.delete('auth-token')
    response.cookies.delete('user-role')

    return response
}
