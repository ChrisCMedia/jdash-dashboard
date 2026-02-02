'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { cn } from '@/lib/utils'
import { Linkedin, MessageSquare, Calendar } from 'lucide-react'

interface PostCardProps {
    post: Post
    onUpdate: (id: string, updates: Partial<Post>) => void
}

const statusColors = {
    Draft: 'bg-slate-800 border-slate-700 text-slate-400',
    Review: 'bg-gold-900/20 border-gold-500/50 text-gold-500',
    Approved: 'bg-green-900/20 border-green-500/50 text-green-500',
    Posted: 'bg-blue-900/20 border-blue-500/50 text-blue-500',
}

export function PostCard({ post, onUpdate }: PostCardProps) {
    const [content, setContent] = useState(post.content)
    const [feedback, setFeedback] = useState(post.feedback)

    const handleBlurContent = () => {
        if (content !== post.content) {
            onUpdate(post.id, { content })
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
        <div className="group relative bg-slate-900 border border-slate-800 hover:border-gold-500/50 rounded-xl p-4 transition-all hover:shadow-xl hover:shadow-gold-900/10 flex flex-col gap-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                    {post.platform.includes('Personal') ? (
                        <div className="p-1 rounded bg-blue-500/10 text-blue-400" title="Personal Profile">
                            <Linkedin className="w-3 h-3" />
                        </div>
                    ) : (
                        <div className="p-1 rounded bg-slate-700/50 text-slate-400" title="Company Page">
                            <Linkedin className="w-3 h-3" />
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onBlur={handleBlurContent}
                    placeholder="Write your post content here..."
                    className="w-full bg-transparent resize-none outline-none text-sm text-slate-300 placeholder:text-slate-600 min-h-[80px] leading-relaxed"
                />
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-3 pt-3 border-t border-slate-800/50">
                {/* Feedback Section */}
                <div className="flex items-start gap-2">
                    <MessageSquare className="w-3 h-3 mt-1 text-slate-500" />
                    <input
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        onBlur={handleBlurFeedback}
                        placeholder="Add client feedback..."
                        className="flex-1 bg-transparent outline-none text-xs text-gold-400/90 placeholder:text-slate-700"
                    />
                </div>

                {/* Status Dropdown */}
                <select
                    value={post.status}
                    onChange={handleStatusChange}
                    className={cn(
                        "w-full text-xs font-medium py-1.5 px-2 rounded-lg cursor-pointer outline-none appearance-none text-center transition-colors",
                        statusColors[post.status]
                    )}
                >
                    <option value="Draft" className="bg-slate-900 text-slate-400">Draft</option>
                    <option value="Review" className="bg-slate-900 text-gold-500">Review</option>
                    <option value="Approved" className="bg-slate-900 text-green-500">Approved</option>
                    <option value="Posted" className="bg-slate-900 text-blue-500">Posted</option>
                </select>
            </div>
        </div>
    )
}
