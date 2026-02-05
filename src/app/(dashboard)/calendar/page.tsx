import { getPosts } from '@/lib/data-service'
import { CalendarView } from '@/components/dashboard/calendar-view'
import { CalendarDays } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
    const posts = await getPosts()

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-500/10 pb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gradient-gold flex items-center gap-3">
                        <CalendarDays className="w-8 h-8 text-gold-500" />
                        Content Kalender
                    </h1>
                    <p className="text-silver-400 mt-2">Plane und verwalte den Redaktionsplan.</p>
                </div>

                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-xs text-silver-400 px-3 py-1.5 glass-subtle rounded-full">
                        <span className="w-2 h-2 rounded-full bg-slate-500"></span> Draft
                    </span>
                    <span className="flex items-center gap-2 text-xs text-silver-400 px-3 py-1.5 glass-subtle rounded-full">
                        <span className="w-2 h-2 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span> Review
                    </span>
                    <span className="flex items-center gap-2 text-xs text-silver-400 px-3 py-1.5 glass-subtle rounded-full">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span> Approved
                    </span>
                </div>
            </div>
            <CalendarView initialPosts={posts} />
        </div>
    )
}
