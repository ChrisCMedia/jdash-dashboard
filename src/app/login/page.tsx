'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Lock, ArrowRight, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

export default function LoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        // Fake API call / delay
        await new Promise(resolve => setTimeout(resolve, 800))

        if (password === 'admin123') {
            login('admin')
        } else if (password === 'client123' || password === 'judith123') {
            login('client')
        } else {
            setError('Incorrect password')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-silver-100 p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/5 rounded-full blur-[128px]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/3 rounded-full blur-[100px]" />
            </div>

            <div className="w-full max-w-md relative">
                {/* Logo Section */}
                <div className="text-center mb-8">
                    <div className="inline-block relative mb-6">
                        <img
                            src="/Logo.png"
                            alt="YOUR TIMES"
                            width={80}
                            height={80}
                            className="rounded-2xl drop-shadow-[0_8px_32px_rgba(212,175,55,0.4)] mx-auto"
                        />
                        <div className="absolute inset-0 bg-gold-500/20 rounded-2xl blur-2xl -z-10" />
                    </div>
                    <h1 className="text-3xl font-serif font-bold text-gradient-gold mb-2">
                        YT Content Cockpit
                    </h1>
                    <p className="text-silver-500 text-sm">
                        Professional Content Command Center
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-2xl p-8 space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-12 h-12 mx-auto bg-gold-500/10 rounded-xl flex items-center justify-center mb-4">
                            <Lock className="w-5 h-5 text-gold-500" />
                        </div>
                        <h2 className="text-lg font-medium text-silver-100">Secure Access</h2>
                        <p className="text-silver-500 text-sm">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-silver-400 uppercase tracking-wider pl-1">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={cn(
                                        "w-full px-4 py-3.5 glass-subtle rounded-xl outline-none transition-all duration-300 placeholder:text-silver-600 text-silver-200",
                                        "border focus:border-gold-500/50 focus:shadow-[0_0_20px_rgba(212,175,55,0.15)]",
                                        error ? "border-rose-500/50" : "border-white/5"
                                    )}
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-rose-400 pl-1">{error}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className={cn(
                                "w-full py-3.5 btn-primary flex items-center justify-center gap-2 group",
                                (loading || !password) && "opacity-50 cursor-not-allowed transform-none shadow-none"
                            )}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    Access Dashboard
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-silver-600 text-xs mt-6">
                    © 2026 YOUR TIMES Real Estate & Asset Management
                </p>
            </div>
        </div>
    )
}
