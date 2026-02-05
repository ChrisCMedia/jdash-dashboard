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
    updated_at?: string
    last_edited_by?: string
    image_url?: string
}

export interface Settings {
    appTitle: string
    logoUrl?: string
    linkedinProfileUrl: string
    linkedinCompanyUrl: string
    notifyOnFeedback: boolean
    notifyOnApproval: boolean
}

export interface AnalyticsMetric {
    id: string
    date: string
    impressions: number
    engagements: number
    new_followers: number
    platform: 'Personal' | 'Company'
}

export type NewPost = Omit<Post, 'id' | 'created_at'>
