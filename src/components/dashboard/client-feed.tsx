'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { updatePost } from '@/lib/data-service'
import { format } from 'date-fns'
import { Linkedin, CheckCircle, MessageSquare, Save, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface ClientFeedProps {
    initialPosts: Post[]
}

export function ClientFeed({ initialPosts }: ClientFeedProps) {
    const [posts, setPosts] = useState<Post[]>(initialPosts)
    const [activeFeedbackId, setActiveFeedbackId] = useState<string | null>(null)
    const [feedbackText, setFeedbackText] = useState('')
    const [savingId, setSavingId] = useState<string | null>(null)

    const handleApprove = async (id: string) => {
        // Optimistic
        setPosts(posts.map(p => p.id === id ? { ...p, status: 'Approved' } : p))
        // API
        await updatePost(id, { status: 'Approved' })
    }

    const handleRequestChanges = async (id: string) => {
        if (!feedbackText.trim()) return

        const updatedPost = posts.find(p => p.id === id)
        if (!updatedPost) return

        const newFeedback = updatedPost.feedback
            ? updatedPost.feedback + '\n[Client]: ' + feedbackText
            : '[Client]: ' + feedbackText

        setPosts(posts.map(p => p.id === id ? { ...p, status: 'Draft', feedback: newFeedback } : p))
        await updatePost(id, { status: 'Draft', feedback: newFeedback })

        setActiveFeedbackId(null)
        setFeedbackText('')
    }

    const handlePostChange = (id: string, field: 'hook' | 'content', value: string) => {
        setPosts(posts.map(p => p.id === id ? { ...p, [field]: value } : p))
    }

    const handleSaveDraft = async (id: string) => {
        const postToSave = posts.find(p => p.id === id)
        if (!postToSave) return

        setSavingId(id)
        try {
            // Persist to DB
            await updatePost(id, {
                hook: postToSave.hook,
                content: postToSave.content
            })
        } finally {
            setSavingId(null)
        }
    }

    const filteredPosts = posts.filter(p => ['Draft', 'Review', 'Approved'].includes(p.status))

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {filteredPosts.length === 0 && (
                <div className="text-center py-20 bg-slate-900 rounded-2xl border border-slate-800">
                    <p className="text-slate-400">No content is currently waiting for your review.</p>
                </div>
            )}

            {filteredPosts.map(post => (
                <div key={post.id} className="bg-slate-950 border border-gold-900/20 rounded-2xl overflow-hidden shadow-lg">
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 bg-slate-900/50 border-b border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                                <Linkedin className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-200">{post.platform}</p>
                                <p className="text-xs text-slate-500">{format(new Date(post.date), 'EEEE, d. MMMM yyyy')}</p>
                            </div>
                        </div>
                        <div>
                            {post.status === 'Approved' ? (
                                <span className="px-3 py-1 rounded-full bg-green-900/20 text-green-500 border border-green-500/20 text-xs font-semibold flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> Approved
                                </span>
                            ) : post.status === 'Draft' ? (
                                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-400 border border-slate-700 text-xs font-semibold">
                                    Draft Mode
                                </span>
                            ) : (
                                <span className="px-3 py-1 rounded-full bg-gold-900/20 text-gold-500 border border-gold-500/20 text-xs font-semibold">
                                    Pending Review
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Content Preview */}
                    <div className="p-6 space-y-4">
                        {post.status === 'Draft' ? (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Hook</label>
                                    <Input
                                        value={post.hook || ''}
                                        onChange={(e) => handlePostChange(post.id, 'hook', e.target.value)}
                                        placeholder="Write a catchy hook..."
                                        className="bg-slate-900/50 border-slate-800 text-slate-200 focus:border-blue-500/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs text-slate-500 font-medium uppercase tracking-wider">Content</label>
                                    <Textarea
                                        value={post.content || ''}
                                        onChange={(e) => handlePostChange(post.id, 'content', e.target.value)}
                                        placeholder="Draft your content here..."
                                        className="min-h-[200px] bg-slate-900/50 border-slate-800 text-slate-200 focus:border-blue-500/50 leading-relaxed"
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                {post.hook && (
                                    <h3 className="font-bold text-lg text-slate-100">{post.hook}</h3>
                                )}
                                <div className="prose prose-sm prose-invert text-slate-300 whitespace-pre-wrap leading-relaxed">
                                    {post.content}
                                </div>
                            </>
                        )}
                        {post.visuals_placeholder && (
                            <div className="p-4 bg-slate-900 rounded-lg border border-dashed border-slate-700 text-sm text-slate-500 italic">
                                📷 {post.visuals_placeholder}
                            </div>
                        )}
                    </div>

                    {/* Actions */}
                    {post.status === 'Draft' && (
                        <div className="p-4 bg-slate-900/30 border-t border-white/5 flex justify-end">
                            <button
                                onClick={() => handleSaveDraft(post.id)}
                                disabled={savingId === post.id}
                                className="bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white px-6 py-2.5 rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center gap-2"
                            >
                                {savingId === post.id ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                {savingId === post.id ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}

                    {post.status === 'Review' && (
                        <div className="p-4 bg-slate-900/30 border-t border-white/5 flex flex-col gap-4">
                            {activeFeedbackId === post.id ? (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                    <textarea
                                        value={feedbackText}
                                        onChange={(e) => setFeedbackText(e.target.value)}
                                        placeholder="What changes would you like to request?"
                                        className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 outline-none focus:border-red-500/50"
                                        autoFocus
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setActiveFeedbackId(null)}
                                            className="text-xs text-slate-400 hover:text-white px-3 py-2"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => handleRequestChanges(post.id)}
                                            className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleApprove(post.id)}
                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold shadow-lg shadow-green-900/20 transition-all active:scale-[0.98]"
                                    >
                                        Approve Content
                                    </button>
                                    <button
                                        onClick={() => { setActiveFeedbackId(post.id); setFeedbackText(''); }}
                                        className="px-6 py-3 border border-slate-700 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 text-slate-400 rounded-lg font-medium transition-colors"
                                    >
                                        Request Changes
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
