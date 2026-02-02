import { getPosts } from '@/lib/data-service'
import { CalendarView } from '@/components/dashboard/calendar-view'

export const dynamic = 'force-dynamic'

export default async function CalendarPage() {
    const posts = await getPosts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-serif font-bold text-slate-100">Content Calendar</h1>
                <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-slate-600"></span> Draft
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-gold-500"></span> Review
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400 px-3 py-1 bg-slate-900 rounded-full border border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Approved
                    </span>
                </div>
            </div>
            <CalendarView initialPosts={posts} />
        </div>
    )
}
