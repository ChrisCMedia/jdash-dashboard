'use client'

import { useState } from 'react'
import { Post, PostStatus } from '@/types'
import { cn } from '@/lib/utils'
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay, getDay, parseISO } from 'date-fns'
import { de } from 'date-fns/locale'
import { ChevronLeft, ChevronRight, Linkedin } from 'lucide-react'
import { updatePost } from '@/lib/data-service'
import { PostEditor } from './post-editor'
import { useAuth } from '@/components/providers/auth-provider'

interface CalendarViewProps {
    initialPosts: Post[]
}

const statusStyles = {
    Draft: 'bg-slate-800/50 border-slate-700 text-silver-400 hover:border-silver-500',
    Review: 'bg-gold-500/10 border-gold-500/30 text-gold-400 hover:border-gold-500/60 shadow-[0_0_12px_rgba(212,175,55,0.1)]',
    Approved: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:border-emerald-500/60',
    Posted: 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:border-blue-500/60',
}

export function CalendarView({ initialPosts }: CalendarViewProps) {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [posts, setPosts] = useState(initialPosts)
    const [editingPost, setEditingPost] = useState<Post | null>(null)
    const [dragOverDate, setDragOverDate] = useState<Date | null>(null)
    const { role } = useAuth()

    const firstDayOfMonth = startOfMonth(currentDate)
    const lastDayOfMonth = endOfMonth(currentDate)
    const days = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })
    const startDay = getDay(firstDayOfMonth)
    // Adjust for Monday start: (0=Sun, 1=Mon...6=Sat) -> Mon=0...Sun=6
    // Need: Mon(1)->0, Tue(2)->1... Sat(6)->5, Sun(0)->6
    const padding = (startDay + 6) % 7
    const paddingDays = Array.from({ length: padding })

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
        e.dataTransfer.effectAllowed = 'move'
    }

    const onDragOver = (e: React.DragEvent, day: Date) => {
        e.preventDefault()
        setDragOverDate(day)
    }

    const onDragLeave = () => {
        setDragOverDate(null)
    }

    const onDrop = async (e: React.DragEvent, targetDate: Date) => {
        e.preventDefault()
        setDragOverDate(null)
        const postId = e.dataTransfer.getData('text/plain')
        if (!postId) return
        const dateString = format(targetDate, 'yyyy-MM-dd')
        setPosts(posts.map(p => p.id === postId ? { ...p, date: dateString } : p))
        await onUpdate(postId, { date: dateString })
    }

    return (
        <>
            <div className="glass-card rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 glass">
                    <h2 className="text-2xl font-serif font-bold text-gradient-gold capitalize">
                        {format(currentDate, 'MMMM yyyy', { locale: de })}
                    </h2>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={prevMonth}
                            className="p-2.5 hover:bg-white/5 rounded-xl text-silver-400 hover:text-silver-100 transition-all duration-300 hover-lift"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2.5 hover:bg-white/5 rounded-xl text-silver-400 hover:text-silver-100 transition-all duration-300 hover-lift"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-b border-white/5 glass-subtle">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(day => (
                        <div key={day} className="py-3 text-center text-xs font-medium text-silver-500 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-7 auto-rows-[140px]">
                    {/* Padding Days */}
                    {paddingDays.map((_, i) => (
                        <div key={`padding-${i}`} className="border-b border-r border-white/[0.03] bg-slate-950/50" />
                    ))}

                    {/* Actual Days */}
                    {days.map((day, index) => {
                        const dayPosts = posts.filter(p => isSameDay(parseISO(p.date), day))
                        const isToday = isSameDay(day, new Date())
                        const isDragOver = dragOverDate && isSameDay(dragOverDate, day)

                        return (
                            <div
                                key={day.toISOString()}
                                onDragOver={(e) => onDragOver(e, day)}
                                onDragLeave={onDragLeave}
                                onDrop={(e) => onDrop(e, day)}
                                className={cn(
                                    "p-2 border-b border-r border-white/[0.03] relative transition-all duration-300",
                                    isToday && "bg-gold-500/5",
                                    isDragOver && "bg-gold-500/10 border-gold-500/30",
                                    !isToday && !isDragOver && "hover:bg-white/[0.02]"
                                )}
                            >
                                <div className={cn(
                                    "text-xs font-medium mb-2 transition-colors",
                                    isToday ? "text-gold-500" : "text-silver-600"
                                )}>
                                    {isToday ? (
                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gold-500 text-slate-950 font-bold">
                                            {format(day, 'd')}
                                        </span>
                                    ) : format(day, 'd')}
                                </div>

                                <div className="flex flex-col gap-1.5 overflow-hidden">
                                    {dayPosts.map(post => (
                                        <div
                                            key={post.id}
                                            draggable
                                            onDragStart={(e) => onDragStart(e, post.id)}
                                            onClick={() => setEditingPost(post)}
                                            className={cn(
                                                "text-[10px] px-2 py-1.5 rounded-lg border cursor-pointer transition-all duration-200",
                                                "hover:-translate-y-0.5 hover:shadow-lg active:scale-95",
                                                statusStyles[post.status]
                                            )}
                                        >
                                            <div className="flex items-center gap-1.5 mb-0.5 opacity-70">
                                                <Linkedin className="w-2.5 h-2.5" />
                                                <span className="font-semibold">{post.platform === 'LinkedIn Personal' ? 'Personal' : 'Company'}</span>
                                            </div>
                                            <span className="font-medium truncate block">{post.hook || post.content.slice(0, 40)}</span>
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
                readOnly={role === 'client'}
            />
        </>
    )
}
