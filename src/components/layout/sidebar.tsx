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
    Smartphone
} from 'lucide-react'

const navItems = [
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'Board', href: '/', icon: LayoutDashboard },
    { name: 'Feed View', href: '/feed', icon: Smartphone },
    { name: 'Client View', href: '/client', icon: UserCheck },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="w-64 h-screen bg-slate-950 border-r border-gold-900/20 flex flex-col sticky top-0">
            <div className="h-16 flex items-center px-6 border-b border-gold-900/20">
                <span className="text-xl font-serif font-bold text-gold-500 tracking-wide">
                    J<span className="text-slate-100">Dash</span>
                </span>
            </div>

            <div className="flex-1 py-6 px-3 space-y-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                                isActive
                                    ? "bg-gold-500/10 text-gold-500"
                                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4", isActive ? "text-gold-500" : "text-slate-500 group-hover:text-slate-300")} />
                            {item.name}
                        </Link>
                    )
                })}
            </div>

            <div className="p-4 border-t border-gold-900/20">
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-full bg-gold-600/20 border border-gold-500/50 flex items-center justify-center text-xs text-gold-500 font-bold">
                        JD
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-300">Jane Doe</span>
                        <span className="text-xs text-slate-500">Agent Admin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
