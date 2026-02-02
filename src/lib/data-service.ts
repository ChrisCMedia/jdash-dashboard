
import { supabase } from './supabase'
import type { Post, NewPost, PostStatus } from '@/types'

// Mock Data
const MOCK_POSTS: Post[] = [
    {
        id: '1',
        date: '2026-02-02', // KW06 - Monday
        platform: 'LinkedIn Company',
        content: 'Markt-Update: Interest rates have stabilized this week, creating new opportunities for buyers...\n\n#RealEstate #MarketUpdate',
        hook: 'Are interest rates finally stabilizing?',
        visuals_placeholder: 'Chart showing interest rate trends over last 6 months.',
        hashtags: '#RealEstate #MarketUpdate #InterestRates',
        internal_notes: 'Check with finance team on exact percentage.',
        status: 'Draft',
        feedback: '',
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        date: '2026-02-04', // KW06 - Wednesday
        platform: 'LinkedIn Personal',
        content: 'Visited a new construction site today. The progress is amazing! Check out these views.\n\n#Construction #Architecture',
        hook: 'The view from the top is breathtaking.',
        visuals_placeholder: 'Selfie with hard hat + panoramic view of site.',
        hashtags: '#Construction #Architecture #NewDevelopment',
        internal_notes: '',
        status: 'Review',
        feedback: 'Please add more emojis to the first sentence.',
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        date: '2026-02-09', // KW07
        platform: 'LinkedIn Company',
        content: 'Open House Alert! Join us this weekend for an exclusive tour of our new luxury listings.',
        hook: 'Your dream home is waiting.',
        visuals_placeholder: 'Carousel of 5 best photos of the property.',
        hashtags: '#OpenHouse #LuxuryLiving',
        internal_notes: 'Make sure photos are high res.',
        status: 'Approved',
        feedback: '',
        created_at: new Date().toISOString()
    }
]

export const getPosts = async (): Promise<Post[]> => {
    if (!supabase) {
        console.log('Using Mock Data for getPosts')
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 500))
        // Return mock data, possibly stored in localStorage if we were client-side only for persistent mock,
        // but for SSR/Server Actions, we return static mock or database.
        return MOCK_POSTS
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    return data as Post[]
}

export const updatePost = async (id: string, updates: Partial<Post>): Promise<Post | null> => {
    if (!supabase) {
        console.log('Using Mock Data for updatePost', id, updates)
        await new Promise(resolve => setTimeout(resolve, 300))
        const index = MOCK_POSTS.findIndex(p => p.id === id)
        if (index === -1) return null
        MOCK_POSTS[index] = { ...MOCK_POSTS[index], ...updates }
        return MOCK_POSTS[index]
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

export const createPost = async (post: NewPost): Promise<Post | null> => {
    if (!supabase) {
        // ... mock creation ...
        return null
    }
    const { data, error } = await supabase
        .from('posts')
        .insert(post)
        .select()
        .single()

    if (error) return null
    return data as Post
}
