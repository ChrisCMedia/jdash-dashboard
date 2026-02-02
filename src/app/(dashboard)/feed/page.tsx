import { getPosts } from '@/lib/data-service'
import { LinkedInPreview } from '@/components/dashboard/linkedin-preview'

export const dynamic = 'force-dynamic'

export default async function FeedPage() {
    const posts = await getPosts()

    // Filter for only scheduled/active content if desired, or all? 
    // Let's show all for the "Command Center" feel, but maybe visually separate past/future.
    // For now, simple list.

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-20">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <span className="text-xs font-mono text-gold-500 uppercase tracking-widest">Live Preview</span>
                    <h1 className="text-3xl font-serif font-bold text-slate-100">Feed Timeline</h1>
                </div>
            </div>

            <div className="space-y-6">
                {posts.map(post => (
                    <div key={post.id} className="relative group">
                        <div className="absolute -left-12 top-4 text-xs font-mono text-slate-500 w-8 text-right hidden sm:block">
                            {new Date(post.date).toLocaleDateString(undefined, { day: '2-digit', month: 'short' })}
                        </div>
                        <LinkedInPreview post={post} className="transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/20" />
                    </div>
                ))}
            </div>
        </div>
    )
}
