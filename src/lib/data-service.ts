
import { supabase } from './supabase'
import type { Post, NewPost, PostStatus, Settings, AnalyticsMetric } from '@/types'

let MOCK_SETTINGS: Settings = {
    appTitle: "YT Content Cockpit",
    logoUrl: "",
    linkedinProfileUrl: "https://www.linkedin.com/in/judith-lenz",
    linkedinCompanyUrl: "https://www.linkedin.com/company/your-times",
    notifyOnFeedback: true,
    notifyOnApproval: true
}

export const getSettings = async (): Promise<Settings> => {
    // In a real app we would fetch from supabase 'settings' table or similar
    // For now we use in-memory mock or could use localStorage on client side
    // Since this is likely called from server components, we resort to a simple variable for this demo session

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_SETTINGS
}

export const updateSettings = async (updates: Partial<Settings>): Promise<Settings> => {
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 500))
    MOCK_SETTINGS = { ...MOCK_SETTINGS, ...updates }
    return MOCK_SETTINGS
}


// Mock Data
const MOCK_POSTS: Post[] = [
    {
        "id": "post-2026-06-01",
        "date": "2026-02-04",
        "platform": "LinkedIn Company",
        "status": "Review",
        "hook": "Immobilienmarkt 2026: Die Rückkehr der Planbarkeit.",
        "content": "📊 **Immobilienmarkt 2026: Die Rückkehr der Planbarkeit.**\n\nNach zwei Jahren der Seitwärtsbewegung sehen wir im Q1 2026 eine klare Tendenz: Die Zinsen haben bei ca. 3,3% ihr Plateau gefunden. Was bedeutet das für Asset Manager und Investoren?\n\n🔹 **Bodenbildung:** Das Warten auf den 'perfekten Tiefpunkt' ist vorbei. In den Metropolregionen ziehen die Preise bereits wieder an.\n🔹 **ESG-Vorsprung:** Energieeffizienz ist kein Trend mehr, sondern die Bedingung für Werterhalt.\n\nUnsere Strategie bei YOUR TIMES: Selektives Investieren in krisenfeste Konzepte. Wer jetzt die Ohren auf der Schiene hat, sichert sich die besten Opportunitäten für das kommende Jahrzehnt.\n\n#AssetManagement #RealEstate2026 #Marktanalyse #YOURTIMES #InvestmentStrategie",
        "visuals_placeholder": "Infografik: Zins-Plateau 2024-2026 (Navy Blue/Gold)",
        "hashtags": "#AssetManagement #RealEstate2026 #Marktanalyse #YOURTIMES",
        "internal_notes": "B2B-Fokus. Fokus auf institutionelle Sicherheit.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-06-02",
        "date": "2026-02-06",
        "platform": "LinkedIn Personal",
        "status": "Review",
        "hook": "Gummistiefel-Wetter & Visionen im Kopf. 🏗️✨",
        "content": "🏗️ **Gummistiefel-Wetter & Visionen im Kopf.**\n\nIch war diese Woche wieder in Schönwalde bei unserem Projekt 'Friedrichshöfe'. 24 Einheiten, die bald mit Leben gefüllt werden. 🤩\n\nFür mich ist das viel mehr als nur ein Baustellen-Besuch. Es ist dieses besondere Gefühl, wenn aus einer Idee auf dem Papier Stein auf Stein Realität wird. Projektentwicklung in 2026 fordert uns alles ab – Ausdauer, Flexibilität und den Mut, dranzubleiben, wenn andere zögern.\n\nAber genau das liebe ich an meinem Job: Werte schaffen, die bleiben. Und das Team vor Ort? Einfach nur großartig, wie hier bei jedem Wetter performt wird! 💪✨\n\n#Machertum #Friedrichshöfe #ImmobilienmitHerz #JudithLenz #BaustellenUpdate",
        "visuals_placeholder": "Selfie Judith auf Baustelle Friedrichshöfe (blonder Dutt, weißer Helm)",
        "hashtags": "#Machertum #Friedrichshöfe #ImmobilienmitHerz #JudithLenz",
        "internal_notes": "Judith-Style: Emotional, aber zeigt Exekutionsstärke.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-07-01",
        "date": "2026-02-11",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Datenräume lügen nicht – aber sie brauchen Expertise. 🔍",
        "content": "🔍 **Datenräume lügen nicht – aber sie brauchen Expertise.**\n\nIm aktuellen Marktumfeld ist eine lückenlose Due Diligence die Basis für jede erfolgreiche Transaktion. Bei YOUR TIMES bereiten wir Projekte so auf, dass institutionelle Prüfungen reibungslos laufen. \n\nTransparenz ist für uns keine Option, sondern Pflicht. Ob bei Healthcare-Objekten oder exklusiven Wohneinheiten: Wir stehen für ehrliche Zahlen und klare Kommunikation. \n\nDenn am Ende beschleunigt Vertrauen den Deal. 🤝\n\n#TransactionManagement #DueDiligence #Transparenz #Professionalität #YOURTIMES",
        "visuals_placeholder": "Hochwertiges Foto: Laptop, Akten und Taschenrechner auf Eichentisch",
        "hashtags": "#TransactionManagement #DueDiligence #Transparenz #YOURTIMES",
        "internal_notes": "Fokus auf Transaktions-Sicherheit für Partner.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-07-02",
        "date": "2026-02-14",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Immobilien sind ein Menschengeschäft. Punkt. ❤️",
        "content": "🤝 **Immobilien sind ein Menschengeschäft. Punkt.**\n\nOft werde ich gefragt, was das Geheimnis hinter einem erfolgreichen Abschluss ist. Meine Antwort: Es ist nicht der Preis. Es ist das Vertrauen. ❤️\n\nWenn Käufer, Verkäufer und Partner am Notartisch sitzen und man spürt, dass die Chemie stimmt – dann weiß ich, wir haben alles richtig gemacht. Für mich sind exklusive Off-Market-Deals nur möglich, weil wir über Jahre hinweg Beziehungen aufgebaut haben, die auf Integrität und persönlicher Nähe basieren. \n\nDanke an mein Netzwerk für die inspirierenden Gespräche in dieser Woche! 🥂✨\n\n#PeopleBusiness #Vertrauen #Networking #RealEstateValues #JudithLenz",
        "visuals_placeholder": "Symbolbild Handshake über Notar-Dokument (Warmes Licht)",
        "hashtags": "#PeopleBusiness #Vertrauen #Networking #JudithLenz",
        "internal_notes": "Valentinstag-Post. Fokus auf das Netzwerk.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-08-01",
        "date": "2026-02-18",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "SENIORENWOHNEN BIESENTHAL: Wo Strategie auf Demografie trifft. 🌲",
        "content": "🌲 **SENIORENWOHNEN BIESENTHAL: Warum dieses Asset gerade jetzt performt.**\n\nSeit dem Vermarktungsstart im August 2025 bestätigt die Nachfrage unsere These: Der Speckgürtel differenziert sich. \n\nWarum Biesenthal (69 Einheiten, KfW 40 EE) für Investoren ein 'Safe Haven' ist:\n✅ **Krisenfest:** Seniorenwohnen ist weitgehend entkoppelt von konjunkturellen Schwankungen.\n✅ **Nachhaltig:** Dank A+ Energieeffizienz und Erdwärme sind die Betriebskosten langfristig gesichert.\n✅ **Wertstabil:** Ein durchdachtes Quartierskonzept sichert die Vermietbarkeit für Jahrzehnte.\n\nBesuchen Sie uns digital für mehr Insights: [www.seniorenwohnen-biesenthal.de](https://www.seniorenwohnen-biesenthal.de)\n\n#Biesenthal #HealthcareRealEstate #ESG #Investment #YOURTIMES",
        "visuals_placeholder": "Architektur-Rendering Stadtvillen im Grünen",
        "hashtags": "#Biesenthal #HealthcareRealEstate #ESG #Investment",
        "internal_notes": "Korrektur des Projektnamens. Fokus auf Fakten (69 WE, KfW 40).",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-09-01",
        "date": "2026-03-02",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Tag der Verkäufer: Ein Plädoyer für Beratung statt Verkauf. 🤝",
        "content": "🤝 **Tag der Verkäufer: Warum Qualität den Unterschied macht.**\n\nIm aktuellen Markt trennt sich die Spreu vom Weizen. 'Hard Selling' ist ein Relikt der Vergangenheit. \n\nBei YOUR TIMES setzen wir auf 'Deep Consulting'. Wir verstehen erst die Portfolio-Ziele unserer Partner, bevor wir eine Transaktion begleiten. Erfolg im Vertrieb 2026 heißt: Komplexe Probleme lösen, nicht Produkte in den Markt drücken.\n\nEin großes Dankeschön an mein Team, das diesen Anspruch jeden Tag lebt! 💪\n\n#SalesExcellence #RealEstateConsulting #Qualität #YOURTIMES",
        "visuals_placeholder": "Team-Foto in Meeting-Situation (Professional & Dynamisch)",
        "hashtags": "#SalesExcellence #RealEstateConsulting #YOURTIMES",
        "internal_notes": "Premium-Positionierung der Marke.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-10-01",
        "date": "2026-03-08",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Von der Baustelle in den Boardroom. 💪👩💼",
        "content": "💪 **Powerfrauen am Bau!**\n\nZum Weltfrauentag ein Shoutout an alle Kolleginnen, die die Immobilienwelt jeden Tag ein Stück besser machen! 🏗️✨\n\nOb als Architektin, Bauleiterin oder Investment-Expertin – wir bringen eine Perspektive ein, die unverzichtbar ist. Ich erinnere mich gut an Zeiten, in denen ich oft die einzige Frau am Tisch war. Heute sehe ich immer mehr starke Frauen, die Großprojekte steuern. \n\nVielfalt in der Führung bringt bessere Ergebnisse. Auf uns! 🥂\n\n#WomenInRealEstate #FemaleLeadership #Weltfrauentag #Empowerment #JudithLenz",
        "visuals_placeholder": "Foto Judith mit einer Partnerin/Kollegin im Gespräch",
        "hashtags": "#WomenInRealEstate #FemaleLeadership #Weltfrauentag #JudithLenz",
        "internal_notes": "Networking-Thema. Hohe Engagement-Wahrscheinlichkeit.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-10-02",
        "date": "2026-03-12",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Strategie-Check im Grünen. ⛳",
        "content": "⛳ **Abschlag für neue Ideen.**\n\nNach einer intensiven Phase mit den Launches in Biesenthal und den Friedrichshöfen brauche ich heute die Weite des Platzes, um den Kopf frei zu bekommen.\n\nDie besten Strategien for unsere Kunden entstehen bei mir oft nicht am Schreibtisch, sondern beim Fokus auf den nächsten Ball. Diese Ruhe ist mein Motor für die kommende Woche.\n\nIch wünsche euch allen einen fokussierten Endspurt ins Wochenende! 🏌️♀️✨\n\n#WorkLifeBalance #Focus #GolfAndBusiness #RealEstateLife #JudithLenz",
        "visuals_placeholder": "Atmosphärisches Foto Golfplatz / Judith beim Abschlag",
        "hashtags": "#WorkLifeBalance #Focus #GolfAndBusiness #JudithLenz",
        "internal_notes": "Persönlicher Einblick (Golf), sehr wichtig for ihren Stil.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-11-01",
        "date": "2026-03-16",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Transparenz ist das Fundament jeder Rendite. 🔍",
        "content": "🔍 **Informationsfreiheit im Maklergeschäft.**\n\nHeute ist Tag der Informationsfreiheit. Für YOUR TIMES bedeutet das: Radikale Ehrlichkeit im Datenraum.\n\nWir glauben, dass eine Transaktion nur dann langfristig erfolgreich ist, wenn alle Karten auf dem Tisch liegen. Wir liefern Fakten statt Floskeln – auch wenn die Wahrheit manchmal unbequem ist. \n\nEhrlichkeit schafft Sicherheit. Und Sicherheit schafft Rendite.\n\n#Transparenz #EthicsInRealEstate #Marktvertrauen #YOURTIMES",
        "visuals_placeholder": "Modernes Büro-Szenario / Detailaufnahme Architektur-Modell",
        "hashtags": "#Transparenz #EthicsInRealEstate #YOURTIMES",
        "internal_notes": "Werte-Post zum Aktionstag.",
        "feedback": "",
        "created_at": new Date().toISOString()
    },
    {
        "id": "post-2026-12-01",
        "date": "2026-03-27",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Q1-Closing: Was für ein Ritt! 🚀🐰",
        "content": "🐰 **Endspurt vor Ostern!**\n\nDas erste Quartal 2026 neigt sich dem Ende zu und ich blicke mit Stolz auf das Erreichte zurück:\n✅ Friedrichshöfe: Erfolgreich gelauncht.\n✅ Seniorenwohnen Biesenthal: Überwältigende Resonanz.\n✅ Netzwerk: Viele neue, wertvolle Verbindungen geknüpft.\n\nBevor es in die ruhigen Ostertage geht, stehen diese Woche noch zwei wichtige Notartermine an. Wir geben Gas bis zur letzten Minute! ✍️✨\n\nWie war euer Start ins Jahr? Seid ihr zufrieden mit dem ersten Quartal?\n\n#Success #RealEstateClosing #Q1Review #JudithLenz #Dankbarkeit",
        "visuals_placeholder": "Foto Judith lächelnd mit Terminkalender oder vor einem fertigen Projekt",
        "hashtags": "#Success #RealEstateClosing #JudithLenz",
        "internal_notes": "Abschluss-Post für das Quartal. Positive Energie.",
        "feedback": "",
        "created_at": new Date().toISOString()
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

export const getAnalyticsMetrics = async (): Promise<AnalyticsMetric[]> => {
    if (!supabase) {
        console.log('No supabase client, returning empty analytics')
        return []
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
