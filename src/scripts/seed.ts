import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // or SERVICE_ROLE_KEY if needed for bypass RLS

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

const DATA = [
    {
        "id": "uuid-1",
        "date": "2026-02-04",
        "platform": "LinkedIn Company",
        "status": "Review",
        "hook": "Immobilienmarkt 2026: Warum 'Abwarten' für Investoren keine Strategie mehr ist.",
        "content": "📉 **Markt-Update Q1: Die Bodenbildung ist da.**\n\nViele institutionelle und private Anleger standen 2025 an der Seitenlinie. Die Daten für Q1 2026 zeigen jetzt ein klares Bild:\n\n1. **Zins-Plateau:** Wir haben uns bei ~3,3% eingependelt. Planungssicherheit ist zurück.\n2. **Preise:** In A-Lagen und gut angebundenen B-Lagen (Speckgürtel) ziehen die Werte an.\n3. **ESG-Druck:** Energieeffiziente Assets outperformen den Bestand massiv.\n\n**Unsere Analyse:** Das Zeitfenster für attraktive Einstiege schließt sich. Wer jetzt antizyklisch agiert, sichert sich die besten Assets.\n\n#AssetManagement #RealEstateTrends #Investment #Marktanalyse #YOURTIMES",
        "visuals_placeholder": "Grafik: Zinsentwicklung vs. Immobilienpreise 2024-2026",
        "hashtags": "#AssetManagement #RealEstateTrends #Investment #Marktanalyse",
        "internal_notes": "Fokus auf Investoren-Sicht. Keine Mieter-Ansprache."
    },
    {
        "id": "uuid-2",
        "date": "2026-02-06",
        "platform": "LinkedIn Personal",
        "status": "Review",
        "hook": "Warum ich auch 2026 noch Gummistiefel trage... 😉",
        "content": "🏗️ **Projektentwicklung heißt: Präsenz zeigen.**\n\nIch war diese Woche wieder draußen in Schönwalde bei den 'Friedrichshöfen'. Für Außenstehende ist es nur ein Rohbau. Für uns ist es der Beweis, dass Projektentwicklung auch in herausfordernden Zeiten funktioniert.\n\n24 Einheiten. Altersgerecht. ESG-konform.\n\nEs ist spannend zu sehen, wie dieses Konzept im Markt greift. Die Nachfrage bestätigt unsere These: Spezialisierte Wohnformen im Speckgürtel sind krisenfest.\n\nEin großes Danke an unsere Partner am Bau, die hier bei Wind und Wetter performen! 💪\n\n#ProjectDevelopment #RealEstateWomen #Construction #Leadership #JudithLenz",
        "visuals_placeholder": "Selfie mit Helm/Gummistiefeln auf der Baustelle Friedrichshöfe",
        "hashtags": "#ProjectDevelopment #RealEstateWomen #Construction #Leadership",
        "internal_notes": "Zeigt Exekutionsstärke und Erfolg des Projekts gegenüber dem Netzwerk."
    },
    {
        "id": "uuid-3",
        "date": "2026-02-11",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Grundsteuer 2026: Was Asset Manager jetzt auf dem Schirm haben müssen.",
        "content": "📨 **Der Bescheid ist da – und jetzt?**\n\nDie Grundsteuer-Reform schlägt im Bestand durch. Für viele Portfolios bedeutet das: Neubewertung der Nebenkosten.\n\n**Worauf wir bei YOUR TIMES jetzt achten:**\n1. Prüfung der Messbeträge (Fehlerquote ist signifikant).\n2. Umlagefähigkeit (Gewerbe vs. Wohnen).\n3. Auswirkung auf die Brutto-Rendite.\n\nWir unterstützen unsere Partner aktiv dabei, diese Kostenblöcke zu optimieren. Ein sauberes Asset Management ist jetzt wichtiger denn je.\n\n#Grundsteuer #AssetManagement #RealEstateLaw #Verwaltung",
        "visuals_placeholder": "Symbolbild: Brief vom Finanzamt / Taschenrechner",
        "hashtags": "#Grundsteuer #AssetManagement #RealEstateLaw #Verwaltung",
        "internal_notes": "Expertise zeigen. Wir kümmern uns um die Details."
    },
    {
        "id": "uuid-4",
        "date": "2026-02-14",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Immobilien sind wie eine Ehe: Man bindet sich langfristig. ❤️",
        "content": "🌹 **Beziehungspflege ist Key.**\n\nZum Valentinstag mal ein Business-Gedanke: Der Kauf (oder Verkauf) einer Immobilie ist einer der emotionalsten Prozesse überhaupt. \n\nMein Job ist nicht 'Verkaufen'. Mein Job ist es, Vertrauen zu schaffen. Zwischen Verkäufer und Investor. Zwischen Vision und Realität.\n\nWenn die Chemie am Notartisch stimmt, ist der Deal nur noch Formsache. Danke an mein Netzwerk für das Vertrauen in den letzten Jahren!\n\n#Trust #RealEstateBusiness #Network #Values #Valentinstag",
        "visuals_placeholder": "Bild von einem Handschlag oder Notartermin (Symbolbild)",
        "hashtags": "#Trust #RealEstateBusiness #Network #Values",
        "internal_notes": "Soft Skills betonen. Vertrauen als Währung."
    },
    {
        "id": "uuid-5",
        "date": "2026-02-18",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Neuzugang im Portfolio: Biesenthal startet.",
        "content": "🌲 **Markt-Update: Nische schlägt Masse.**\n\nWir starten den Vertrieb für unser Projekt im Naturpark Biesenthal. \n\n**Die Asset-Strategie:**\nKlare Segmentierung. Häuser 1-4 für 'Active Seniors', Häuser 5-6 für Familien. \n\nWarum wir das machen? Weil der demografische Wandel im Speckgürtel real ist. Die Nachfrage nach barrierefreiem, hochwertigem Wohnraum übersteigt das Angebot bei weitem. Ein solides Produkt für Investoren, die auf langfristige Mietsicherheit setzen.\n\nExposés für qualifizierte Interessenten ab sofort.\n\n#Projektentwicklung #Biesenthal #Demografie #Investment #Neubau",
        "visuals_placeholder": "Rendering oder Drohnenaufnahme Biesenthal",
        "hashtags": "#Projektentwicklung #Biesenthal #Demografie #Investment",
        "internal_notes": "Vertriebsstart als strategischen Move verkaufen, nicht als 'Wohnungsanzeige'."
    },
    {
        "id": "uuid-6",
        "date": "2026-02-20",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Strategie-Meeting im Grünen. ⛳",
        "content": "Nach einer intensiven Woche mit zwei Launches (Schönwalde & Biesenthal) lüfte ich den Kopf heute hier durch.\n\nDie besten Ideen für komplexe Deals kommen mir oft nicht im Büro, sondern auf dem Platz. Der Fokus beim Abschlag hilft mir, auch im Business das Ziel nicht aus den Augen zu verlieren.\n\nIch wünsche meinem Netzwerk ein erfolgreiches Wochenende! Erholt euch gut.\n\n#WorkLife #Focus #Golf #RealEstateLife #Networking",
        "visuals_placeholder": "Foto vom Golfplatz (Grün/Natur)",
        "hashtags": "#WorkLife #Focus #Golf #RealEstateLife",
        "internal_notes": "Persönlich, aber elitär/professionell. Zeigt, dass sie 'im Spiel' ist."
    },
    {
        "id": "uuid-7",
        "date": "2026-03-02",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Sales ist kein Kampf. Sales ist Beratung.",
        "content": "🤝 **Tag der Verkäufer: Ein Plädoyer für Qualität.**\n\nIm aktuellen Markt (Käufermarkt) trennt sich die Spreu vom Weizen. 'Hard Selling' funktioniert nicht mehr.\n\nBei YOUR TIMES setzen wir auf 'Deep Consulting'. Wir analysieren erst die Portfolio-Struktur des Kunden, bevor wir ein Objekt anbieten. \n\nErfolg im Vertrieb 2026 heißt: Probleme lösen, nicht Produkte drücken.\n\n#SalesExcellence #Beratung #Immobilienvertrieb #Qualität",
        "visuals_placeholder": "Team-Foto oder Meeting-Situation",
        "hashtags": "#SalesExcellence #Beratung #Immobilienvertrieb",
        "internal_notes": "Positionierung als Premium-Berater."
    },
    {
        "id": "uuid-8",
        "date": "2026-03-08",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Von der Baustelle in den Boardroom. 👩💼🏗️",
        "content": "Zum Weltfrauentag ein Shoutout an alle Kolleginnen in der Real Estate Branche!\n\nOb als Architektin, Asset Managerin oder Maklerin – wir prägen diese Industrie. Ich erinnere mich noch an Zeiten, wo ich die einzige Frau im Container war. Heute sehe ich immer mehr weibliche Führungskräfte, die Projekte steuern.\n\nVielfalt bringt bessere Ergebnisse. Punkt.\n\nAuf uns! 🥂\n\n#WomenInRealEstate #FemaleLeadership #Weltfrauentag #Empowerment",
        "visuals_placeholder": "Foto von Judith in Aktion (oder mit Kollegin)",
        "hashtags": "#WomenInRealEstate #FemaleLeadership #Weltfrauentag",
        "internal_notes": "Empowerment-Thema. Kommt im Netzwerk immer gut an."
    },
    {
        "id": "uuid-9",
        "date": "2026-03-16",
        "platform": "LinkedIn Company",
        "status": "Draft",
        "hook": "Datenräume lügen nicht.",
        "content": "🔍 **Transparenz als Basis für jede Transaktion.**\n\nHeute ist Tag der Informationsfreiheit. Für uns im Transaktionsmanagement heißt das: Lückenlose Due Diligence.\n\nWir bereiten unsere Projekte so auf, dass institutionelle Prüfungen (Bank, Fonds) reibungslos laufen. Keine versteckten Themen, keine geschönten Zahlen.\n\nEhrlichkeit beschleunigt Deals. \n\n#TransactionManagement #DueDiligence #Transparenz #Professionalität",
        "visuals_placeholder": "Bild von Akten/Datenraum/Laptop",
        "hashtags": "#TransactionManagement #DueDiligence #Transparenz",
        "internal_notes": "Signal an Profis: 'Mit uns gibt es keinen Ärger in der DD'."
    },
    {
        "id": "uuid-10",
        "date": "2026-03-27",
        "platform": "LinkedIn Personal",
        "status": "Draft",
        "hook": "Q1 Closing: Was für ein Ritt! 🚀",
        "content": "🐰 **Endspurt vor Ostern.**\n\nDas erste Quartal 2026 ist fast durch. Ein kurzer Rückblick:\n\n✅ Friedrichshöfe: Vertriebsstart erfolgreich.\n✅ Biesenthal: Erste Reservierungen gesichert.\n✅ Lützowbogen: Vollvermietung gehalten.\n\nWir geben diese Woche noch Gas für zwei Notartermine, dann geht's in die Osterpause. \n\nWie lief euer Q1? Seid ihr zufrieden mit dem Start ins Jahr?\n\n#QuarterlyReview #Closing #RealEstate #Success #Ostern",
        "visuals_placeholder": "Bild von unterschriebenen Verträgen oder Schlüssel",
        "hashtags": "#QuarterlyReview #Closing #RealEstate #Success",
        "internal_notes": "Erfolgsnachweis. 'Bei uns läuft es'."
    }
]

async function seed() {
    console.log('Seeding data...')

    // Clear existing data (optional, but good for idempotent seeding)
    // const { error: deleteError } = await supabase.from('posts').delete().neq('id', '00000000-0000-0000-0000-000000000000') // delete all
    // if (deleteError) console.error('Error clearing table:', deleteError)

    const { data, error } = await supabase
        .from('posts')
        .upsert(DATA)
        .select()

    if (error) {
        console.error('Error seeding data:', error)
    } else {
        console.log('Successfully seeded', data.length, 'posts.')
    }
}

seed()
