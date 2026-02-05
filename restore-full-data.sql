-- ==========================================
-- SUPABASE MIGRATION: Restore YOUR TIMES Data
-- ==========================================

-- 1. Tabellen-Struktur erweitern & sicherstellen
-- Wir fügen Spalten hinzu, falls sie fehlen. (Sicherer als Löschen)
ALTER TABLE posts ADD COLUMN IF NOT EXISTS hook text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS visuals_placeholder text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS hashtags text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS internal_notes text;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS last_edited_by text DEFAULT 'Christopher';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS performance_score integer DEFAULT 0;

-- 2. Mock-Daten/Falsche Daten löschen
DELETE FROM posts;

-- 3. Die 10 strategischen YOUR TIMES Q1 Posts einfügen
INSERT INTO posts (date, platform, status, hook, content, visuals_placeholder, hashtags, internal_notes, last_edited_by)
VALUES
(
  '2026-02-04', 
  'LinkedIn Company', 
  'Review', 
  'Immobilienmarkt 2026: Die Rückkehr der Planbarkeit.', 
  '📊 **Immobilienmarkt 2026: Die Rückkehr der Planbarkeit.**\n\nNach zwei Jahren der Seitwärtsbewegung sehen wir im Q1 2026 eine klare Tendenz: Die Zinsen haben bei ca. 3,3% ihr Plateau gefunden. Was bedeutet das für Asset Manager und Investoren?\n\n🔹 **Bodenbildung:** Das Warten auf den ''perfekten Tiefpunkt'' ist vorbei. In den Metropolregionen ziehen die Preise bereits wieder an.\n🔹 **ESG-Vorsprung:** Energieeffizienz ist kein Trend mehr, sondern die Bedingung für Werterhalt.\n\nUnsere Strategie bei YOUR TIMES: Selektives Investieren in krisenfeste Konzepte. Wer jetzt die Ohren auf der Schiene hat, sichert sich die besten Opportunitäten für das kommende Jahrzehnt.\n\n#AssetManagement #RealEstate2026 #Marktanalyse #YOURTIMES #InvestmentStrategie', 
  'Infografik: Zins-Plateau 2024-2026 (Navy Blue/Gold)', 
  '#AssetManagement #RealEstate2026 #Marktanalyse #YOURTIMES', 
  'B2B-Fokus. Fokus auf institutionelle Sicherheit.',
  'Christopher'
),
(
  '2026-02-06', 
  'LinkedIn Personal', 
  'Review', 
  'Gummistiefel-Wetter & Visionen im Kopf. 🏗️✨', 
  '🏗️ **Gummistiefel-Wetter & Visionen im Kopf.**\n\nIch war diese Woche wieder in Schönwalde bei unserem Projekt ''Friedrichshöfe''. 24 Einheiten, die bald mit Leben gefüllt werden. 🤩\n\nFür mich ist das viel mehr als nur ein Baustellen-Besuch. Es ist dieses besondere Gefühl, wenn aus einer Idee auf dem Papier Stein auf Stein Realität wird. Projektentwicklung in 2026 fordert uns alles ab – Ausdauer, Flexibilität und den Mut, dranzubleiben, wenn andere zögern.\n\nAber genau das liebe ich an meinem Job: Werte schaffen, die bleiben. Und das Team vor Ort? Einfach nur großartig, wie hier bei jedem Wetter performt wird! 💪✨', 
  'Selfie Judith auf Baustelle Friedrichshöfe', 
  '#Machertum #Friedrichshöfe #ImmobilienmitHerz #JudithLenz', 
  'Judith-Style: Emotional, aber zeigt Exekutionsstärke.',
  'Judith'
),
(
  '2026-02-11', 
  'LinkedIn Company', 
  'Draft', 
  'Datenräume lügen nicht – aber sie brauchen Expertise. 🔍', 
  '🔍 **Datenräume lügen nicht – aber sie brauchen Expertise.**\n\nIm aktuellen Marktumfeld ist eine lückenlose Due Diligence die Basis für jede erfolgreiche Transaktion. Bei YOUR TIMES bereiten wir Projekte so auf, dass institutionelle Prüfungen reibungslos laufen. \n\nTransparenz ist für uns keine Option, sondern Pflicht. Ob bei Healthcare-Objekten oder exklusiven Wohneinheiten: Wir stehen für ehrliche Zahlen und klare Kommunikation. \n\nDenn am Ende beschleunigt Vertrauen den Deal. 🤝', 
  'Hochwertiges Foto: Laptop, Akten und Taschenrechner', 
  '#TransactionManagement #DueDiligence #Transparenz #YOURTIMES', 
  'Fokus auf Transaktions-Sicherheit für Partner.',
  'Christopher'
),
(
  '2026-02-14', 
  'LinkedIn Personal', 
  'Draft', 
  'Immobilien sind ein Menschengeschäft. Punkt. ❤️', 
  '🤝 **Immobilien sind ein Menschengeschäft. Punkt.**\n\nOft werde ich gefragt, was das Geheimnis hinter einem erfolgreichen Abschluss ist. Meine Antwort: Es ist nicht der Preis. Es ist das Vertrauen. ❤️\n\nWenn Käufer, Verkäufer und Partner am Notartisch sitzen und man spürt, dass die Chemie stimmt – dann weiß ich, wir haben alles richtig gemacht. Für mich sind exklusive Off-Market-Deals nur möglich, weil wir über Jahre hinweg Beziehungen aufgebaut haben, die auf Integrität und persönlicher Nähe basieren. \n\nDanke an mein Netzwerk für das inspirierenden Gespräche in dieser Woche! 🥂✨', 
  'Symbolbild Handshake über Notar-Dokument', 
  '#PeopleBusiness #Vertrauen #Networking #JudithLenz', 
  'Valentinstag-Post. Fokus auf das Netzwerk.',
  'Judith'
),
(
  '2026-02-18', 
  'LinkedIn Company', 
  'Draft', 
  'SENIORENWOHNEN BIESENTHAL: Wo Strategie auf Demografie trifft. 🌲', 
  '🌲 **SENIORENWOHNEN BIESENTHAL: Warum dieses Asset gerade jetzt performt.**\n\nSeit dem Vermarktungsstart im August 2025 bestätigt die Nachfrage unsere These: Der Speckgürtel differenziert sich. \n\nWarum Biesenthal (69 Einheiten, KfW 40 EE) für Investoren ein ''Safe Haven'' ist:\n✅ **Krisenfest:** Seniorenwohnen ist weitgehend entkoppelt von konjunkturellen Schwankungen.\n✅ **Nachhaltig:** Dank A+ Energieeffizienz und Erdwärme sind die Betriebskosten langfristig gesichert.\n✅ **Wertstabil:** Ein durchdachtes Quartierskonzept sichert die Vermietbarkeit für Jahrzehnte.', 
  'Architektur-Rendering Stadtvillen im Grünen', 
  '#Biesenthal #HealthcareRealEstate #ESG #Investment', 
  'Korrektur des Projektnamens. Fokus auf Fakten.',
  'Christopher'
),
(
  '2026-03-02', 
  'LinkedIn Company', 
  'Draft', 
  'Tag der Verkäufer: Beratung statt Verkauf. 🤝', 
  '🤝 **Tag der Verkäufer: Warum Qualität den Unterschied macht.**\n\nIm aktuellen Markt trennt sich die Spreu vom Weizen. ''Hard Selling'' ist ein Relikt der Vergangenheit. \n\nBei YOUR TIMES setzen wir auf ''Deep Consulting''. Wir verstehen erst die Portfolio-Ziele unserer Partner, bevor wir eine Transaktion begleiten. Erfolg im Vertrieb 2026 heißt: Komplexe Probleme lösen, nicht Produkte in den Markt drücken.', 
  'Team-Foto in Meeting-Situation', 
  '#SalesExcellence #RealEstateConsulting #YOURTIMES', 
  'Premium-Positionierung der Marke.',
  'Christopher'
),
(
  '2026-03-08', 
  'LinkedIn Personal', 
  'Draft', 
  'Von der Baustelle in den Boardroom. 💪👩💼', 
  '💪 **Powerfrauen am Bau!**\n\nZum Weltfrauentag ein Shoutout an alle Kolleginnen, die die Immobilienwelt jeden Tag ein Stück besser machen! 🏗️✨\n\nOb als Architektin, Bauleiterin oder Investment-Expertin – wir bringen eine Perspektive ein, die unverzichtbar ist. Heute sehe ich immer mehr starke Frauen, die Großprojekte steuern. \n\nVielfalt in der Führung bringt bessere Ergebnisse. Auf uns! 🥂', 
  'Foto Judith mit einer Partnerin im Gespräch', 
  '#WomenInRealEstate #FemaleLeadership #Weltfrauentag #JudithLenz', 
  'Networking-Thema.',
  'Judith'
),
(
  '2026-03-12', 
  'LinkedIn Personal', 
  'Draft', 
  'Strategie-Check im Grünen. ⛳', 
  '⛳ **Abschlag für neue Ideen.**\n\nNach einer intensiven Phase mit den Launches in Biesenthal und den Friedrichshöfen brauche ich heute die Weite des Platzes, um den Kopf frei zu bekommen.\n\nDie besten Strategien für unsere Kunden entstehen bei mir oft nicht am Schreibtisch, sondern beim Fokus auf den nächsten Ball. Diese Ruhe ist mein Motor für die kommende Woche.', 
  'Atmosphärisches Foto Golfplatz', 
  '#WorkLifeBalance #Focus #GolfAndBusiness #JudithLenz', 
  'Persönlicher Einblick (Golf).',
  'Judith'
),
(
  '2026-03-16', 
  'LinkedIn Company', 
  'Draft', 
  'Transparenz ist das Fundament jeder Rendite. 🔍', 
  '🔍 **Informationsfreiheit im Maklergeschäft.**\n\nHeute ist Tag der Informationsfreiheit. Für YOUR TIMES bedeutet das: Radikale Ehrlichkeit im Datenraum.\n\nWir glauben, dass eine Transaktion nur dann langfristig erfolgreich ist, wenn alle Karten auf dem Tisch liegen. Wir liefern Fakten statt Floskeln – auch wenn die Wahrheit manchmal unbequem ist. \n\nEhrlichkeit schafft Sicherheit. Und Sicherheit schafft Rendite.', 
  'Modernes Büro / Detail Architektur-Modell', 
  '#Transparenz #EthicsInRealEstate #YOURTIMES', 
  'Werte-Post zum Aktionstag.',
  'Christopher'
),
(
  '2026-03-27', 
  'LinkedIn Personal', 
  'Draft', 
  'Q1-Closing: Was für ein Ritt! 🚀🐰', 
  '🐰 **Endspurt vor Ostern!**\n\nDas erste Quartal 2026 neigt sich dem Ende zu und ich blicke mit Stolz auf das Erreichte zurück:\n✅ Friedrichshöfe: Erfolgreich gelauncht.\n✅ Seniorenwohnen Biesenthal: Überwältigende Resonanz.\n✅ Netzwerk: Viele neue, wertvolle Verbindungen geknüpft.\n\nWir geben diese Woche noch Gas für zwei Notartermine, dann geht''s in die Osterpause. ✨', 
  'Foto Judith lächelnd mit Terminkalender', 
  '#Success #RealEstateClosing #JudithLenz', 
  'Abschluss-Post für das Quartal.',
  'Judith'
);

-- 4. Analytics Tabelle erstellen & Daten Restore
CREATE TABLE IF NOT EXISTS analytics_metrics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  impressions integer DEFAULT 0,
  engagements integer DEFAULT 0,
  new_followers integer DEFAULT 0,
  platform text
);

alter table analytics_metrics enable row level security;
create policy "Öffentlicher Zugriff Analytics" on analytics_metrics for all using (true) with check (true);

-- Bestehende Analytics löschen (Clean Restore)
DELETE FROM analytics_metrics;

-- Historische Daten einfügen
INSERT INTO analytics_metrics (date, impressions, engagements, new_followers, platform)
VALUES
('2025-08-01', 12400, 450, 12, 'Company'),
('2025-09-01', 15800, 620, 25, 'Company'),
('2025-10-01', 14200, 580, 18, 'Company'),
('2025-11-01', 19500, 890, 42, 'Company'),
('2025-12-01', 22000, 1100, 35, 'Company'),
('2026-01-01', 18000, 750, 20, 'Company'),
('2025-08-01', 8500, 1200, 45, 'Personal'),
('2025-09-01', 9200, 1350, 52, 'Personal'),
('2025-10-01', 11000, 1600, 68, 'Personal'),
('2025-11-01', 10500, 1400, 40, 'Personal'),
('2025-12-01', 13000, 1900, 75, 'Personal'),
('2026-01-01', 12000, 1700, 55, 'Personal');
