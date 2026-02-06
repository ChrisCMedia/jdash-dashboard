import { Post, AnalyticsMetric, Settings } from '@/types'
import { supabase } from './supabase'

// Fallback data if Supabase is empty or connection fails
const MOCK_POSTS: Post[] = [
    {
        id: '1',
        platform: 'LinkedIn Personal',
        date: '2026-02-12',
        status: 'Draft',
        hook: 'Why most asset managers fail at scaling...',
        content: 'It creates a bottleneck. \n\nThe traditional model relies too heavily on manual oversight. When you digitize the workflow, you regain 40% of your week.\n\n#AssetManagement #PropTech',
        visuals_placeholder: 'Chart showing time saved vs. portfolio growth',
        hashtags: '#AssetManagement #PropTech #Scaling',
        internal_notes: 'Focus on pain points of mid-sized firms.',
        last_edited_by: 'Christopher',
        created_at: new Date().toISOString(),
        feedback: ''
    },
    {
        id: '2',
        platform: 'LinkedIn Company',
        date: '2026-02-14',
        status: 'Review',
        hook: 'New Partnership Announcement 🚀',
        content: 'We are thrilled to announce our collaboration with TechEstate.\n\nTogether, we are redefining how data drives real estate decisions.',
        visuals_placeholder: 'Photo of the signing ceremony',
        hashtags: '#Partnership #RealEstate #Innovation',
        last_edited_by: 'Judith',
        feedback: 'Please check the company tagging.',
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        platform: 'LinkedIn Personal',
        date: '2026-02-18',
        status: 'Approved',
        hook: 'My top 3 learnings from Expo Real',
        content: '1. Sustainability is no longer optional.\n2. AI is entering the construction phase.\n3. Networking is still king.\n\nWhat was your key takeaway?',
        hashtags: '#ExpoReal #RealEstate #Learnings',
        last_edited_by: 'Christopher',
        created_at: new Date().toISOString(),
        feedback: ''
    }
]

const DEFAULT_SETTINGS: Settings = {
    appTitle: 'YT Content Cockpit',
    linkedinProfileUrl: '',
    linkedinCompanyUrl: '',
    notifyOnFeedback: true,
    notifyOnApproval: true
}

export async function getPosts(): Promise<Post[]> {
    if (!supabase) return MOCK_POSTS

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching posts:', error)
        return MOCK_POSTS
    }

    if (!data || data.length === 0) return MOCK_POSTS

    return data as Post[]
}

export async function updatePost(id: string, updates: Partial<Post>): Promise<Post | null> {
    // Optimistic update for UI if no Supabase
    if (!supabase) {
        console.log('Mock update:', id, updates)
        return null
    }

    const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating post:', error)
        return null
    }

    return data as Post
}

export async function getAnalyticsMetrics(): Promise<AnalyticsMetric[]> {
    if (!supabase) {
        return [
            {
                id: '1',
                date: '2024-01-01',
                impressions: 124500,
                engagements: 5800,
                new_followers: 840,
                platform: 'Personal'
            } as unknown as AnalyticsMetric
        ]
    }

    const { data, error } = await supabase
        .from('analytics_metrics')
        .select('*')
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching analytics:', error)
        return []
    }

    return data as AnalyticsMetric[]
}

export async function getSettings(): Promise<Settings> {
    if (!supabase) return DEFAULT_SETTINGS

    const { data, error } = await supabase
        .from('settings')
        .select('*')
        .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error('Error fetching settings:', error)
        return DEFAULT_SETTINGS
    }

    if (!data) return DEFAULT_SETTINGS

    return data as Settings
}

export async function updateSettings(settings: Settings): Promise<Settings | null> {
    if (!supabase) {
        console.log('Mock settings update:', settings)
        return settings
    }

    // Upsert expects an ID usually, but here we assume a single row singleton pattern
    // We'll assume ID 1 for the singleton settings row
    const { data, error } = await supabase
        .from('settings')
        .upsert({ id: 1, ...settings })
        .select()
        .single()

    if (error) {
        console.error('Error updating settings:', error)
        return null
    }

    return data as Settings
}

export async function deletePost(id: string): Promise<boolean> {
    if (!supabase) {
        console.log('Mock delete:', id)
        return true
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting post:', error)
        return false
    }

    return true
}

export async function createPost(post: Partial<Post>): Promise<Post | null> {
    if (!supabase) {
        console.log('Mock create:', post)
        return { ...post, id: Math.random().toString(), date: new Date().toISOString() } as Post
    }

    const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select()
        .single()

    if (error) {
        console.error('Error creating post:', error)
        return null
    }

    return data as Post
}
