import { getPosts } from '@/lib/data-service'
import { Board } from '@/components/dashboard/board'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const posts = await getPosts()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-100">Content Calendar <span className="text-gold-500">Q1 2026</span></h1>
          <p className="text-slate-400 mt-1">Manage and approve social media content.</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 font-mono">Current Week: KW06</p>
        </div>
      </div>

      <Board initialPosts={posts} />
    </div>
  )
}
