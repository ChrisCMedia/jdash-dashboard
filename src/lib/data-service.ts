import { Post, AnalyticsMetric, Settings, Series } from '@/types'
import { supabase } from './supabase'

// Fallback data if Supabase is empty or connection fails
const MOCK_POSTS: Post[] = [
    {
        id: '1',
        platform: 'LinkedIn Company',
        date: '2026-02-10',
        status: 'Approved',
        hook: '📈 Warum ESG heute über den Exit entscheidet.',
        content: 'Früher war "Energieeffizienz" ein Bonus. Heute ist es die Bedingung für Finanzierung und Werterhalt. Bei YOUR TIMES prüfen wir bei jedem neuen Objekt zuerst das energetische Potenzial. 🔍 Ein Asset mit schlechtem ESG-Score ist heute ein Sanierungsfall mit Ansage. Wir zeigen unseren Partnern, wie man Bestandsobjekte zukunftssicher transformiert.',
        hashtags: '#AssetManagement #ESG #Immobilienmarkt #Performance #YOURTIMES',
        internal_notes: 'Serie: The Asset Check - Company-Fokus, Expertise in technischen Details',
        last_edited_by: 'Christopher',
        created_at: new Date().toISOString(),
        feedback: '',
        series_id: 'series-1'
    },
    {
        id: '2',
        platform: 'LinkedIn Personal',
        date: '2026-02-12',
        status: 'Review',
        hook: '🏗️ Gute Entscheidungen brauchen Staub an den Schuhen.',
        content: 'Manche Dinge lassen sich nicht per Zoom-Call lösen. Wer komplexe Projekte wirklich verstehen will, muss vor Ort sein. 🤩 Ich liebe den Austausch mit den Gewerken direkt auf der Fläche. Hier spürt man die Dynamik und löst Probleme, bevor sie zum Kostenfaktor werden. Projektentwicklung ist für mich Präsenzpflicht. 💪✨',
        visuals_placeholder: 'Foto von Judith auf der Baustelle',
        hashtags: '#Machertum #BaustellenUpdate #Projektentwicklung #JudithLenz',
        internal_notes: 'Serie: Macher-Mittwoch - Judith-Fokus, Exekutionsstärke zeigen',
        last_edited_by: 'Judith',
        feedback: 'Bitte noch ein aktuelles Foto von der Baustelle einfügen.',
        created_at: new Date().toISOString(),
        series_id: 'series-2'
    },
    {
        id: '3',
        platform: 'LinkedIn Company',
        date: '2026-02-17',
        status: 'Draft',
        hook: '🏥 Warum Senioren-WGs das Investment-Modell der Zukunft sind.',
        content: 'Der Bedarf an ambulant betreuten Wohngemeinschaften wächst rasant. In Projekten wie Biesenthal sehen wir, dass dieses Modell nicht nur gesellschaftlich sinnvoll, sondern wirtschaftlich hochgradig resilient ist. 🌲 Für Investoren bedeutet das: Lange Pachtverträge, bonitätsstarke Betreiber und eine Zielgruppe, die Mietsicherheit garantiert.',
        hashtags: '#HealthcareRealEstate #Seniorenwohnen #Investment #Demografie #YOURTIMES',
        internal_notes: 'Serie: Demografie-Radar - Company-Fokus, Spezialwissen Healthcare',
        last_edited_by: 'Christopher',
        created_at: new Date().toISOString(),
        feedback: '',
        series_id: 'series-3'
    },
    {
        id: '4',
        platform: 'LinkedIn Personal',
        date: '2026-02-19',
        status: 'Draft',
        hook: '🤝 Ein Deal ist nur so stark wie das Vertrauen dahinter.',
        content: 'Diese Woche wurde mir wieder klar: Wir vermitteln keine Steine, wir moderieren Übergänge. ❤️ Ein erfolgreicher Abschluss ("Deal Closed!") ist das Ergebnis von Monaten der Beziehungsarbeit. Wenn Käufer und Verkäufer sich am Ende mit einem Lächeln verabschieden, ist das mein größter Erfolg. 🥂✨',
        visuals_placeholder: 'Foto vom Deal Closing oder Handshake',
        hashtags: '#PeopleBusiness #Vertrauen #Networking #RealEstateSuccess #JudithLenz',
        internal_notes: 'Serie: The Human Factor - Judith-Fokus, Vertrauen und Netzwerk',
        last_edited_by: 'Judith',
        created_at: new Date().toISOString(),
        feedback: '',
        series_id: 'series-4'
    }
]

const DEFAULT_SETTINGS: Settings = {
    appTitle: 'YT Content Cockpit',
    linkedinProfileUrl: '',
    linkedinCompanyUrl: '',
    notifyOnFeedback: true,
    notifyOnApproval: true
}

// Mock series data for development - YOUR TIMES Content Series
// Defined here so it's available for getPosts function
const MOCK_SERIES: Series[] = [
    {
        id: 'series-1',
        title: 'The Asset Check',
        description: 'Company-Fokus: Expertise in technischen Details und Rendite-Hebeln. ESG, Performance und Asset Management.',
        color: '#D4AF37', // Gold
        created_at: new Date().toISOString()
    },
    {
        id: 'series-2',
        title: 'Macher-Mittwoch',
        description: 'Judith-Fokus: Nah am Geschehen, Exekutionsstärke zeigen. Baustellen-Updates und Projektentwicklung.',
        color: '#F59E0B', // Amber
        created_at: new Date().toISOString()
    },
    {
        id: 'series-3',
        title: 'Demografie-Radar',
        description: 'Company-Fokus: Spezialwissen im Wachstumsmarkt Healthcare Real Estate und Seniorenwohnen.',
        color: '#10B981', // Emerald
        created_at: new Date().toISOString()
    },
    {
        id: 'series-4',
        title: 'The Human Factor',
        description: 'Judith-Fokus: Vertrauen und Netzwerk als Basis für Off-Market Deals. People Business.',
        color: '#EC4899', // Pink
        created_at: new Date().toISOString()
    }
]

export async function getPosts(): Promise<Post[]> {
    if (!supabase) {
        // Populate series data for mock posts
        return MOCK_POSTS.map(post => ({
            ...post,
            series: post.series_id ? MOCK_SERIES.find(s => s.id === post.series_id) : undefined
        }))
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching posts:', error)
        return MOCK_POSTS.map(post => ({
            ...post,
            series: post.series_id ? MOCK_SERIES.find(s => s.id === post.series_id) : undefined
        }))
    }

    if (!data || data.length === 0) {
        return MOCK_POSTS.map(post => ({
            ...post,
            series: post.series_id ? MOCK_SERIES.find(s => s.id === post.series_id) : undefined
        }))
    }

    // For Supabase data, we'll need to join with series separately or use a view
    // For now, return posts and let components fetch series as needed
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

export async function createStoryDrop(drop: any): Promise<any | null> {
    if (!supabase) {
        console.log('Mock story drop create:', drop)
        return { ...drop, id: Math.random().toString(), created_at: new Date().toISOString(), status: 'Pending' }
    }

    const { data, error } = await supabase
        .from('story_drops')
        .insert({ ...drop, status: 'Pending' })
        .select()
        .single()

    if (error) {
        console.error('Error creating story drop:', error)
        return null
    }

    return data
}

// ============ CONTENT SERIES FUNCTIONS ============

export async function getSeries(): Promise<Series[]> {
    if (!supabase) return MOCK_SERIES

    const { data, error } = await supabase
        .from('series')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching series:', error)
        return MOCK_SERIES
    }

    if (!data || data.length === 0) return MOCK_SERIES

    return data as Series[]
}

export async function createSeries(series: Omit<Series, 'id' | 'created_at'>): Promise<Series | null> {
    if (!supabase) {
        console.log('Mock series create:', series)
        return {
            ...series,
            id: `series-${Math.random().toString(36).substr(2, 9)}`,
            created_at: new Date().toISOString()
        }
    }

    const { data, error } = await supabase
        .from('series')
        .insert(series)
        .select()
        .single()

    if (error) {
        console.error('Error creating series:', error)
        return null
    }

    return data as Series
}

export async function updateSeries(id: string, updates: Partial<Series>): Promise<Series | null> {
    if (!supabase) {
        console.log('Mock series update:', id, updates)
        return null
    }

    const { data, error } = await supabase
        .from('series')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

    if (error) {
        console.error('Error updating series:', error)
        return null
    }

    return data as Series
}

export async function deleteSeries(id: string): Promise<boolean> {
    if (!supabase) {
        console.log('Mock series delete:', id)
        return true
    }

    // First, unassign all posts from this series
    await supabase
        .from('posts')
        .update({ series_id: null })
        .eq('series_id', id)

    const { error } = await supabase
        .from('series')
        .delete()
        .eq('id', id)

    if (error) {
        console.error('Error deleting series:', error)
        return false
    }

    return true
}

export async function getPostsBySeries(seriesId: string): Promise<Post[]> {
    if (!supabase) {
        return MOCK_POSTS.filter(p => p.series_id === seriesId)
    }

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('series_id', seriesId)
        .order('date', { ascending: true })

    if (error) {
        console.error('Error fetching posts by series:', error)
        return []
    }

    return data as Post[]
}

export async function getSeriesById(id: string): Promise<Series | null> {
    if (!supabase) {
        return MOCK_SERIES.find(s => s.id === id) || null
    }

    const { data, error } = await supabase
        .from('series')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        console.error('Error fetching series by id:', error)
        return null
    }

    return data as Series
}

