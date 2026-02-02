import { getPosts } from '@/lib/data-service'
import { ClientFeed } from '@/components/dashboard/client-feed'

export const dynamic = 'force-dynamic'

export default async function ClientPage() {
    const posts = await getPosts()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xs font-mono text-gold-500 uppercase tracking-widest">Judith Mode</span>
                    <h1 className="text-3xl font-serif font-bold text-slate-100">Content Approval</h1>
                </div>
            </div>
            <ClientFeed initialPosts={posts} />
        </div>
    )
}
