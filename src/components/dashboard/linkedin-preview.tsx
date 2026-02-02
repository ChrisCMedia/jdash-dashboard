'use client'

import { Post } from "@/types"
import { MoreHorizontal, ThumbsUp, MessageSquare, Repeat, Send, Globe, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

interface LinkedInPreviewProps {
    post: Post
    className?: string
}

export function LinkedInPreview({ post, className }: LinkedInPreviewProps) {
    const isCompany = post.platform === 'LinkedIn Company'
    const name = isCompany ? 'YOUR TIMES' : 'Judith Lenz'
    const bio = isCompany ? 'Real Estate & Asset Management' : 'CEO at YOUR TIMES | Real Estate Expert'
    const avatarFallback = isCompany ? 'YT' : 'JL'
    // In a real app we'd have real URLs. For now, colors/gradients or simple placeholders.
    const avatarColor = isCompany ? 'bg-slate-800' : 'bg-gold-500'

    const timeAgo = post.date ? formatDistanceToNow(new Date(post.date), { addSuffix: true }).replace('about ', '') : 'now'

    // Simple text processing for hashtags and "see more"
    const content = post.content || ''
    const lines = content.split('\n')
    const displayContent = lines.slice(0, 3).join('\n') // Show first 3 lines
    const hasMore = lines.length > 3

    const highlightHashtags = (text: string) => {
        return text.split(' ').map((word, i) => {
            if (word.startsWith('#')) {
                return <span key={i} className="text-[#0a66c2] font-semibold hover:underline cursor-pointer">{word} </span>
            }
            return word + ' '
        })
    }

    return (
        <div className={cn("bg-white text-slate-900 rounded-lg shadow-sm border border-slate-200 font-sans max-w-[555px] w-full mx-auto", className)}>
            {/* Header */}
            <div className="flex justify-between items-start p-3 pb-1">
                <div className="flex gap-3">
                    <Avatar className={cn("w-12 h-12 rounded mt-1", isCompany ? "rounded-none" : "rounded-full")}>
                        <AvatarFallback className={cn("text-white font-bold", avatarColor)}>{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="font-semibold text-sm hover:underline cursor-pointer hover:text-[#0a66c2]">{name}</span>
                            <span className="text-slate-500 text-xs">• {isCompany ? '1st' : '3rd+'}</span>
                        </div>
                        <span className="text-xs text-slate-500 leading-tight line-clamp-1">{bio}</span>
                        <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                            <span>{timeAgo}</span>
                            <span>•</span>
                            <Globe className="w-3 h-3" />
                        </div>
                    </div>
                </div>
                {isCompany && (
                    <button className="text-[#0a66c2] font-semibold text-sm flex items-center gap-1 hover:bg-[#0a66c2]/10 px-2 py-1 rounded transition-colors">
                        <Plus className="w-4 h-4" /> Follow
                    </button>
                )}
                {!isCompany && (
                    <button className="text-slate-500 hover:bg-slate-100 p-1 rounded-full">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Content Body */}
            <div className="px-4 py-2 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                {post.hook && (
                    <div className="font-semibold mb-2">{post.hook}</div>
                )}
                {/* We just show full content for now in preview for editing ease, or could toggle. 
                    Let's show full to be helpful to the editor user. */}
                {highlightHashtags(content)}
            </div>

            {/* Visuals Placeholder */}
            {post.visuals_placeholder && (
                <div className="w-full bg-slate-100 border-y border-slate-200 aspect-video flex flex-col items-center justify-center text-slate-400 gap-2 cursor-pointer hover:bg-slate-200/50 transition-colors">
                    <span className="text-4xl">🖼️</span>
                    <span className="text-sm font-medium px-8 text-center">{post.visuals_placeholder}</span>
                </div>
            )}

            {/* Footer Stats (Fake) */}
            <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="w-4 h-4 bg-[#0a66c2] rounded-full flex items-center justify-center"><ThumbsUp className="w-2.5 h-2.5 text-white" fill="white" /></div>
                        <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center"><div className="text-[10px] text-white">👏</div></div>
                    </div>
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">124</span>
                </div>
                <div className="flex gap-2">
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">32 comments</span>
                    <span>•</span>
                    <span className="hover:text-[#0a66c2] hover:underline cursor-pointer">5 reposts</span>
                </div>
            </div>

            {/* Action Bar */}
            <div className="px-2 py-1 flex items-center justify-between">
                <ActionButton icon={ThumbsUp} label="Like" />
                <ActionButton icon={MessageSquare} label="Comment" />
                <ActionButton icon={Repeat} label="Repost" />
                <ActionButton icon={Send} label="Send" />
            </div>
        </div>
    )
}

function ActionButton({ icon: Icon, label }: { icon: any, label: string }) {
    return (
        <button className="flex items-center gap-2 px-3 py-3 rounded hover:bg-slate-100 flex-1 justify-center transition-colors group">
            <Icon className="w-5 h-5 text-slate-500 group-hover:text-slate-600 stroke-[2]" />
            <span className="text-sm font-semibold text-slate-500 group-hover:text-slate-600">{label}</span>
        </button>
    )
}
