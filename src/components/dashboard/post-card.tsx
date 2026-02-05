'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { cn } from '@/lib/utils'
import { Linkedin, MessageSquare, Calendar, Pencil } from 'lucide-react'

interface PostCardProps {
    post: Post
    onUpdate: (id: string, updates: Partial<Post>) => void
    onEdit?: (post: Post) => void
}

const statusColors = {
    Draft: 'bg-slate-800/50 border-slate-700 text-silver-400',
    Review: 'bg-gold-500/10 border-gold-500/30 text-gold-400',
    Approved: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
    Posted: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
}

export function PostCard({ post, onUpdate, onEdit }: PostCardProps) {
    const [content, setContent] = useState(post.content)
    const [hook, setHook] = useState(post.hook || '')
    const [feedback, setFeedback] = useState(post.feedback)
    const [isHovered, setIsHovered] = useState(false)

    const handleBlurContent = () => {
        if (content !== post.content) {
            onUpdate(post.id, { content })
        }
    }

    const handleBlurHook = () => {
        if (hook !== post.hook) {
            onUpdate(post.id, { hook })
        }
    }

    const handleBlurFeedback = () => {
        if (feedback !== post.feedback) {
            onUpdate(post.id, { feedback })
        }
    }

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onUpdate(post.id, { status: e.target.value as PostStatus })
    }

    return (
        <div
            className={cn(
                "group relative glass-subtle rounded-xl p-4 transition-all duration-300 flex flex-col gap-3 cursor-grab active:cursor-grabbing",
                "border border-white/5 hover:border-gold-500/30 hover:shadow-lg hover:shadow-gold-500/5",
                "hover:-translate-y-1"
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-silver-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                    {onEdit && (
                        <button
                            onClick={() => onEdit(post)}
                            className={cn(
                                "flex items-center gap-1 text-xs text-gold-500 hover:text-gold-400 transition-all duration-300",
                                "opacity-0 group-hover:opacity-100"
                            )}
                        >
                            <Pencil className="w-3 h-3" />
                            Edit
                        </button>
                    )}
                    <div
                        className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            post.platform.includes('Personal')
                                ? "bg-gold-500/10 text-gold-400"
                                : "bg-slate-700/50 text-silver-400"
                        )}
                        title={post.platform}
                    >
                        <Linkedin className="w-3 h-3" />
                    </div>
                </div>
            </div>

            {/* Hook Input */}
            <div className="pb-2 border-b border-white/5">
                <input
                    value={hook}
                    onChange={(e) => setHook(e.target.value)}
                    onBlur={handleBlurHook}
                    placeholder="Hook / Headline..."
                    className="w-full bg-transparent outline-none text-sm font-semibold text-silver-100 placeholder:text-silver-700 truncate"
                />
            </div>

            {/* Content */}
            <div className="flex-1">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleBlurContent}
                    placeholder="Write your post content here..."
                    className="w-full bg-transparent resize-none outline-none text-xs text-silver-300 placeholder:text-silver-700 min-h-[60px] leading-relaxed"
                />
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 pt-3 border-t border-white/5">
                {/* Feedback Section */}
                <div className="flex items-start gap-2">
                    <MessageSquare className="w-3 h-3 mt-0.5 text-silver-600" />
                    <input
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        onBlur={handleBlurFeedback}
                        placeholder="Add client feedback..."
                        className="flex-1 bg-transparent outline-none text-xs text-gold-400/80 placeholder:text-silver-700"
                    />
                </div>

                {/* Status Dropdown */}
                <select
                    value={post.status}
                    onChange={handleStatusChange}
                    className={cn(
                        "w-full text-xs font-medium py-2 px-3 rounded-lg cursor-pointer outline-none appearance-none text-center transition-all duration-300 border",
                        statusColors[post.status]
                    )}
                >
                    <option value="Draft" className="bg-slate-900 text-silver-400">Draft</option>
                    <option value="Review" className="bg-slate-900 text-gold-400">Review</option>
                    <option value="Approved" className="bg-slate-900 text-emerald-400">Approved</option>
                    <option value="Posted" className="bg-slate-900 text-blue-400">Posted</option>
                </select>
            </div>
        </div>
    )
}
