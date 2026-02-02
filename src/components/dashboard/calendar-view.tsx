'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { cn } from '@/lib/utils'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, getDay, parseISO } from 'date-fns'
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'

interface CalendarViewProps {
    initialPosts: Post[]
}

const statusStyles = {
    Draft: 'bg-slate-700/50 border-slate-600 text-slate-300',
    Review: 'bg-gold-500/20 border-gold-500/50 text-gold-500',
    Approved: 'bg-green-500/20 border-green-500/50 text-green-500',
    Posted: 'bg-blue-500/20 border-blue-500/50 text-blue-500',
}

import { updatePost } from '@/lib/data-service'
import { PostEditor } from './post-editor'

export function CalendarView({ initialPosts }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [posts, setPosts] = useState(initialPosts)
    const [editingPost, setEditingPost] = useState<Post | null>(null)

    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)

    const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

    // Calculate padding days for the grid (starts on Sunday)
    const startDay = getDay(firstDayOfMonth)
    const paddingDays = Array.from({ length: startDay })

    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))

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
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault() // Allow drop
    }

    const onDrop = async (e: React.DragEvent, targetDate: Date) => {
        e.preventDefault()
        const postId = e.dataTransfer.getData('text/plain')
        if (!postId) return

        const dateString = format(targetDate, 'yyyy-MM-dd')

        // Optimistic Update
        setPosts(posts.map(p => p.id === postId ? { ...p, date: dateString } : p))

        // API Call
        await onUpdate(postId, { date: dateString })
    }

    return (
        <>
            <div className="bg-slate-950 border border-gold-900/20 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gold-900/10 bg-slate-900/50">
                    <h2 className="text-2xl font-serif font-bold text-slate-100">
                        {format(currentDate, 'MMMM yyyy')}
                    </h2>
                    <div className="flex items-center gap-2">
                        <button onClick={prevMonth} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={nextMonth} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Days Header */}
                <div className="grid grid-cols-7 border-b border-gold-900/10 bg-slate-900/30">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 auto-rows-[140px] bg-slate-900/20">
                    {/* Padding Days */}
                    {paddingDays.map((_, i) => (
                        <div key={`padding-${i}`} className="border-b border-r border-gold-900/5 bg-slate-950/30" />
                    ))}

                    {/* Actual Days */}
                    {days.map(day => {
                        const dayPosts = posts.filter(p => isSameDay(parseISO(p.date), day))
                        const isToday = isSameDay(day, new Date())

                        return (
                            <div
                                key={day.toISOString()}
                                onDragOver={onDragOver}
                                onDrop={(e) => onDrop(e, day)}
                                className={cn("p-2 border-b border-r border-gold-900/5 relative group transition-colors hover:bg-slate-900/40", isToday && "bg-gold-500/5")}
                            >
                                <div className={cn("text-xs font-medium mb-2", isToday ? "text-gold-500" : "text-slate-500 group-hover:text-slate-300")}>
                                    {format(day, 'd')}
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    {dayPosts.map(post => (
                                        <div
                                            key={post.id}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, post.id)}
                                            onClick={() => setEditingPost(post)}
                                            className={cn("text-[10px] px-2 py-1.5 rounded border truncate cursor-pointer transition-transform hover:-translate-y-0.5 active:opacity-50", statusStyles[post.status])}
                                        >
                                            <div className="flex items-center gap-1.5 mb-0.5 opacity-70">
                                                <Linkedin className="w-2.5 h-2.5" />
                                                <span className="font-semibold">{format(parseISO(post.date), 'HH:mm')}</span>
                                            </div>
                                            <span className="font-medium truncate">{post.hook || post.content}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
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
