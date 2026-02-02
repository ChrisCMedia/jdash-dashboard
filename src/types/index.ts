export type PostStatus = 'Draft' | 'Review' | 'Approved' | 'Posted'
export type Platform = 'LinkedIn Personal' | 'LinkedIn Company'

export interface Post {
    id: string
    date: string // ISO Date string YYYY-MM-DD
    platform: Platform
    content: string
    status: PostStatus
    feedback: string
    created_at: string
}

export type NewPost = Omit<Post, 'id' | 'created_at'>
