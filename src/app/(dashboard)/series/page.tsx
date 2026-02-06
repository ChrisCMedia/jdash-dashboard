'use client'

import { useState, useEffect } from 'react'
import { Series, Post } from '@/types'
import { getSeries, createSeries, deleteSeries, getPostsBySeries, getPosts } from '@/lib/data-service'
import { cn } from '@/lib/utils'
import {
    Layers,
    Plus,
    Trash2,
    ChevronRight,
    FileText,
    X,
    Palette,
    ArrowLeft
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { PostCard } from '@/components/dashboard/post-card'
import { updatePost } from '@/lib/data-service'

// Preset colors for series
const PRESET_COLORS = [
    '#D4AF37', // Gold
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#F59E0B', // Amber
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#EF4444', // Red
]

export default function SeriesPage() {
    const [seriesList, setSeriesList] = useState<Series[]>([])
    const [allPosts, setAllPosts] = useState<Post[]>([])
    const [selectedSeries, setSelectedSeries] = useState<Series | null>(null)
    const [seriesPosts, setSeriesPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCreateOpen, setIsCreateOpen] = useState(false)

    // Create form state
    const [newTitle, setNewTitle] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newColor, setNewColor] = useState(PRESET_COLORS[0])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setIsLoading(true)
        const [series, posts] = await Promise.all([getSeries(), getPosts()])
        setSeriesList(series)
        setAllPosts(posts)
        setIsLoading(false)
    }

    const handleSelectSeries = async (series: Series) => {
        setSelectedSeries(series)
        // Get posts that belong to this series
        const postsInSeries = allPosts.filter(p => p.series_id === series.id)
        setSeriesPosts(postsInSeries)
    }

    const handleCreateSeries = async () => {
        if (!newTitle.trim()) return

        const created = await createSeries({
            title: newTitle,
            description: newDescription,
            color: newColor
        })

        if (created) {
            setSeriesList(prev => [created, ...prev])
            setNewTitle('')
            setNewDescription('')
            setNewColor(PRESET_COLORS[0])
            setIsCreateOpen(false)
        }
    }

    const handleDeleteSeries = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        if (confirm('Are you sure you want to delete this series? Posts will be unassigned but not deleted.')) {
            const success = await deleteSeries(id)
            if (success) {
                setSeriesList(prev => prev.filter(s => s.id !== id))
                if (selectedSeries?.id === id) {
                    setSelectedSeries(null)
                    setSeriesPosts([])
                }
            }
        }
    }

    const handlePostUpdate = async (id: string, updates: Partial<Post>) => {
        await updatePost(id, updates)
        // Refresh data
        const posts = await getPosts()
        setAllPosts(posts)
        if (selectedSeries) {
            setSeriesPosts(posts.filter(p => p.series_id === selectedSeries.id))
        }
    }

    const getPostCountForSeries = (seriesId: string) => {
        return allPosts.filter(p => p.series_id === seriesId).length
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-12 h-12 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-silver-400">Loading content series...</p>
                </div>
            </div>
        )
    }

    // Detail view for selected series
    if (selectedSeries) {
        return (
            <div className="animate-fade-in-up space-y-6">
                {/* Back button and header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => {
                            setSelectedSeries(null)
                            setSeriesPosts([])
                        }}
                        className="p-2 rounded-xl glass-subtle hover:bg-white/5 transition-colors text-silver-400 hover:text-silver-100"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                            style={{ backgroundColor: selectedSeries.color + '20' }}
                        >
                            <Layers className="w-5 h-5" style={{ color: selectedSeries.color }} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-gradient-gold">
                                {selectedSeries.title}
                            </h1>
                            <p className="text-sm text-silver-500">{selectedSeries.description}</p>
                        </div>
                    </div>
                </div>

                {/* Posts in this series */}
                <div className="glass-card rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-serif font-bold text-silver-100">
                            Posts in Series
                        </h2>
                        <span className="text-xs font-mono px-3 py-1 rounded-full bg-gold-500/10 text-gold-400">
                            {seriesPosts.length} posts
                        </span>
                    </div>

                    {seriesPosts.length === 0 ? (
                        <div className="text-center py-12">
                            <FileText className="w-12 h-12 text-silver-700 mx-auto mb-4" />
                            <p className="text-silver-500 mb-2">No posts in this series yet</p>
                            <p className="text-silver-600 text-sm">
                                Assign posts to this series from the Post Editor
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {seriesPosts.map(post => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                    onUpdate={handlePostUpdate}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )
    }

    // Grid view of all series
    return (
        <div className="animate-fade-in-up space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gradient-gold flex items-center gap-3">
                        <Layers className="w-8 h-8 text-gold-500" />
                        Content Serien
                    </h1>
                    <p className="text-silver-500 mt-2">
                        Strategische Themenplanung für Ihre LinkedIn-Präsenz
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <Plus className="w-4 h-4" />
                    New Series
                </Button>
            </div>

            {/* Series Grid */}
            {seriesList.length === 0 ? (
                <div className="glass-card rounded-2xl p-12 text-center border border-white/5">
                    <div className="w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center mx-auto mb-4">
                        <Layers className="w-8 h-8 text-gold-500" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-silver-100 mb-2">
                        No Content Series Yet
                    </h3>
                    <p className="text-silver-500 mb-6 max-w-md mx-auto">
                        Create your first content series to organize posts by theme and track your content strategy.
                    </p>
                    <Button
                        onClick={() => setIsCreateOpen(true)}
                        className="btn-primary"
                    >
                        Create Your First Series
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {seriesList.map((series, index) => {
                        const postCount = getPostCountForSeries(series.id)

                        return (
                            <div
                                key={series.id}
                                onClick={() => handleSelectSeries(series)}
                                className={cn(
                                    "group relative glass-card rounded-2xl p-6 cursor-pointer transition-all duration-300",
                                    "border border-white/5 hover:border-gold-500/30",
                                    "hover:shadow-lg hover:shadow-gold-500/5 hover:-translate-y-1",
                                    `animate-fade-in-up stagger-${Math.min(index + 1, 5)}`
                                )}
                            >
                                {/* Color accent bar */}
                                <div
                                    className="absolute top-0 left-6 right-6 h-1 rounded-b-full opacity-60 group-hover:opacity-100 transition-opacity"
                                    style={{ backgroundColor: series.color }}
                                />

                                {/* Delete button */}
                                <button
                                    onClick={(e) => handleDeleteSeries(series.id, e)}
                                    className="absolute top-4 right-4 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                    style={{ backgroundColor: series.color + '15' }}
                                >
                                    <Layers className="w-6 h-6" style={{ color: series.color }} />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-serif font-bold text-silver-100 mb-2 pr-8">
                                    {series.title}
                                </h3>
                                <p className="text-sm text-silver-500 line-clamp-2 mb-4">
                                    {series.description || 'No description'}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-silver-500">
                                        <FileText className="w-3.5 h-3.5" />
                                        <span>{postCount} {postCount === 1 ? 'post' : 'posts'}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gold-500 group-hover:text-gold-400 transition-colors">
                                        <span>View</span>
                                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {/* Create Series Dialog */}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="max-w-lg bg-slate-950 border-gold-900/20 glass">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif font-bold text-gradient-gold">
                            Create New Series
                        </DialogTitle>
                        <p className="text-silver-500 text-sm">
                            Define a new content theme to organize your posts strategically.
                        </p>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">
                                Series Title
                            </Label>
                            <Input
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                placeholder="e.g., Thought Leadership, Weekly Tips..."
                                className="bg-slate-900/50 border-white/5 text-silver-100 focus:border-gold-500/30 h-12"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gold-500">
                                Description
                            </Label>
                            <Textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="What type of content belongs in this series?"
                                className="bg-slate-900/50 border-white/5 text-silver-200 focus:border-gold-500/30 min-h-[100px]"
                            />
                        </div>

                        <div className="space-y-3">
                            <Label className="text-xs font-bold uppercase tracking-widest text-gold-500 flex items-center gap-2">
                                <Palette className="w-3.5 h-3.5" />
                                Theme Color
                            </Label>
                            <div className="flex gap-3 flex-wrap">
                                {PRESET_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setNewColor(color)}
                                        className={cn(
                                            "w-10 h-10 rounded-xl transition-all duration-200 relative",
                                            newColor === color && "ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-110"
                                        )}
                                        style={{ backgroundColor: color }}
                                    >
                                        {newColor === color && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-2 h-2 rounded-full bg-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsCreateOpen(false)}
                            className="border-white/5 text-silver-400 hover:bg-white/5"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCreateSeries}
                            disabled={!newTitle.trim()}
                            className="btn-primary"
                        >
                            Create Series
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
