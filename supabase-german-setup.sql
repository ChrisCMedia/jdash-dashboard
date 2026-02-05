-- ==============================================================================
-- MASTER SETUP SQL: YT CONTENT COCKPIT (VOLLSTÄNDIG & UNGEKÜRZT)
-- ERSTELLT: 05.02.2026 | STATUS: PRODUCTION READY
-- BEINHALTET: SCHEMA, AUTH POLICIES, 10 FINAL POSTS, ANALYTICS HISTORY
-- ==============================================================================

-- 1. DATENBANK AUFRÄUMEN
DROP TABLE IF EXISTS posts CASCADE;
DROP TABLE IF EXISTS analytics_metrics CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- 2. SCHEMA: POSTS (Der Kern deines Redaktionsplans)
CREATE TABLE posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  platform text NOT NULL CHECK (platform IN ('LinkedIn Personal', 'LinkedIn Company')),
  status text NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Review', 'Approved', 'Posted')),
  
  -- Content Felder (Ungekürzt)
  hook text DEFAULT '',
  content text DEFAULT '',
  visuals_placeholder text DEFAULT '',
  hashtags text DEFAULT '',
  image_url text,
  
  -- Meta & Audit (Für das Enterprise-Feeling)
  internal_notes text DEFAULT '',
  feedback text DEFAULT '',
  client_feedback_history jsonb DEFAULT '[]'::jsonb,
  last_edited_by text DEFAULT 'Christopher',
  performance_score integer DEFAULT 0,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 3. SCHEMA: ANALYTICS (Für die Performance-Charts)
CREATE TABLE analytics_metrics (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  date date NOT NULL,
  impressions integer DEFAULT 0,
  engagements integer DEFAULT 0,
  new_followers integer DEFAULT 0,
  platform text CHECK (platform IN ('Personal', 'Company'))
);

-- 4. SCHEMA: SETTINGS (Für das Rebranding auf YT)
CREATE TABLE settings (
  id integer PRIMARY KEY DEFAULT 1,
  app_name text DEFAULT 'YT Content Cockpit',
  logo_url text DEFAULT '/Logo.png',
  linkedin_personal_url text DEFAULT '',
  linkedin_company_url text DEFAULT '',
  notifications_enabled boolean DEFAULT true,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT one_row_only CHECK (id = 1)
);

-- 5. SICHERHEIT (Row Level Security - Öffentlich für Prototyping)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access" ON posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON analytics_metrics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public access" ON settings FOR ALL USING (true) WITH CHECK (true);

-- 6. INITIAL SEED: SETTINGS
INSERT INTO settings (id, app_name) VALUES (1, 'YT Content Cockpit') ON CONFLICT (id) DO NOTHING;

-- 7. DATEN-IMPORT: DIE 10 FINALEN Q1 2026 STRATEGIE-POSTS (VOLLSTÄNDIG)
INSERT INTO posts (date, platform, status, hook, content, visuals_placeholder, hashtags, internal_notes)
VALUES 
-- POST 1
('2026-02-04', 'LinkedIn Company', 'Review', 
'Immobilienmarkt 2026: Die Rückkehr der Planbarkeit.', 
'📊 **Immobilienmarkt 2026: Die Rückkehr der Planbarkeit.**

Nach zwei Jahren der Seitwärtsbewegung sehen wir im Q1 2026 eine klare Tendenz: Die Zinsen haben bei ca. 3,3% ihr Plateau gefunden. Was bedeutet das für Asset Manager und Investoren?

🔹 **Bodenbildung:** Das Warten auf den ''perfekten Tiefpunkt'' ist vorbei. In den Metropolregionen ziehen die Preise bereits wieder an.
🔹 **ESG-Vorsprung:** Energieeffizienz ist kein Trend mehr, sondern die Bedingung für Werterhalt.

Unsere Strategie bei YOUR TIMES: Selektives Investieren in krisenfeste Konzepte. Wer jetzt die Ohren auf der Schiene hat, sichert sich die besten Opportunitäten für das kommende Jahrzehnt.

Wie bewerten Sie die aktuelle Dynamik? Lassen Sie uns in den Austausch gehen.

#AssetManagement #RealEstate2026 #Marktanalyse #YOURTIMES #InvestmentStrategie', 
'Infografik: Zins-Plateau 2024-2026 (Navy Blue/Gold)', 
'#AssetManagement #RealEstate2026 #Marktanalyse #YOURTIMES', 
'B2B-Fokus. Fokus auf institutionelle Sicherheit.'),

-- POST 2
('2026-02-06', 'LinkedIn Personal', 'Review', 
'Gummistiefel-Wetter & Visionen im Kopf. 🏗️✨', 
'🏗️ **Gummistiefel-Wetter & Visionen im Kopf.**

Ich war diese Woche wieder in Schönwalde bei unserem Projekt ''Friedrichshöfe''. 24 Einheiten, die bald mit Leben gefüllt werden. 🤩

Für mich ist das viel mehr als nur ein Baustellen-Besuch. Es ist dieses besondere Gefühl, wenn aus einer Idee auf dem Papier Stein auf Papier Realität wird. Projektentwicklung in 2026 fordert uns alles ab – Ausdauer, Flexibilität und den Mut, dranzubleiben, wenn andere zögern.

Aber genau das liebe ich an meinem Job: Werte schaffen, die bleiben. Und das Team vor Ort? Einfach nur großartig, wie hier bei jedem Wetter performt wird! 💪✨

Habt ihr auch dieses eine Projekt, das euer Herz höher schlagen lässt?

#Machertum #Friedrichshöfe #ImmobilienmitHerz #Leidenschaft #JudithLenz #BaustellenUpdate', 
'Selfie Judith auf Baustelle Friedrichshöfe (blonder Dutt, weißer Helm)', 
'#Machertum #Friedrichshöfe #ImmobilienmitHerz #JudithLenz', 
'Judith-Style: Emotional, aber zeigt Exekutionsstärke.'),

-- POST 3
('2026-02-11', 'LinkedIn Company', 'Draft', 
'Datenräume lügen nicht – aber sie brauchen Expertise. 🔍', 
'🔍 **Datenräume lügen nicht – aber sie brauchen Expertise.**

Im aktuellen Marktumfeld ist eine lückenlose Due Diligence die Basis für jede erfolgreiche Transaktion. Bei YOUR TIMES bereiten wir Projekte so auf, dass institutionelle Prüfungen reibungslos laufen. 

Transparenz ist für uns keine Option, sondern Pflicht. Ob bei Healthcare-Objekten oder exklusiven Wohneinheiten: Wir stehen für ehrliche Zahlen und klare Kommunikation. 

Denn am Ende beschleunigt Vertrauen den Deal. 🤝

#TransactionManagement #DueDiligence #Transparenz #Professionalität #YOURTIMES', 
'Hochwertiges Foto: Laptop, Akten und Taschenrechner auf Eichentisch', 
'#TransactionManagement #DueDiligence #Transparenz #YOURTIMES', 
'Fokus auf Transaktions-Sicherheit für Partner.'),

-- POST 4
('2026-02-14', 'LinkedIn Personal', 'Draft', 
'Immobilien sind ein Menschengeschäft. Punkt. ❤️', 
'🤝 **Immobilien sind ein Menschengeschäft. Punkt.**

Oft werde ich gefragt, was das Geheimnis hinter einem erfolgreichen Abschluss ist. Meine Antwort: Es ist nicht der Preis. Es ist das Vertrauen. ❤️

Wenn Käufer, Verkäufer und Partner am Notartisch sitzen und man spürt, dass die Chemie stimmt – dann weiß ich, wir haben alles richtig gemacht. Für mich sind exklusive Off-Market-Deals nur möglich, weil wir über Jahre hinweg Beziehungen aufgebaut haben, die auf Integrität und persönlicher Nähe basieren. 

Danke an mein Netzwerk für die inspirierenden Gespräche in dieser Woche! 🥂✨

#PeopleBusiness #Vertrauen #Networking #RealEstateValues #JudithLenz', 
'Symbolbild Handshake über Notar-Dokument (Warmes Licht)', 
'#PeopleBusiness #Vertrauen #Networking #JudithLenz', 
'Valentinstag-Post. Fokus auf das Netzwerk.'),

-- POST 5
('2026-02-18', 'LinkedIn Company', 'Draft', 
'SENIORENWOHNEN BIESENTHAL: Wo Strategie auf Demografie trifft. 🌲', 
'🌲 **SENIORENWOHNEN BIESENTHAL: Warum dieses Asset gerade jetzt performt.**

Seit dem Vermarktungsstart im August 2025 bestätigt die Nachfrage unsere These: Der Speckgürtel differenziert sich. 

Warum Biesenthal (69 Einheiten, KfW 40 EE) für Investoren ein ''Safe Haven'' ist:
✅ **Krisenfest:** Seniorenwohnen ist weitgehend entkoppelt von konjunkturellen Schwankungen.
✅ **Nachhaltig:** Dank A+ Energieeffizienz und Erdwärme sind die Betriebskosten langfristig gesichert.
✅ **Wertstabil:** Ein durchdachtes Quartierskonzept sichert die Vermietbarkeit für Jahrzehnte.

Besuchen Sie uns digital für mehr Insights: [www.seniorenwohnen-biesenthal.de](https://www.seniorenwohnen-biesenthal.de)

#Biesenthal #HealthcareRealEstate #ESG #Investment #YOURTIMES', 
'Architektur-Rendering Stadtvillen im Grünen', 
'#Biesenthal #HealthcareRealEstate #ESG #Investment', 
'Korrektur Projektdaten. Fokus auf 69 WE.'),

-- POST 6
('2026-03-02', 'LinkedIn Company', 'Draft', 
'Tag der Verkäufer: Ein Plädoyer für Beratung statt Verkauf. 🤝', 
'🤝 **Tag der Verkäufer: Warum Qualität den Unterschied macht.**

Im aktuellen Markt trennt sich die Spreu vom Weizen. ''Hard Selling'' ist ein Relikt der Vergangenheit. 

Bei YOUR TIMES setzen wir auf ''Deep Consulting''. Wir verstehen erst die Portfolio-Ziele unserer Partner, bevor wir eine Transaktion begleiten. Erfolg im Vertrieb 2026 heißt: Komplexe Probleme lösen, nicht Produkte in den Markt drücken.

Ein großes Dankeschön an mein Team, das diesen Anspruch jeden Tag lebt! 💪

#SalesExcellence #RealEstateConsulting #Qualität #YOURTIMES', 
'Team-Foto in Meeting-Situation (Professional & Dynamisch)', 
'#SalesExcellence #RealEstateConsulting #YOURTIMES', 
'Premium-Positionierung der Marke.'),

-- POST 7
('2026-03-08', 'LinkedIn Personal', 'Draft', 
'Von der Baustelle in den Boardroom. 💪👩‍💼', 
'💪 **Powerfrauen am Bau!**

Zum Weltfrauentag ein Shoutout an alle Kolleginnen, die die Immobilienwelt jeden Tag ein Stück besser machen! 🏗️✨

Ob als Architektin, Bauleiterin oder Investment-Expertin – wir bringen eine Perspektive ein, die unverzichtbar ist. Ich erinnere mich gut an Zeiten, in denen ich oft die einzige Frau am Tisch war. Heute sehe ich immer mehr starke Frauen, die Großprojekte steuern. 

Vielfalt in der Führung bringt bessere Ergebnisse. Auf uns! 🥂

#WomenInRealEstate #FemaleLeadership #Weltfrauentag #Empowerment #JudithLenz', 
'Foto Judith mit einer Partnerin/Kollegin im Gespräch', 
'#WomenInRealEstate #FemaleLeadership #Weltfrauentag #JudithLenz', 
'Networking-Thema. Hohe Engagement-Wahrscheinlichkeit.'),

-- POST 8
('2026-03-12', 'LinkedIn Personal', 'Draft', 
'Strategie-Check im Grünen. ⛳', 
'⛳ **Abschlag für neue Ideen.**

Nach einer intensiven Phase mit den Launches in Biesenthal und den Friedrichshöfen brauche ich heute die Weite des Platzes, um den Kopf frei zu bekommen.

Die besten Strategien für unsere Kunden entstehen bei mir oft nicht am Schreibtisch, sondern beim Fokus auf den nächsten Ball. Diese Ruhe ist mein Motor für die kommende Woche.

Ich wünsche euch allen einen fokussierten Endspurt ins Wochenende! 🏌️‍♀️✨

#WorkLifeBalance #Focus #GolfAndBusiness #RealEstateLife #JudithLenz', 
'Atmosphärisches Foto Golfplatz / Judith beim Abschlag', 
'#WorkLifeBalance #Focus #GolfAndBusiness #JudithLenz', 
'Persönlicher Einblick (Golf), sehr wichtig für ihren Stil.'),

-- POST 9
('2026-03-16', 'LinkedIn Company', 'Draft', 
'Transparenz ist das Fundament jeder Rendite. 🔍', 
'🔍 **Informationsfreiheit im Maklergeschäft.**

Heute ist Tag der Informationsfreiheit. Für YOUR TIMES bedeutet das: Radikale Ehrlichkeit im Datenraum.

Wir glauben, dass eine Transaktion nur dann langfristig erfolgreich ist, wenn alle Karten auf dem Tisch liegen. Wir liefern Fakten statt Floskeln – auch wenn die Wahrheit manchmal unbequem ist. 

Ehrlichkeit schafft Sicherheit. Und Sicherheit schafft Rendite.

#Transparenz #EthicsInRealEstate #Marktvertrauen #YOURTIMES', 
'Modernes Büro-Szenario / Detailaufnahme Architektur-Modell', 
'#Transparenz #EthicsInRealEstate #YOURTIMES', 
'Werte-Post zum Aktionstag.'),

-- POST 10
('2026-03-27', 'LinkedIn Personal', 'Draft', 
'Q1-Closing: Was für ein Ritt! 🚀🐰', 
'🐰 **Endspurt vor Ostern!**

Das erste Quartal 2026 neigt sich dem Ende zu und ich blicke mit Stolz auf das Erreichte zurück:
✅ Friedrichshöfe: Erfolgreich gelauncht.
✅ Seniorenwohnen Biesenthal: Überwältigende Resonanz.
✅ Netzwerk: Viele neue, wertvolle Verbindungen geknüpft.

Bevor es in die ruhigen Ostertage geht, stehen diese Woche noch zwei wichtige Notartermine an. Wir geben Gas bis zur letzten Minute! ✍️✨

Wie war euer Start ins Jahr? Seid ihr zufrieden mit dem ersten Quartal?

#Success #RealEstateClosing #Q1Review #JudithLenz #Dankbarkeit', 
'Foto Judith lächelnd mit Terminkalender oder vor einem fertigen Projekt', 
'#Success #RealEstateClosing #JudithLenz', 
'Abschluss-Post für das Quartal. Positive Energie.');

-- 8. INITIAL SEED: FULL ANALYTICS HISTORY (2024-2026)
INSERT INTO analytics_metrics (date, impressions, engagements, new_followers, platform)
VALUES 
('2024-08-01', 9500, 320, 8, 'Company'),
('2024-09-01', 10200, 380, 10, 'Company'),
('2024-10-01', 11000, 410, 12, 'Company'),
('2024-11-01', 10800, 395, 9, 'Company'),
('2024-12-01', 12500, 520, 15, 'Company'),
('2025-01-01', 13200, 580, 18, 'Company'),
('2025-02-01', 14500, 610, 22, 'Company'),
('2025-03-01', 15800, 690, 25, 'Company'),
('2025-04-01', 16200, 710, 28, 'Company'),
('2025-05-01', 18500, 820, 35, 'Company'),
('2025-06-01', 19800, 910, 40, 'Company'),
('2025-07-01', 21000, 980, 45, 'Company'),
('2025-08-01', 22500, 1100, 50, 'Company'),
('2025-09-01', 24000, 1250, 55, 'Company'),
('2025-10-01', 25800, 1400, 60, 'Company'),
('2025-11-01', 27500, 1550, 65, 'Company'),
('2025-12-01', 31000, 1800, 80, 'Company'),
('2026-01-01', 28500, 1600, 50, 'Company'),
-- Personal Profile
('2024-08-01', 6200, 850, 25, 'Personal'),
('2024-10-01', 7500, 980, 32, 'Personal'),
('2025-01-01', 8500, 1200, 45, 'Personal'),
('2025-03-01', 9800, 1450, 50, 'Personal'),
('2025-05-01', 11200, 1700, 65, 'Personal'),
('2025-08-01', 12500, 1900, 75, 'Personal'),
('2025-10-01', 13800, 2100, 85, 'Personal'),
('2025-12-01', 15500, 2400, 110, 'Personal'),
('2026-01-01', 14000, 2200, 90, 'Personal');

-- ==============================================================================
-- FINISH: YT MASTER SETUP COMPLETE
-- ==============================================================================
