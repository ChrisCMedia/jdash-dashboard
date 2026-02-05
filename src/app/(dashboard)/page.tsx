import { getPosts } from '@/lib/data-service'
import { Board } from '@/components/dashboard/board'
import { LayoutGrid, Clock } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const posts = await getPosts()

  // Calculate current week
  const now = new Date()
  const startOfYear = new Date(now.getFullYear(), 0, 1)
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000))
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7)

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gold-500/10 pb-6">
        <div className="animate-fade-in-up opacity-0" style={{ animationFillMode: 'forwards' }}>
          <h1 className="text-3xl font-serif font-bold text-gradient-gold flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-gold-500" />
            Content Board
          </h1>
          <p className="text-silver-400 mt-2">
            Q1 2026 • Manage and approve social media content
          </p>
        </div>
        <div
          className="flex items-center gap-2 glass-subtle px-4 py-2 rounded-full text-sm text-silver-400 animate-fade-in opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          <Clock className="w-4 h-4 text-gold-500" />
          <span className="font-mono">KW{weekNumber.toString().padStart(2, '0')}</span>
        </div>
      </div>

      <Board initialPosts={posts} />
    </div>
  )
}
