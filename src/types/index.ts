export type PostStatus = 'Draft' | 'Review' | 'Approved' | 'Posted'
export type Platform = 'LinkedIn Personal' | 'LinkedIn Company'

export interface Post {
    id: string
    date: string // ISO Date string YYYY-MM-DD
    platform: Platform
    content: string
    hook?: string
    visuals_placeholder?: string
    hashtags?: string
    internal_notes?: string
    client_feedback_history?: string[] // simplified for now
    status: PostStatus
    feedback: string
    created_at: string
}

export type NewPost = Omit<Post, 'id' | 'created_at'>
