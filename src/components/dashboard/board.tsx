'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { updatePost } from '@/lib/data-service'
import { PostCard } from './post-card'
import { cn } from '@/lib/utils'
import { PostEditor } from './post-editor'
import { FileText, Eye, CheckCircle, Send } from 'lucide-react'

interface BoardProps {
    initialPosts: Post[]
}

const columns: PostStatus[] = ['Draft', 'Review', 'Approved', 'Posted']

const columnConfig = {
    Draft: {
        icon: FileText,
        bgClass: 'glass-subtle border-white/5',
        headerClass: 'text-silver-400',
        countClass: 'bg-slate-800 text-silver-400',
    },
    Review: {
        icon: Eye,
        bgClass: 'glass-card border-gold-500/10',
        headerClass: 'text-gold-400',
        countClass: 'bg-gold-500/10 text-gold-400',
    },
    Approved: {
        icon: CheckCircle,
        bgClass: 'glass-subtle border-emerald-500/10 hover:border-emerald-500/20',
        headerClass: 'text-emerald-400',
        countClass: 'bg-emerald-500/10 text-emerald-400',
    },
    Posted: {
        icon: Send,
        bgClass: 'glass-subtle border-blue-500/10 hover:border-blue-500/20',
        headerClass: 'text-blue-400',
        countClass: 'bg-blue-500/10 text-blue-400',
    },
}

export function Board({ initialPosts }: BoardProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [editingPost, setEditingPost] = useState<Post | null>(null)
    const [dragOverColumn, setDragOverColumn] = useState<PostStatus | null>(null)

    const onUpdate = async (id: string, updates: Partial<Post>) => {
        setPosts(posts.map(p => p.id === id ? { ...p, ...updates } : p))
        if (editingPost?.id === id) {
            setEditingPost(prev => prev ? { ...prev, ...updates } : null)
        }
        const updated = await updatePost(id, updates)
        if (updated) {
            setPosts(prev => prev.map(p => p.id === id ? updated : p))
        }
    }

    const onDragStart = (e: React.DragEvent, postId: string) => {
        e.dataTransfer.setData('text/plain', postId)
        e.dataTransfer.effectAllowed = 'move'
    }

    const onDragOver = (e: React.DragEvent, status: PostStatus) => {
        e.preventDefault()
        setDragOverColumn(status)
    }

    const onDragLeave = () => {
        setDragOverColumn(null)
    }

    const onDrop = async (e: React.DragEvent, status: PostStatus) => {
        e.preventDefault()
        setDragOverColumn(null)
        const postId = e.dataTransfer.getData('text/plain')
        if (!postId) return
        setPosts(posts.map(p => p.id === postId ? { ...p, status } : p))
        await onUpdate(postId, { status })
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {columns.map((status, colIndex) => {
                    const columnPosts = posts.filter(p => p.status === status)
                    const config = columnConfig[status]
                    const Icon = config.icon
                    const isDragOver = dragOverColumn === status

                    return (
                        <div
                            key={status}
                            onDragOver={(e) => onDragOver(e, status)}
                            onDragLeave={onDragLeave}
                            onDrop={(e) => onDrop(e, status)}
                            className={cn(
                                "flex flex-col gap-4 p-4 rounded-2xl border min-h-[500px] transition-all duration-300",
                                config.bgClass,
                                isDragOver && "ring-2 ring-gold-500/30 bg-gold-500/5"
                            )}
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <Icon className={cn("w-4 h-4", config.headerClass)} />
                                    <h2 className={cn("font-serif font-bold tracking-wide", config.headerClass)}>
                                        {status}
                                    </h2>
                                </div>
                                <span className={cn("text-xs font-mono px-2 py-0.5 rounded-full", config.countClass)}>
                                    {columnPosts.length}
                                </span>
                            </div>

                            <div className="flex flex-col gap-3 flex-1">
                                {columnPosts.map((post, index) => (
                                    <div
                                        key={post.id}
                                        draggable
                                        onDragStart={(e) => onDragStart(e, post.id)}
                                    >
                                        <PostCard
                                            post={post}
                                            onUpdate={onUpdate}
                                            onEdit={setEditingPost}
                                        />
                                    </div>
                                ))}

                                {columnPosts.length === 0 && (
                                    <div className="flex-1 flex items-center justify-center text-silver-600 text-sm">
                                        <span className="opacity-50">Drop posts here</span>
                                    </div>
                                )}
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
