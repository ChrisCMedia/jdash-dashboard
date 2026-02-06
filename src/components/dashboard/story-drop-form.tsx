'use client'

import { useState } from 'react'
import { createPost } from '@/lib/data-service'
import { Platform } from '@/types'
import { cn } from '@/lib/utils'
import { Upload, Plus, Loader2, Sparkles, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function StoryDropForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [topic, setTopic] = useState('')
    const [points, setPoints] = useState('')
    const [visuals, setVisuals] = useState('')
    const [platform, setPlatform] = useState<Platform>('LinkedIn Personal')
    const [dragActive, setDragActive] = useState(false)
    const [mockFiles, setMockFiles] = useState<string[]>([])

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Mock handling: just take the names
            const newFiles = Array.from(e.dataTransfer.files).map(f => f.name)
            setMockFiles(prev => [...prev, ...newFiles])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Combine visuals description with mock file names
            const visualsContent = [visuals, ...mockFiles.map(f => `[File: ${f}]`)].filter(Boolean).join('\n')

            await createPost({
                hook: topic,
                content: points,
                visuals_placeholder: visualsContent,
                platform,
                status: 'Draft',
                date: new Date().toISOString(),
                created_at: new Date().toISOString(),
                last_edited_by: 'Client' // Assuming client uses this mostly
            })

            // Reset form
            setTopic('')
            setPoints('')
            setVisuals('')
            setMockFiles([])

            // Redirect or show success
            router.push('/')
            router.refresh()

        } catch (error) {
            console.error('Failed to create story drop:', error)
        } finally {
            setLoading(false)
        }
    }

    const removeFile = (index: number) => {
        setMockFiles(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">

            {/* Platform Selection */}
            <div className="grid grid-cols-2 gap-4">
                {(['LinkedIn Personal', 'LinkedIn Company'] as Platform[]).map((p) => (
                    <button
                        key={p}
                        type="button"
                        onClick={() => setPlatform(p)}
                        className={cn(
                            "p-4 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2",
                            platform === p
                                ? "bg-gold-500/10 border-gold-500 text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                                : "glass-subtle border-white/5 text-silver-400 hover:border-gold-500/30 hover:text-silver-200"
                        )}
                    >
                        {p}
                    </button>
                ))}
            </div>

            {/* Main Inputs */}
            <div className="space-y-6 glass-card p-6 rounded-2xl border border-white/5">

                {/* Topic / Hook */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-silver-400 uppercase tracking-wider pl-1">
                        Topic / Headache / Working Title
                    </label>
                    <input
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. The issue with modern asset management..."
                        className="w-full px-4 py-3 bg-slate-900/50 rounded-xl border border-white/5 outline-none text-silver-100 placeholder:text-silver-700 focus:border-gold-500/50 transition-colors"
                    />
                </div>

                {/* Content / Points */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-silver-400 uppercase tracking-wider pl-1">
                        Brain Dump / Key Points
                    </label>
                    <textarea
                        value={points}
                        onChange={(e) => setPoints(e.target.value)}
                        placeholder="• Point 1&#10;• Point 2&#10;• Rough idea..."
                        className="w-full px-4 py-3 bg-slate-900/50 rounded-xl border border-white/5 outline-none text-silver-100 placeholder:text-silver-700 focus:border-gold-500/50 transition-colors min-h-[150px] leading-relaxed resize-none"
                    />
                </div>

                {/* Visuals Dropzone */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-silver-400 uppercase tracking-wider pl-1">
                        Visuals & Assets
                    </label>

                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={cn(
                            "relative w-full h-40 rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center gap-3",
                            dragActive
                                ? "border-gold-500 bg-gold-500/10 scale-[1.02]"
                                : "border-white/10 bg-slate-900/30 hover:border-gold-500/30 hover:bg-slate-900/50"
                        )}
                    >
                        <div className="p-3 rounded-full bg-white/5">
                            <Upload className="w-5 h-5 text-silver-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm text-silver-300 font-medium">
                                Drop images here
                            </p>
                            <p className="text-xs text-silver-600 mt-1">
                                or describe your visual idea below
                            </p>
                        </div>
                    </div>

                    {/* Visual Description Input */}
                    <input
                        value={visuals}
                        onChange={(e) => setVisuals(e.target.value)}
                        placeholder="Or describe the visual (e.g. 'Photo of the new office')..."
                        className="w-full px-4 py-3 bg-slate-900/50 rounded-xl border border-white/5 outline-none text-sm text-silver-100 placeholder:text-silver-700 focus:border-gold-500/50 transition-colors"
                    />

                    {/* File List */}
                    {mockFiles.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {mockFiles.map((file, idx) => (
                                <div key={idx} className="flex items-center gap-2 pl-3 pr-2 py-1.5 bg-gold-500/10 border border-gold-500/20 rounded-lg text-xs text-gold-200">
                                    <span className="truncate max-w-[150px]">{file}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(idx)}
                                        className="p-0.5 hover:bg-gold-500/20 rounded transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>

            {/* Action Bar */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading || (!topic && !points)}
                    className={cn(
                        "px-8 py-3 bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-gold-500/20 flex items-center gap-2 transition-all duration-300",
                        loading || (!topic && !points)
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:scale-105 hover:shadow-gold-500/30"
                    )}
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Sparkles className="w-5 h-5" />
                    )}
                    {loading ? 'Dropping...' : 'Drop Story'}
                </button>
            </div>
        </form>
    )
}
