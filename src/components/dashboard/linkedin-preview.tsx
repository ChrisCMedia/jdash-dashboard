'use client'

import { Post } from '@/types'
import { Linkedin, MoreHorizontal, ThumbsUp, MessageSquare, Share2, Send, Globe } from 'lucide-react'
import { format } from 'date-fns'

import { cn } from '@/lib/utils'

interface LinkedInPreviewProps {
    post: Partial<Post>
    className?: string
}

export function LinkedInPreview({ post, className }: LinkedInPreviewProps) {
    const isPersonal = post.platform === 'LinkedIn Personal'

    return (
        <div className={cn("bg-slate-900 border border-white/5 rounded-xl overflow-hidden shadow-2xl max-w-md mx-auto", className)}>
            {/* Header */}
            <div className="p-4 flex items-start justify-between">
                <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-slate-950 font-bold text-lg shadow-lg">
                        {isPersonal ? 'JL' : 'YT'}
                    </div>
                    <div>
                        <div className="text-sm font-bold text-silver-100 flex items-center gap-1">
                            {isPersonal ? 'Judith Lenz' : 'YOUR TIMES'}
                            <span className="text-silver-500 font-normal">• 1st</span>
                        </div>
                        <div className="text-xs text-silver-500 mt-0.5">
                            {isPersonal ? 'Managing Director @ YOUR TIMES' : 'Real Estate & Asset Management'}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-silver-500 mt-0.5">
                            <span>Just now</span>
                            <span>•</span>
                            <Globe className="w-3 h-3" />
                        </div>
                    </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-silver-500" />
            </div>

            {/* Content */}
            <div className="px-4 pb-3">
                <p className="text-sm text-silver-200 font-bold mb-2">{post.hook}</p>
                <div className="text-sm text-silver-300 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </div>
                {post.hashtags && (
                    <div className="text-sm text-gold-500/80 mt-3 font-medium">
                        {post.hashtags}
                    </div>
                )}
            </div>

            {/* Image */}
            {post.image_url && (
                <div className="border-t border-b border-white/5 bg-slate-950">
                    <img
                        src={post.image_url}
                        alt="Preview"
                        className="w-full h-auto max-h-[400px] object-cover"
                    />
                </div>
            )}

            {/* Engagement Stats */}
            <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between text-[11px] text-silver-500 font-medium">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500 border border-slate-900 flex items-center justify-center">
                            <ThumbsUp className="w-2 h-2 text-white fill-current" />
                        </div>
                        <div className="w-4 h-4 rounded-full bg-emerald-500 border border-slate-900 flex items-center justify-center">
                            <ThumbsUp className="w-2 h-2 text-white fill-current rotate-180" />
                        </div>
                    </div>
                    <span>142</span>
                </div>
                <div className="flex gap-2">
                    <span>24 comments</span>
                    <span>•</span>
                    <span>12 reposts</span>
                </div>
            </div>

            {/* Actions */}
            <div className="p-1 grid grid-cols-4 gap-1">
                <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-white/5 transition-colors text-silver-500 group">
                    <ThumbsUp className="w-4 h-4 group-hover:text-gold-500" />
                    <span className="text-[10px] font-bold">Like</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-white/5 transition-colors text-silver-500 group">
                    <MessageSquare className="w-4 h-4 group-hover:text-gold-500" />
                    <span className="text-[10px] font-bold">Comment</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-white/5 transition-colors text-silver-500 group">
                    <Share2 className="w-4 h-4 group-hover:text-gold-500" />
                    <span className="text-[10px] font-bold">Repost</span>
                </button>
                <button className="flex flex-col items-center justify-center gap-1 py-2 rounded-lg hover:bg-white/5 transition-colors text-silver-500 group">
                    <Send className="w-4 h-4 group-hover:text-gold-500" />
                    <span className="text-[10px] font-bold">Send</span>
                </button>
            </div>
        </div>
    )
}
