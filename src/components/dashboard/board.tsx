'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { updatePost } from '@/lib/data-service'
import { PostCard } from './post-card'
import { cn } from '@/lib/utils'
import { PostEditor } from './post-editor'

interface BoardProps {
    initialPosts: Post[]
}

const columns: PostStatus[] = ['Draft', 'Review', 'Approved', 'Posted']

const columnStyles = {
    Draft: 'bg-slate-900/50 border-slate-800/50',
    Review: 'bg-gold-900/5 border-gold-900/20',
    Approved: 'bg-green-900/5 border-green-900/20',
    Posted: 'bg-blue-900/5 border-blue-900/20',
}

const columnHeaders = {
    Draft: 'text-slate-400',
    Review: 'text-gold-500',
    Approved: 'text-green-500',
    Posted: 'text-blue-500',
}

export function Board({ initialPosts }: BoardProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [editingPost, setEditingPost] = useState<Post | null>(null)

    const onUpdate = async (id: string, updates: Partial<Post>) => {
        // Optimistic Update
        setPosts(posts.map(p => p.id === id ? { ...p, ...updates } : p))

        // Also update editingPost if it's open
        if (editingPost?.id === id) {
            setEditingPost(prev => prev ? { ...prev, ...updates } : null)
        }

        // API Call
        const updated = await updatePost(id, updates)
        if (updated) {
            setPosts(prev => prev.map(p => p.id === id ? updated : p))
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map((status) => {
                    const columnPosts = posts.filter(p => p.status === status)

                    return (
                        <div key={status} className={cn("flex flex-col gap-4 p-4 rounded-2xl border min-h-[500px]", columnStyles[status])}>
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <h2 className={cn("font-serif font-bold tracking-wide", columnHeaders[status])}>{status}</h2>
                                <span className="text-xs font-mono text-slate-600 bg-slate-950 px-2 py-0.5 rounded-full">
                                    {columnPosts.length}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 h-full">
                                {columnPosts.map(post => (
                                    <PostCard
                                        key={post.id}
                                        post={post}
                                        onUpdate={onUpdate}
                                        onEdit={setEditingPost}
                                    />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>

            <PostEditor
                post={editingPost}
                isOpen={!!editingPost}
                onClose={() => setEditingPost(null)}
                onSave={onUpdate}
            />
        </>
    )
}
