'use client'

import { useState, useEffect } from 'react'
import { Post, PostStatus, Series } from '@/types'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { LinkedInPreview } from './linkedin-preview'
import { supabase } from '@/lib/supabase'
import { getSeries } from '@/lib/data-service'
import { format } from 'date-fns'
import { Upload, Loader2, Save, X, Calendar, User, Clock, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PostEditorProps {
    post: Post | null
    isOpen: boolean
    onClose: () => void
    onSave: (id: string, updates: Partial<Post>) => void
    readOnly?: boolean
}

export function PostEditor({ post, isOpen, onClose, onSave, readOnly }: PostEditorProps) {
    const [hook, setHook] = useState('')
    const [content, setContent] = useState('')
    const [visuals, setVisuals] = useState('')
    const [hashtags, setHashtags] = useState('')
    const [notes, setNotes] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [currentUser, setCurrentUser] = useState('Christopher')
    const [seriesId, setSeriesId] = useState<string | null>(null)
    const [seriesList, setSeriesList] = useState<Series[]>([])

    useEffect(() => {
        loadSeries()
    }, [])

    useEffect(() => {
        if (post) {
            setHook(post.hook || '')
            setContent(post.content || '')
            setVisuals(post.visuals_placeholder || '')
            setHashtags(post.hashtags || '')
            setNotes(post.internal_notes || '')
            setImageUrl(post.image_url || '')
            setSeriesId(post.series_id || null)
            if (post.last_edited_by) setCurrentUser(post.last_edited_by)
        }
    }, [post])

    const loadSeries = async () => {
        const series = await getSeries()
        setSeriesList(series)
    }

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (readOnly) return
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            if (!supabase) {
                const objectUrl = URL.createObjectURL(file)
                setImageUrl(objectUrl)
                return
            }

            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('post-images')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage
                .from('post-images')
                .getPublicUrl(filePath)

            setImageUrl(data.publicUrl)
        } catch (error) {
            console.error('Error uploading image:', error)
        } finally {
            setIsUploading(false)
        }
    }

    const handleSave = () => {
        if (!post || readOnly) return
        onSave(post.id, {
            hook,
            content,
            visuals_placeholder: visuals,
            hashtags,
            internal_notes: notes,
            image_url: imageUrl,
            series_id: seriesId || undefined,
            last_edited_by: currentUser,
            updated_at: new Date().toISOString()
        })
        onClose()
    }

    if (!post) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl h-[90vh] p-0 flex flex-col bg-slate-950 border-gold-900/20 glass overflow-hidden">
                <DialogHeader className="p-6 border-b border-white/5 flex flex-row items-center justify-between">
                    <div>
                        <DialogTitle className="text-2xl font-serif font-bold text-gradient-gold">
                            {readOnly ? 'View Content Piece' : 'Edit Content Piece'}
                        </DialogTitle>
                        <p className="text-silver-500 text-sm mt-1">Refine your message and visuals for maximum impact.</p>
                    </div>
                    <div className="flex items-center gap-4 px-4 py-2 glass-subtle rounded-xl">
                        <div className="flex items-center gap-2 text-xs text-silver-400">
                            <Calendar className="w-3.5 h-3.5 text-gold-500" />
                            {format(new Date(post.date), 'PPPP')}
                        </div>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-2 text-xs text-silver-400">
                            <User className="w-3.5 h-3.5 text-gold-500" />
                            Editor: {currentUser}
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Editor Form */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">The Hook</Label>
                                    <Input
                                        value={hook}
                                        onChange={(e) => setHook(e.target.value)}
                                        placeholder="Stop them mid-scroll..."
                                        disabled={readOnly}
                                        className="bg-slate-900/50 border-white/5 text-silver-100 focus:border-gold-500/30 transition-all h-12 disabled:opacity-70 disabled:cursor-not-allowed"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">Core Content</Label>
                                    <Textarea
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Deliver the value..."
                                        disabled={readOnly}
                                        className="bg-slate-900/50 border-white/5 text-silver-200 focus:border-gold-500/30 transition-all min-h-[250px] leading-relaxed disabled:opacity-70 disabled:cursor-not-allowed"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">Hashtags</Label>
                                    <Input
                                        value={hashtags}
                                        onChange={(e) => setHashtags(e.target.value)}
                                        placeholder="#realestate #assetmanagement..."
                                        disabled={readOnly}
                                        className="bg-slate-900/50 border-white/5 text-gold-400/80 focus:border-gold-500/30 disabled:opacity-70 disabled:cursor-not-allowed"
                                    />
                                </div>

                                {/* Series Selector */}
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gold-500 flex items-center gap-2">
                                        <Layers className="w-3.5 h-3.5" />
                                        Content Series
                                    </Label>
                                    <select
                                        value={seriesId || ''}
                                        onChange={(e) => setSeriesId(e.target.value || null)}
                                        disabled={readOnly}
                                        className={cn(
                                            "w-full bg-slate-900/50 border border-white/5 text-silver-100 rounded-lg px-4 py-3",
                                            "focus:border-gold-500/30 focus:outline-none focus:ring-1 focus:ring-gold-500/20",
                                            "disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                                        )}
                                    >
                                        <option value="" className="bg-slate-900">No Series</option>
                                        {seriesList.map(series => (
                                            <option
                                                key={series.id}
                                                value={series.id}
                                                className="bg-slate-900"
                                            >
                                                {series.title}
                                            </option>
                                        ))}
                                    </select>
                                    {seriesId && (
                                        <div className="flex items-center gap-2 text-xs text-silver-500">
                                            <div
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: seriesList.find(s => s.id === seriesId)?.color }}
                                            />
                                            <span>Part of &quot;{seriesList.find(s => s.id === seriesId)?.title}&quot;</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-white/5">
                                <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">Visual Assets</Label>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="relative group">
                                        <div className={cn(
                                            "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-all duration-300",
                                            imageUrl ? "border-gold-500/30 bg-gold-500/5" : "border-white/5 hover:border-gold-500/20 bg-white/2"
                                        )}>
                                            {imageUrl ? (
                                                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                                                    <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover" />
                                                    {!readOnly && (
                                                        <button
                                                            onClick={() => setImageUrl('')}
                                                            className="absolute top-2 right-2 p-1.5 bg-slate-950/80 rounded-lg text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-center group-hover:scale-105 transition-transform duration-300">
                                                    {isUploading ? (
                                                        <Loader2 className="w-10 h-10 text-gold-500 animate-spin mx-auto mb-4" />
                                                    ) : (
                                                        <Upload className="w-10 h-10 text-silver-600 mx-auto mb-4" />
                                                    )}
                                                    <p className="text-silver-400 font-medium">{isUploading ? 'Uploading asset...' : (readOnly ? 'No asset uploaded' : 'Drag & drop image')}</p>
                                                    {!readOnly && <p className="text-silver-600 text-xs mt-1">PNG, JPG up to 10MB</p>}
                                                    {!readOnly && (
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageUpload}
                                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                                            disabled={isUploading}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Input
                                        value={visuals}
                                        onChange={(e) => setVisuals(e.target.value)}
                                        placeholder="Visual notes/instructions..."
                                        disabled={readOnly}
                                        className="bg-slate-900/50 border-white/5 text-silver-300 text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            {!readOnly && (
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">Internal Notes</Label>
                                    <Textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Strategy or context notes..."
                                        className="bg-slate-900/50 border-white/5 text-silver-400 text-xs min-h-[80px]"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Preview */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs font-bold uppercase tracking-widest text-silver-400">Live Preview (Mobile Wide)</Label>
                                <div className="flex items-center gap-2 glass-subtle px-3 py-1 rounded-full text-[10px] text-silver-500 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    Synchronized
                                </div>
                            </div>
                            <div className="sticky top-0">
                                <LinkedInPreview post={{ ...post, hook, content, visuals_placeholder: visuals, image_url: imageUrl }} />
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-6 border-t border-white/5 glass-subtle">
                    <div className="flex-1 flex items-center gap-6 text-xs text-silver-600">
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Created: {format(new Date(post.created_at || new Date()), 'MMM d, yyyy HH:mm')}
                        </div>
                        {post.updated_at && (
                            <div className="flex items-center gap-1.5 text-gold-500/60 font-medium">
                                <Save className="w-3.5 h-3.5" />
                                Last Update: {format(new Date(post.updated_at), 'MMM d, HH:mm')} by {post.last_edited_by}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose} className="border-white/5 text-silver-400 hover:bg-white/5 hover:text-silver-200 px-6 font-medium">
                            {readOnly ? 'Close' : 'Discard'}
                        </Button>
                        {!readOnly && (
                            <Button onClick={handleSave} className="btn-primary flex items-center gap-2 group">
                                Validate & Sync
                                <Save className="w-4 h-4 transition-transform group-hover:scale-110" />
                            </Button>
                        )}
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
