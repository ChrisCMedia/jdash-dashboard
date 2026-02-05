'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
    LayoutDashboard,
    Calendar,
    BarChart3,
    Settings,
    UserCheck,
    Smartphone,
    LogOut
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'

const navItems = [
    { name: 'Redaktionsplan', href: '/calendar', icon: Calendar },
    { name: 'Board', href: '/', icon: LayoutDashboard },
    { name: 'Feed View', href: '/feed', icon: Smartphone },
    { name: 'Client View', href: '/client', icon: UserCheck },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Einstellungen', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()
    const { role, logout } = useAuth()

    const filteredItems = navItems.filter(item => {
        if (role === 'client') {
            // Show Board, Calendar, Feed, Client View, Analytics
            return ['/', '/calendar', '/feed', '/client', '/analytics'].includes(item.href)
        }
        return true
    })

    return (
        <div className="w-72 h-screen glass sticky top-0 flex flex-col border-r border-gold-500/10">
            {/* Logo Section */}
            <div className="h-20 flex items-center px-6 border-b border-gold-500/10">
                <div className="flex items-center gap-3 group">
                    <div className="relative">
                        <img
                            src="/Logo.png"
                            alt="YT Content Cockpit"
                            width={44}
                            height={44}
                            className="rounded-lg drop-shadow-[0_4px_12px_rgba(212,175,55,0.25)] transition-transform duration-300 group-hover:scale-105"
                        />
                        {/* Glow effect behind logo */}
                        <div className="absolute inset-0 bg-gold-500/20 rounded-lg blur-xl -z-10 opacity-50 group-hover:opacity-75 transition-opacity" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-serif font-bold text-gradient-gold tracking-wide">
                            YT Content
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.25em] text-silver-400 font-medium">
                            Cockpit
                        </span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {filteredItems.map((item, index) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "glass-card text-gold-400"
                                    : "text-silver-400 hover:text-silver-100 hover:bg-white/5"
                            )}
                        >
                            {/* Active indicator glow */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-gold-400 to-gold-600 rounded-full shadow-[0_0_12px_rgba(212,175,55,0.5)]" />
                            )}

                            <item.icon className={cn(
                                "w-5 h-5 transition-all duration-300",
                                isActive
                                    ? "text-gold-400"
                                    : "text-silver-500 group-hover:text-silver-300 group-hover:scale-110"
                            )} />

                            <span className="relative">
                                {item.name}
                                {isActive && (
                                    <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-gold-500/50 to-transparent" />
                                )}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-gold-500/10 mt-auto">
                <div onClick={logout} className="glass-subtle rounded-xl p-3 hover:bg-white/5 transition-colors duration-300 cursor-pointer group">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-slate-950 font-bold text-sm shadow-lg shadow-gold-500/20">
                                {role === 'admin' ? 'CM' : 'JD'}
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="text-sm font-medium text-silver-100 truncate">
                                {role === 'admin' ? 'Christopher' : 'Judith'}
                            </span>
                            <span className="text-xs text-silver-500 capitalize">{role}</span>
                        </div>
                        <LogOut className="w-4 h-4 text-silver-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>
            </div>
        </div>
    )
}
