'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function LoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                router.push('/')
                router.refresh()
            } else {
                setError('Incorrect password')
            }
        } catch {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen grid place-items-center bg-slate-900 text-gold-500">
            <div className="w-full max-w-sm p-8 space-y-6 bg-slate-950/50 border border-gold-900/40 rounded-2xl backdrop-blur-sm shadow-2xl">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-serif text-gold-500">Agent Login</h1>
                    <p className="text-slate-400 text-sm">Enter your password to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={cn(
                                "w-full px-4 py-3 bg-slate-900/50 border rounded-xl outline-none transition-all placeholder:text-slate-600 text-slate-200",
                                "border-gold-900/30 focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50",
                                error ? "border-red-500/50 focus:border-red-500" : ""
                            )}
                        />
                        {error && <p className="text-xs text-red-400 pl-1">{error}</p>}
                    </div>

                    <button
                        type="button" // Change to submit in form
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-slate-950 font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Verifying...' : 'Access Dashboard'}
                    </button>
                </form>
            </div>
        </div>
    )
}
