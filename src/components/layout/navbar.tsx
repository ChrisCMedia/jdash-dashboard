'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LogOut, Home } from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

export function Navbar() {
    const { logout } = useAuth()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <nav className="h-16 px-6 border-b border-gold-900/30 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Home className="w-5 h-5 text-gold-500" />
                <span className="text-xl font-serif font-bold text-gold-500 tracking-wide">
                    J<span className="text-slate-100">Dash</span>
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-900 border border-gold-900/20">
                    <div className="w-6 h-6 rounded-full bg-gold-600/20 border border-gold-500/50 flex items-center justify-center text-xs text-gold-500 font-bold">
                        JD
                    </div>
                    <span className="text-sm font-medium text-slate-300">Jane Doe</span>
                </div>

                <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-gold-500 hover:bg-gold-500/10 rounded-full transition-colors"
                    title="Sign Out"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        </nav>
    )
}
