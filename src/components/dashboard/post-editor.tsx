'use client'

import { useState, useEffect } from 'react'
import { Post, PostStatus } from '@/types'
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'
import { Calendar, Hash, Image, Lock, MessageSquare, PenTool } from 'lucide-react'
import { LinkedInPreview } from './linkedin-preview'

interface PostEditorProps {
    post: Post | null
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, updates: Partial<Post>) => void
}

export function PostEditor({ post, isOpen, onClose, onSave }: PostEditorProps) {
    // Local state for form fields
    const [hook, setHook] = useState('')
    const [content, setContent] = useState('')
    const [visuals, setVisuals] = useState('')
    const [hashtags, setHashtags] = useState('')
    const [notes, setNotes] = useState('')
    // We don't edit status here directly in the form usually, but maybe? 
    // Let's keep it simple.

    useEffect(() => {
        if (post) {
            setHook(post.hook || '')
            setContent(post.content || '')
            setVisuals(post.visuals_placeholder || '')
            setHashtags(post.hashtags || '')
            setNotes(post.internal_notes || '')
        }
    }, [post])

    const handleSave = () => {
        if (!post) return
        onSave(post.id, {
            hook,
            content,
            visuals_placeholder: visuals,
            hashtags,
            internal_notes: notes
        })
        onClose()
    }

    if (!post) return null

    // Construct real-time preview object
    const previewPost = {
        ...post,
        hook,
        content,
        visuals_placeholder: visuals,
        internal_notes: notes
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0">
                <DialogHeader className="p-6 pb-2 border-b border-white/5 bg-slate-900">
                    <DialogTitle className="flex items-center gap-2 font-serif text-2xl text-gold-500">
                        <PenTool className="w-5 h-5" />
                        Edit Post
                    </DialogTitle>
                    <div className="text-xs text-slate-500 flex gap-4 mt-2">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                        <span className="uppercase tracking-wider font-mono text-gold-600">{post.platform}</span>
                    </div>
                </DialogHeader>

                <div className="flex flex-1 overflow-hidden">
                    {/* Left Column: Form */}
                    <div className="flex-1 overflow-y-auto p-6 border-r border-white/5 bg-slate-950">
                        <div className="grid gap-6">
                            {/* Hook */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Hook / Headline</label>
                                <input
                                    value={hook}
                                    onChange={(e) => setHook(e.target.value)}
                                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-lg font-medium text-white focus:border-gold-500/50 outline-none transition-colors"
                                    placeholder="Grab attention immediately..."
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Content Body</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="w-full h-64 bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-slate-300 focus:border-gold-500/50 outline-none transition-colors resize-none leading-relaxed font-mono text-sm"
                                    placeholder="Write your main content here..."
                                />
                            </div>

                            {/* Visuals & Hashtags Grid */}
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        <Image className="w-3 h-3" /> Visuals
                                    </label>
                                    <textarea
                                        value={visuals}
                                        onChange={(e) => setVisuals(e.target.value)}
                                        className="w-full h-20 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:border-gold-500/50 outline-none resize-none"
                                        placeholder="Describe image or video..."
                                    />
                                </div>
                                <div className="space-y-2">
                                    {/* Hashtags are now integrated in content usually, but keeping field if needed. 
                                          Let's show it but maybe less prominent if user adds them in content. 
                                          Actually user requested separate field. */}
                                    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        <Hash className="w-3 h-3" /> Hashtags
                                    </label>
                                    <textarea
                                        value={hashtags}
                                        onChange={(e) => setHashtags(e.target.value)}
                                        className="w-full h-20 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-blue-400 focus:border-gold-500/50 outline-none resize-none"
                                        placeholder="#RealEstate..."
                                    />
                                </div>
                            </div>

                            {/* Internal Notes */}
                            <div className="space-y-2 pt-4 border-t border-slate-800">
                                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-yellow-500/70">
                                    <Lock className="w-3 h-3" /> Internal Notes (Private)
                                </label>
                                <input
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-400 focus:border-gold-500/50 outline-none"
                                    placeholder="Notes for the team..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Preview */}
                    <div className="hidden lg:flex flex-1 bg-slate-100 flex-col">
                        <div className="p-3 border-b border-slate-200 bg-white text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">
                            Live Preview
                        </div>
                        <div className="flex-1 overflow-y-auto p-8 flex items-start justify-center bg-slate-100">
                            <LinkedInPreview post={previewPost} />
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-4 border-t border-white/5 bg-slate-900 gap-2">
                    {/* Client Feedback History (Compact) */}
                    {post.feedback && (
                        <div className="mr-auto flex items-center gap-2 text-red-300 bg-red-950/20 px-3 py-1 rounded text-xs border border-red-500/20">
                            <MessageSquare className="w-3 h-3" />
                            <span className="truncate max-w-[200px]">{post.feedback}</span>
                        </div>
                    )}

                    <button onClick={onClose} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
                        Cancel
                    </button>
                    <button onClick={handleSave} className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold rounded-lg transition-colors">
                        Save Changes
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
