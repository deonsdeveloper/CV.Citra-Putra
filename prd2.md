Product Requirements Document (PRD)
CV. Citra Putra Mandiri — Company Profile Website
1. Executive Summary
Project Name: CV. Citra Putra Mandiri Company Profile Website
Industry: Industrial Water Treatment & Chemical Solutions
Objective: Transform the existing Blogspot presence into a modern, clean, and powerful company profile website that establishes credibility, showcases the full product catalog, and drives business inquiries.
Primary Background: Bone White (#F9F9F7)
Tech Stack: Node.js (Backend/API), Tailwind CSS (Styling), HTML5
Design Direction: Human-centric, organic layouts, anti-template. Inspired by PGNCOM's immersive hero + explore interaction.
2. Business Goals
Brand Elevation: Move from a basic blogspot to a professional digital presence that reflects industry expertise.
Product Showcase: Display all 28+ chemical products with clear categorization, descriptions, and specifications.
Lead Generation: Provide clear contact channels and inquiry forms for potential B2B clients.
Trust Building: Highlight company history, certifications, client portfolio, and technical capabilities.
SEO Performance: Rank for keywords related to industrial chemical supply, water treatment, boiler chemicals, cooling tower treatment in Indonesia.
3. Target Audience
Sheets
Segment	Description	Needs
Factory/Plant Managers	Decision makers in manufacturing, textiles, food & beverage	Reliable chemical supply, technical support, bulk pricing
Maintenance Engineers	Technical staff handling boilers, cooling towers, chillers	Product specifications, application guides, MSDS
Procurement Teams	Purchasing departments in industrial companies	Product catalogs, pricing, delivery terms
Distributors/Resellers	Local distributors looking for chemical suppliers	Partnership info, margin structures, product training
4. Tech Stack
Sheets
Layer	Technology	Purpose
Frontend	HTML5 + Tailwind CSS v3.4+	Utility-first styling, responsive design, custom animations
Backend	Node.js + Express	API routes, form handling, contact management
Build Tool	Vite	Fast development and optimized production builds
Icons	Lucide React / Heroicons	Consistent, lightweight iconography
Fonts	Inter + Playfair Display (Google Fonts)	Inter for UI, Playfair for editorial accents
Images	WebP format with fallbacks	Optimized loading performance
Deployment	Static hosting (Vercel/Netlify) or VPS	Fast global CDN delivery
5. Design System — Anti-AI, Human-Centric
5.1 Design Philosophy: "Organic Industrial"
What makes it NOT look AI-generated:
Asymmetrical layouts — Not every section is perfectly 2-col or 4-col grid. Some images overflow containers, text blocks have varied widths.
Mixed typography pairing — Inter (sans-serif) for body/UI + Playfair Display (serif) for large editorial headlines and quotes. Creates human editorial feel.
Organic shapes — Blob SVGs and soft curves instead of perfect circles/rectangles.
Subtle texture overlay — 2% noise/grain texture on bone white backgrounds to remove digital flatness.
Varied card sizes — Product cards are not all identical heights. Some are taller, some wider.
Overlapping elements — Images that break out of their containers, text that overlaps images slightly.
Hand-drawn accent lines — Underlines and dividers that are slightly imperfect (SVG stroke with variable width).
Photo-centric — Real photography dominates over icons. Icons are used sparingly.
Less badges, more breathing room — No teal badge overload. One subtle label per section max.
5.2 Color Palette
Sheets
Token	Hex	Usage
Bone White	#F9F9F7	Primary background, section backgrounds
Warm White	#F5F5F0	Alternate section background for rhythm
Navy Blue	#1B3A5C	Primary text, headings, nav, footer, CTA buttons
Teal	#0D9488	Accent color, highlights, active states, water-themed elements
Amber/Orange	#F59E0B	Secondary accent, CTAs, gear-inspired icons
Slate Gray	#64748B	Body text, descriptions, secondary content
Light Gray	#E2E8F0	Borders, dividers, card backgrounds
White	#FFFFFF	Card backgrounds, input fields, contrast elements
Dark Navy	#0F172A	Footer background, dark sections
Soft Teal Wash	#E6FFFA	Subtle background wash for featured sections
Warm Sand	#F5F0E8	Organic accent background
5.3 Typography
Sheets
Element	Font	Weight	Size (Desktop)	Size (Mobile)	Line Height
H1 (Hero Slide)	Playfair Display	700	64px	36px	1.1
H2 (Section)	Playfair Display	700	48px	32px	1.15
H3 (Card Title)	Inter	700	22px	18px	1.3
H4 (Subsection)	Inter	600	18px	16px	1.4
Body	Inter	400	16px	15px	1.75
Body Small	Inter	400	14px	13px	1.6
Caption	Inter	500	12px	11px	1.5
Button	Inter	600	14px	14px	1.0
Quote	Playfair Display	400 Italic	24px	18px	1.5
Nav Link	Inter	500	14px	14px	1.0
Stats Number	Playfair Display	700	48px	32px	1.0
Stats Label	Inter	600	11px	10px	1.4
5.4 Spacing Scale
Based on Tailwind's default spacing (4px base unit):
Section padding: py-24 (96px) desktop, py-16 (64px) mobile — VARIED, not all same
Container max-width: max-w-7xl (1280px)
Card gap: gap-8 (32px) — generous, not cramped
Component padding: p-8 to p-10
Asymmetrical offsets: Some elements have ml-12 or -mt-16 to break the grid
5.5 Border Radius
Sheets
Token	Value	Usage
Small	rounded-lg (8px)	Buttons, small elements
Medium	rounded-2xl (16px)	Cards, images
Large	rounded-3xl (24px)	Featured cards, hero containers
Organic	Custom SVG blob	Decorative background shapes
Full	rounded-full	Avatars, pills
5.6 Shadows — Soft & Diffused
Sheets
Token	Value	Usage
Soft	shadow-[0_8px_30px_rgb(0,0,0,0.04)]	Default card elevation
Medium	shadow-[0_12px_40px_rgb(0,0,0,0.08)]	Card hover state
Glow	shadow-[0_0_40px_rgba(13,148,136,0.15)]	Teal accent glow
Float	shadow-[0_20px_60px_rgb(0,0,0,0.12)]	Floating elements
5.7 Texture & Effects
Noise overlay: opacity-[0.015] noise PNG tiled across entire site for organic film grain feel
Soft gradient blobs: Large blurred teal/navy circles (blur-3xl, opacity 0.03) as background decoration
Hand-drawn underline: SVG stroke underline under H2 headings, slightly wavy
6. Site Architecture
plain
/
├── Home (Immersive Hero Slider + About + Stats + Services + Featured Products + Testimonials + CTA + Footer)
├── About Us
│   ├── Company History
│   ├── Vision & Mission
│   ├── Core Values
│   └── Team/Leadership
├── Products
│   ├── All Products (Grid/Filter)
│   ├── Categories:
│   │   ├── Cleaning & Degreasing
│   │   ├── Rust Treatment & Protection
│   │   ├── Cooling & Boiler Treatment
│   │   ├── Electrical & Insulation
│   │   └── Specialty Chemicals
│   └── Product Detail (Modal/Page)
├── Services
│   ├── Water Treatment Solutions
│   ├── Chemical Supply & Consulting
│   ├── Maintenance Support
│   └── Custom Formulation
├── Clients
│   └── Client Portfolio / Testimonials
├── Resources
│   ├── MSDS / Technical Data Sheets
│   └── Application Guides
└── Contact
    ├── Contact Form
    ├── Office Location / Map
    └── WhatsApp Quick Chat
7. Page Specifications
7.1 Homepage
Purpose: First impression, value proposition, conversion funnel
Layout: Single page with anchor navigation
Overall feel: Editorial magazine meets industrial catalog. Not a rigid grid.
SECTION 1: Immersive Hero Slider (PGNCOM-Style)
Layout: Fullscreen (100vh), no navbar visible initially (or transparent navbar)
Background: 3 slides with full-bleed photography + subtle gradient overlay
Interaction: Auto-slide every 6s, dot indicators, keyboard arrow navigation
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│  [NAV — transparent, white text]                                            │
│                                                                             │
│                                                                             │
│                                                                             │
│                    Solusi Kimia Industri                                    │
│                    Terpercaya & Berstandar                                  │
│                    Tinggi                                                     ← H1: Playfair Display 64px, white, centered
│                                                                             │
│     Melayani pengolahan air boiler, cooling tower, chiller, serta           │
│     kebutuhan pasokan kimia industri umum.                                  ← Subheadline: Inter 18px, white/80
│                                                                             │
│              [ Jelajahi Produk Kami ]                                       │
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│                         ↓                                                   │
│                    Explore More                                             │  ← Circle button, white border, bouncing animation
│                                                                             │
│                                                                             │
│                                                                             │
│                                                                             │
│     ●  ○  ○                                                                 │  ← 3 dot indicators, bottom center
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Slide 1 — "Solusi Kimia Industri"
Background: Full-bleed photo of industrial facility/chemical plant at golden hour
Overlay: bg-gradient-to-b from-black/30 via-transparent to-black/60
Headline: "Solusi Kimia Industri Terpercaya & Berstandar Tinggi"
Subheadline: "Melayani pengolahan air boiler, cooling tower, chiller, serta kebutuhan pasokan kimia industri umum."
CTA: "Jelajahi Produk Kami" — white bg, navy text, rounded-full, px-8 py-3
Slide 2 — "23+ Produk Unggulan"
Background: Full-bleed photo of chemical products arranged professionally (drums, pails)
Overlay: bg-gradient-to-b from-black/40 via-transparent to-black/50
Headline: "23+ Formulasi Kimia untuk Setiap Kebutuhan Industri"
Subheadline: "Dari pembersih coil hingga treatment boiler, semua tersedia dengan kualitas teruji."
CTA: "Lihat Katalog Lengkap" — white bg, navy text, rounded-full
Slide 3 — "Dukungan di Seluruh Indonesia"
Background: Full-bleed photo of Indonesian industrial landscape or delivery/logistics
Overlay: bg-gradient-to-b from-black/30 via-transparent to-black/60
Headline: "Dukungan Teknis & Pengiriman di Seluruh Indonesia"
Subheadline: "Tim ahli kami siap memberikan konsultasi lapangan dan pasokan berkelanjutan."
CTA: "Hubungi Tim Kami" — amber bg, navy text, rounded-full
Explore More Button:
Position: Bottom center, above dot indicators
Style: Circle, w-16 h-16, border 2px solid white/50, bg white/10, backdrop-blur
Icon: Arrow down, white, animated bounce (subtle, animate-bounce with custom easing)
Text below: "Explore More" — 12px, white/70, uppercase tracking-widest
Action: Smooth scroll to next section on click
Dot Indicators:
Position: Bottom center, bottom-8
Style: 3 dots, w-2.5 h-2.5, rounded-full
Active: bg white, scale-125
Inactive: bg white/40
Click to navigate to slide
Slider Transition:
Fade + slight scale (1.05 → 1.0), duration 1s, easing cubic-bezier(0.4, 0, 0.2, 1)
Ken Burns effect: slow zoom on each slide (scale 1.0 → 1.05 over 6s)
Navbar on Hero:
Transparent background, white text
On scroll past hero: transitions to white bg, navy text, shadow-sm
Transition: 0.3s ease
SECTION 2: About (Editorial Asymmetrical Layout)
Layout: Asymmetrical two-column — image takes 55% width, bleeds to edge on left. Text block overlaps image slightly (negative margin).
Background: Bone White #F9F9F7 with subtle noise texture
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌──────────────────────────────┐  ┌────────────────────────────┐          │
│  │                              │  │  Tentang Kami              │          │
│  │     [Large industrial        │  │  ────────                  │          │
│  │      photo, rounded-3xl      │  │                            │          │
│  │      on left edge]           │  │  Mitra Terpercaya          │          │
│  │                              │  │  Solusi Kimia Industri     │          │
│  │                              │  │                            │          │
│  └──────────────────────────────┘  │  Body text paragraph...    │          │
│         ↑ overlaps here            │                            │          │
│                                    │  [Feature list]            │          │
│                                    │                            │          │
│                                    │  [Selengkapnya →]          │          │
│                                    └────────────────────────────┘          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Left — Image:
Large industrial photo (factory, warehouse, or team)
rounded-3xl on right side only (or full rounded-3xl)
shadow-float
Slight rotation: -rotate-1 for organic feel
Optional: small floating card overlay with "15+ Tahun" badge
Right — Text:
Label: "Tentang Kami" — Inter 12px, teal, uppercase, tracking-widest. NO badge bg. Just text.
Headline: "Mitra Terpercaya Solusi Kimia Industri & Pengolahan Air" — Playfair Display 48px, navy
Hand-drawn underline SVG under headline (teal, wavy)
Body: Inter 16px, slate, max-width 480px (not full column width — more editorial)
Feature list: Not a grid. A vertical list with generous spacing:
"23+ Produk Kimia Teruji"
"Dokumen Resmi MSDS & TDS"
"Konsultasi Dosis Lapangan"
"Custom OEM Formulasi"
Each with a small teal dot (•) not a check icon. More minimal.
CTA: "Selengkapnya Tentang Kami →" — text-only link, navy, hover teal, with arrow that moves right on hover
SECTION 3: Stats Bar (Floating Card)
Layout: Card that breaks the section flow — overlaps both About and next section
Position: Negative margin top (-mt-16), centered
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│     ┌─────────────────────────────────────────────────────────────────┐     │
│     │                                                                 │     │
│     │   23+           5            100+           15+                 │     │
│     │   Produk       Kategori     Klien           Tahun               │     │
│     │   Kimia        Solusi       Pabrik &        Pengalaman          │     │
│     │   Unggulan     Industri     Industri        Technical           │     │
│     │                                                                 │     │
│     └─────────────────────────────────────────────────────────────────┘     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Card Style:
bg: white
rounded-3xl
shadow-medium
px-12 py-10
4 columns with generous internal spacing
Dividers: thin vertical lines bg-slate-100, not full height (60% height, centered)
Numbers: Playfair Display 700, 48px, navy
Labels: Inter 600, 11px, slate, uppercase, tracking-widest
No badges, no icons. Pure typography.
SECTION 4: Services (Masonry-Style Cards)
Layout: NOT a perfect 4-col grid. Asymmetrical.
Background: Warm White #F5F5F0
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│              Layanan Kami                                                   │
│              ───────────                                                    │
│     Solusi Kimia Industri Penunjang Operasional Pabrik                      │
│                                                                             │
│  ┌──────────────────┐  ┌────────────────────────────────────────┐           │
│  │                  │  │                                        │           │
│  │  Water Treatment │  │  Chemical Supply & Consulting          │           │
│  │  Solutions       │  │                                        │           │
│  │                  │  │  [wider card]                          │           │
│  │  [tall card]     │  │                                        │           │
│  │                  │  └────────────────────────────────────────┘           │
│  │                  │                                                       │
│  └──────────────────┘  ┌──────────────────┐  ┌──────────────────┐           │
│                        │                  │  │                  │           │
│                        │  Maintenance     │  │  Custom          │           │
│                        │  Support         │  │  Formulation     │           │
│                        │                  │  │                  │           │
│                        └──────────────────┘  └──────────────────┘           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Header:
Label: "Layanan Kami" — text only, teal, 12px, uppercase
Headline: "Solusi Kimia Industri Penunjang Operasional Pabrik" — Playfair Display 40px, navy
Subheadline centered below, max-width 600px
Cards:
Card 1 (Water Treatment): Taller card. Large icon (48px, teal) at top. Title: Inter 22px bold. Description: 14px slate. Bullet points with teal dots.
Card 2 (Chemical Supply): Wider card, spans more columns. Same style.
Card 3 & 4: Standard size.
All cards: bg white, rounded-2xl, shadow-soft, p-8
Hover: shadow-medium, translateY(-6px), 0.4s ease
No category badges. No "Learn More" buttons on every card. Just clean cards. Maybe one subtle "Pelajari →" link at bottom of each.
SECTION 5: Featured Products (Editorial Grid)
Layout: NOT uniform 4-col. Mixed grid: some cards span 2 columns, some are taller.
Background: Bone White #F9F9F7
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│              Produk Unggulan                                                │
│              ──────────────                                                 │
│     Rangkaian formulasi kimia terbaik untuk industri Anda                   │
│                                                                             │
│  ┌────────────────────────┐  ┌──────────────┐  ┌──────────────┐            │
│  │                        │  │  R 1011      │  │  R 1103      │            │
│  │  [Featured Product     │  │  Coil        │  │  Super       │            │
│  │   Image — large,       │  │  Cleaner     │  │  Degriser    │            │
│  │   spans 2 rows]        │  │              │  │              │            │
│  │                        │  │              │  │              │            │
│  │  R 1714                │  └──────────────┘  └──────────────┘            │
│  │  Safe Heavy Duty       │  ┌──────────────┐  ┌──────────────┐            │
│  │  Cleaner               │  │  R 1105      │  │  R 1522      │            │
│  │                        │  │  Multi       │  │  Electric    │            │
│  └────────────────────────┘  │  Purpose     │  │  Motor       │            │
│                              │  Cleaner     │  │  Cleaner     │            │
│                              └──────────────┘  └──────────────┘            │
│                                                                             │
│                         [ Lihat Semua Produk → ]                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Header:
Label: "Produk Unggulan" — text only, teal
Headline: "Rangkaian formulasi kimia terbaik untuk industri Anda" — Playfair Display
Product Cards:
Featured card (large): Spans 2 rows. Has product image (if available) or large teal block with product code. Product name in Playfair Display 28px. Full description visible.
Regular cards: Smaller. Product code in small teal text (no badge bg). Product name in Inter 18px bold. 2-line description. Packaging info at bottom in small gray text.
NO "Spesifikasi & Detail" buttons on every card. Instead: entire card is clickable. Hover shows subtle "Lihat Detail →" overlay.
Cards have varied heights for organic feel.
SECTION 6: Testimonials (Dark Editorial)
Layout: Full-width dark section. Large quote centered.
Background: Dark Navy #0F172A with subtle noise texture
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│          "                                                                │
│                                                                             │
│     Produk coil cleaner sangat efektif membersihkan sirip chiller          │
│     kami tanpa merusak aluminium. Tim teknis juga responsif."              │
│                                                                             │
│                                                                             │
│     ────────────────────────────────────────────────────────               │
│                                                                             │
│     [Foto]  Bapak Ahmad Rizal                                              │
│             Maintenance Manager, PT Textile Prima Nusantara                │
│                                                                             │
│                                                                             │
│                         ●  ○  ○                                            │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Style:
Large quote mark: Playfair Display 120px, teal, opacity 20%, absolute positioned
Quote text: Playfair Display 24px italic, white, max-width 700px, centered
Divider: thin line, teal/30, 80px wide, centered
Avatar: 56px, rounded-full, border-2 border-teal
Name: Inter 16px semibold, white
Position: Inter 14px, slate-400
Carousel: 3 testimonials, dot indicators
No card containers. Just text floating on dark background. More editorial.
SECTION 7: Client Marquee (Trust Strip)
Layout: Full-width, subtle
Background: Warm Sand #F5F0E8
Label: "Dipercaya oleh industri-industri terkemuka" — centered, 12px, slate, uppercase
Marquee row: Client logos/names in grayscale, scrolling infinitely
Speed: slow (40s per loop)
Pause on hover
Logos: 80px height, opacity 50%, hover opacity 100%
No card container. Just a strip.
SECTION 8: CTA Banner
Layout: Full-width, centered, generous padding
Background: Navy #1B3A5C with subtle organic blob shapes (teal, opacity 0.05)
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                                                                             │
│              Mari Berkolaborasi                                             │
│              untuk Industri yang                                            │
│              Lebih Baik                                                     │
│                                                                             │
│     Hubungi tim teknis kami untuk konsultasi produk dan                     │
│     penawaran khusus sesuai kebutuhan fasilitas Anda.                       │
│                                                                             │
│              [ Hubungi Kami Sekarang ]                                      │
│                                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Headline: Playfair Display 48px, white, centered
Subheadline: Inter 16px, white/70, centered, max-width 500px
Button: Amber bg, navy text, rounded-full, px-10 py-4, font-semibold
Headline broken into 3 lines intentionally for visual rhythm.
SECTION 9: Footer
Background: Dark Navy #0F172A
Layout: Asymmetrical 4-column. Not equal widths.
plain
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  [Logo]             │  │ Menu     │  │ Produk   │  │ Kontak   │        │
│  │  CV. Citra Putra    │  │ Cepat    │  │          │  │          │        │
│  │  Mandiri            │  │          │  │          │  │          │        │
│  │                     │  │          │  │          │  │          │        │
│  │  Penyedia bahan     │  │          │  │          │  │          │        │
│  │  kimia industri...  │  │          │  │          │  │          │        │
│  │                     │  │          │  │          │  │          │        │
│  │  [LinkedIn] [IG]    │  │          │  │          │  │          │        │
│  └─────────────────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                             │
│  ─────────────────────────────────────────────────────────────────────────  │
│  © 2026 CV. Citra Putra Mandiri. All rights reserved.                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
Col 1 (wider): Brand + description + social icons
Col 2-4: Standard link lists
Links: white/60, hover white, no underline
Bottom bar: white/10 border-top, 14px text
7.2 About Us Page
Purpose: Build trust and credibility
Layout: Editorial, photo-heavy
Sections:
Page Header: Full-bleed image with overlay, headline centered
Company Story: Asymmetrical layout — text on left (60%), image collage on right (40%) with 2-3 overlapping images
Vision & Mission: Two cards side by side, but with different heights. Vision card taller.
Core Values: Horizontal scroll on mobile, 4 cards on desktop. Each card has large number (01, 02, 03, 04) in Playfair Display, not icons.
Team Section: Grid of photos with names below, not in cards. Photos have varied aspect ratios (some square, some portrait).
7.3 Products Page
Purpose: Complete product catalog with filtering
Layout: Sidebar + main area, but sidebar is minimal
Layout:
Sidebar (desktop): Sticky, narrow. Category filters as text links (no checkbox UI). Active category has teal left border.
Main Area: Masonry grid of product cards. Cards have varied heights based on description length.
Product Cards (Anti-AI):
plain
┌─────────────────────────────┐
│  R 1011                     │  ← small teal text, NO badge bg
│                             │
│  Coil Cleaner               │  ← Inter 20px bold, navy
│                             │
│  Pembersih sirip coil...    │  ← 2-3 lines, slate
│                             │
│  Pail 20L · Drum 200L       │  ← small, slate-400, dot separator
│                             │
└─────────────────────────────┘
No "View Details" button. Entire card clickable.
Hover: card lifts, shadow appears, image (if any) scales slightly.
7.4 Services Page
Purpose: Explain service capabilities
Layout: Large feature sections, one per service. Not cards.
Each service is a full-width section with:
Large number (01, 02, 03, 04) in Playfair Display, teal, opacity 20%
Headline
Description
Bullet points
Image on alternating sides
7.5 Contact Page
Purpose: Convert visitors to leads
Layout: Asymmetrical — form on left (55%), info on right (45%)
Form:
Large inputs, generous padding (py-4 px-5)
Labels inside inputs (floating label pattern) or minimal labels above
Submit button: full width, navy, rounded-lg
No boxy feel. Soft shadows on inputs.
Right:
Contact info with icons, but icons are small and subtle
Map embedded, but with custom styling (grayscale or muted colors)
WhatsApp CTA: prominent, amber, sticky feel
8. Component Library — Anti-AI Styles
8.1 Buttons
Sheets
Variant	Style	Usage
Primary	bg-navy-800 text-white px-8 py-3 rounded-full hover:bg-navy-900 transition-all duration-300	Main CTAs
Secondary	border border-white/50 text-white px-8 py-3 rounded-full hover:bg-white/10 transition-all backdrop-blur-sm	Hero CTAs
Accent	bg-amber-500 text-navy-900 px-10 py-4 rounded-full hover:bg-amber-600 transition-all font-semibold text-base	Highlight CTAs
Ghost	text-navy-700 hover:text-teal-600 transition flex items-center gap-2 group	Text links
Circle	w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center hover:bg-white/10 transition-all backdrop-blur-sm	Explore More
8.2 Cards — Varied, Not Uniform
css
/* Base Card — Soft, not boxy */
.card-soft {
  @apply bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-500;
}
.card-soft:hover {
  @apply shadow-[0_12px_40px_rgb(0,0,0,0.08)] -translate-y-1.5;
}

/* Featured Card — Larger, more prominent */
.card-featured {
  @apply card-soft row-span-2;
}

/* Editorial Card — No border, just shadow */
.card-editorial {
  @apply bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10;
}
8.3 Typography Accents
Hand-drawn underline: SVG path under H2 headings. Teal color. Slightly wavy.
Large quote marks: Playfair Display 120px for blockquotes.
Editorial numbers: Playfair Display 700 for stats, section numbers (01, 02, etc.).
9. Animations & Interactions — Natural, Not Robotic
9.1 Global Animations
Sheets
Animation	Trigger	Specification
Fade In Up	Scroll into view	opacity: 0→1, translateY: 40px→0, duration: 0.8s, easing: cubic-bezier(0.16, 1, 0.3, 1)
Stagger Children	Section load	delay: index * 0.15s — slower, more natural than 0.1s
Smooth Scroll	Nav click / Explore More	scroll-behavior: smooth
Navbar Transform	Page scroll > 100px	bg-white/95 backdrop-blur-md shadow-sm, transition 0.4s
9.2 Hero Slider Animations
Sheets
Animation	Detail
Slide Transition	Fade + scale(1.05→1.0), duration 1.2s, easing: cubic-bezier(0.4, 0, 0.2, 1)
Ken Burns	Slow zoom on active slide: scale(1.0→1.08) over 6s
Text Reveal	Headline: translateY(30px)→0, opacity 0→1, delay 0.3s after slide change. Duration 0.8s.
CTA Reveal	translateY(20px)→0, opacity 0→1, delay 0.6s
Explore More	Continuous subtle bounce: translateY(0→8px→0), duration 2s, infinite, ease-in-out
9.3 Micro-interactions
Sheets
Element	Hover Effect
Product Card	translateY(-6px), shadow deepens, image inside scales 1.05
Button Primary	scale(1.02), brightness increase
Text Link with Arrow	Arrow translateX(6px)
Nav Link	Color to teal, no underline (clean)
Image	scale(1.03) within overflow-hidden container
Card (Service)	translateY(-4px), 0.4s ease
9.4 Scroll-Triggered Effects
Parallax (subtle): Background images in About section move at 0.5x scroll speed
Reveal: Elements fade in with slight upward movement as they enter viewport
Counter: Stats numbers count up from 0 when visible (duration 2.5s, easing: ease-out)
10. Responsive Design
Breakpoints
Sheets
Name	Width	Tailwind Prefix
Mobile	< 640px	Default
Tablet	640px - 1024px	sm:, md:
Desktop	1024px - 1280px	lg:
Wide	> 1280px	xl:
Mobile Adaptations
Hero: Single slide text, smaller headline (36px), CTA buttons stacked
About: Image stacks above text, no overlap
Stats: 2x2 grid, smaller numbers
Services: Single column, standard card sizes (masonry not needed)
Products: 2-column grid, featured card becomes standard
Testimonials: Single testimonial visible, swipeable
Footer: Single column, stacked
Explore More: Still visible, slightly smaller
11. SEO Requirements
Meta Tags (Per Page)
HTML
<title>CV. Citra Putra Mandiri | Industrial Water Treatment & Chemical Solutions</title>
<meta name="description" content="Leading supplier of industrial chemicals for boilers, cooling towers, chillers. 28+ products including cleaners, rust removers, water treatment chemicals.">
<meta name="keywords" content="industrial chemicals, water treatment, boiler chemicals, cooling tower, coil cleaner, rust remover, Indonesia">
<meta property="og:title" content="CV. Citra Putra Mandiri">
<meta property="og:description" content="Industrial Water Treatment & Chemical Solutions">
<meta property="og:image" content="/assets/og-image.jpg">
Structured Data
Organization schema
Product schema for each product
LocalBusiness schema for contact info
BreadcrumbList schema
Performance Targets
Lighthouse Performance: > 90
First Contentful Paint: < 1.5s
Time to Interactive: < 3.5s
Cumulative Layout Shift: < 0.1
12. Content Mapping (From Blogspot)
Products Extracted & Enhanced:
Sheets
Code	Name	Category	Key Description
R 1011	Coil Cleaner	Cleaning	Effective coil fin cleaning for chillers, AC fins, aluminum. Non-corrosive, water-mixable. Available in acid and base forms.
R 1103	Super Degriser Cleaner	Cleaning	Effective solvent for removing stains, grease, oil on metal, machinery, office equipment.
R 1105	Multi Purpose Cleaner	Cleaning	Versatile cleaner for oil and dirt on engine blocks, industrial equipment, factory floors. Water-mixable.
R 1106	Metal Protector	Rust Treatment	Oil-based anti-corrosion solvent for all metals and spare parts. Protects dies, moulding. Available in spray can.
R 1107	Mould Cleaner	Specialty	Removes carbon residue, oil, grease from mould surfaces. Available in spray can.
R 1109	Rust Remover	Rust Treatment	Removes rust from metal and spare parts. Non-damaging to metal surfaces. Water-mixable.
R 1521	Rust Converter	Rust Treatment	Specialized liquid for removing rust from metal and spare parts. Non-damaging, water-mixable.
R 1522	Electric Motor Cleaner	Cleaning	Specialized solvent for removing oil, grease, carbon from dynamo windings, electric motors. Available in spray can.
R 1523	Handsoap Cleaner	Cleaning	Effective hand cleaner for oil, grease, and dirt. Non-damaging to skin.
R 1524	Red Insulating Varnish	Electrical	Fast-drying red coating for insulation. For enamel wire winding and dynamo motor forming. Resistant to humidity, water, acid/alkali changes. Up to 3000 volt/mil.
R 1525	Clear Insulating Varnish	Electrical	Fast-drying transparent coating for insulating enamel wires used in electric motor dynamos. Prevents short circuits from humidity and chemical changes.
R 1527	Bowl Cleaner	Cleaning	Removes stubborn stains, scale, and dirt from mosaic, ceramic, and similar surfaces.
R 1528	Cutting and Tapping Oil	Specialty	Cooling and lubricating fluid for cutting, tapping, boring metal work. Ensures precise cuts and longer tool life.
R 1529	Fuel Oil Treatment	Specialty	Fuel additive for diesel fuel. Breaks down dirt clumps, sludge, acts as dispersant and rust inhibitor for boilers, generators, and diesel engines.
R 1710	Alga Inhibitor	Water Treatment	Specialized chemical to prevent and eliminate algae, bacteria in cooling towers, water cooling systems, swimming pools.
R 1711	Cooling & Boiling Treatment	Water Treatment	Chemical with inhibitor layer to prevent scale and rust on boilers, cooling towers, water cooling systems, swimming pools.
R 1712	Cooling Treatment	Water Treatment	Special formula with inhibitor to prevent scale and algae in cooling towers, chillers, etc.
R 1713	Scale Remover Powder	Water Treatment	Special powder formula for removing water scale from Ca, Mg, or seawater scale. For boilers, cooling towers, industrial floors, water pipes, coolers.
R 1714	Safe Heavy Duty Cleaner	Water Treatment	Chemical for destroying scale and rust on radiators, circulation pipes, chillers, cooling towers, oil coolers, boilers.
R 1716	Radiator Coolant	Water Treatment	Creates protective film as coolant for radiator circulation systems. Prevents scale and rust in cooling systems.
R 1831	Feel of Coating	Rust Treatment	Fast-drying coating for temporary metal and spare part protection. Prevents rust from air oxidation and humidity. Easily peeled off.
R 1833	Anti Spatter	Specialty	Liquid solution for cleaning piston holes, cutting welds from oxygen gas residue. Prevents spatter adhesion during welding. Water-mixable. Available in spray can.
R 1835	Spindel Oil	Specialty	Special silicone-containing liquid for lubricating and cleaning spindle machine dirt. Prevents corrosion on spindle machines. Prevents thread breakage. Available in spray can.
13. File Structure
plain
cv-citraputramandiri-website/
├── public/
│   ├── assets/
│   │   ├── logo.png
│   │   ├── logo-white.png
│   │   ├── hero/
│   │   │   ├── slide-1.jpg
│   │   │   ├── slide-2.jpg
│   │   │   └── slide-3.jpg
│   │   ├── products/
│   │   │   └── ... (product images)
│   │   ├── team/
│   │   ├── clients/
│   │   └── textures/
│   │       └── noise.png
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroSlider.jsx           ← NEW: PGNCOM-style 3-slide hero
│   │   ├── ExploreMore.jsx          ← NEW: Bouncing scroll indicator
│   │   ├── AboutSection.jsx
│   │   ├── StatsBar.jsx
│   │   ├── ServicesSection.jsx
│   │   ├── ProductsSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── ClientMarquee.jsx
│   │   ├── CTABanner.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── SectionHeader.jsx
│   │   ├── ContactForm.jsx
│   │   └── MobileMenu.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── products.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── vite.config.js
├── package.json
└── README.md
14. Tailwind Configuration
JavaScript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF2F7',
          100: '#D5DFEB',
          200: '#ABBFD7',
          300: '#819FC3',
          400: '#577FAF',
          500: '#2D5F9B',
          600: '#1B3A5C', // Primary Navy
          700: '#152E4A',
          800: '#0F2238',
          900: '#0F172A', // Dark Navy
        },
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488', // Primary Teal
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        amber: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B', // Primary Amber
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        bone: {
          50: '#FDFDFC',
          100: '#F9F9F7', // Primary Background
          200: '#F0EFEC',
          300: '#E6E5E1',
        },
        sand: '#F5F0E8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'ripple': 'ripple 8s linear infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'ken-burns': 'kenBurns 6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        ripple: {
          '0%': { transform: 'scale(1)', opacity: '0.05' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      boxShadow: {
        'soft': '0 8px 30px rgb(0, 0, 0, 0.04)',
        'medium': '0 12px 40px rgb(0, 0, 0, 0.08)',
        'float': '0 20px 60px rgb(0, 0, 0, 0.12)',
        'glow': '0 0 40px rgba(13, 148, 136, 0.15)',
      },
    },
  },
  plugins: [],
};
15. Implementation Checklist
Phase 1: Foundation (Week 1)
[ ] Set up project with Vite + Node.js + Tailwind CSS
[ ] Configure Tailwind with custom color palette + Playfair Display font
[ ] Set up folder structure and routing
[ ] Create base components (Navbar, Footer, Layout)
[ ] Implement responsive navigation with mobile menu
[ ] Build Hero Slider with 3 slides, Explore More button, dot indicators
Phase 2: Core Pages (Week 2)
[ ] Build Homepage with all sections (asymmetrical layouts)
[ ] Build About Us page (editorial, photo-heavy)
[ ] Create product data structure (products.js)
[ ] Build Products listing page with masonry grid
[ ] Build Product detail modal/page
Phase 3: Supporting Pages (Week 3)
[ ] Build Services page (large feature sections)
[ ] Build Contact page with form
[ ] Implement contact form backend (Node.js/Express)
[ ] Add Google Maps integration
[ ] Add WhatsApp click-to-chat
Phase 4: Polish & Optimization (Week 4)
[ ] Add scroll animations (Intersection Observer)
[ ] Add subtle noise texture overlay
[ ] Optimize images (WebP conversion)
[ ] Implement SEO meta tags and structured data
[ ] Performance optimization (lazy loading, code splitting)
[ ] Cross-browser testing
[ ] Mobile responsiveness testing
[ ] Lighthouse audit and fixes
Phase 5: Launch (Week 5)
[ ] Deploy to hosting (Vercel/Netlify/VPS)
[ ] Configure custom domain
[ ] Set up Google Analytics
[ ] Set up Google Search Console
[ ] Final content review with client
16. Success Metrics
Sheets
Metric	Target	Measurement
Page Load Time	< 3s	Lighthouse / WebPageTest
Mobile Score	> 90	Google Lighthouse
SEO Score	> 90	Google Lighthouse
Contact Form Submissions	+50% vs blogspot	Google Analytics
Bounce Rate	< 40%	Google Analytics
Average Session Duration	> 2 min	Google Analytics
17. Notes & Assumptions
Logo Usage: The uploaded logo (gear + water drop) will be used as the primary brand mark in navbar and footer. A white version may be needed for dark backgrounds.
Product Images: High-quality product photos will need to be provided or sourced. Placeholder images can be used during development.
Hero Images: 3 full-bleed hero images needed for slider (industrial facility, products, logistics/team).
Company Details: Specific founding year, client count, and team information to be provided by the client.
Contact Information: Exact address, phone numbers, and WhatsApp business number to be confirmed.
Blog Content: Existing blogspot posts can be migrated to a "News/Articles" section if needed (Phase 2).
Multi-language: Initial launch in Indonesian. English version can be added in Phase 2.
E-commerce: No online purchasing in Phase 1. Products are inquiry-based (B2B).
Anti-AI Feel: The design intentionally uses asymmetry, mixed fonts, organic shapes, and varied spacing to avoid the "perfect grid" look of AI-generated designs.
Document Version: 4.0 — Anti-AI Human-Centric Design with PGNCOM Hero Slider
Created: August 2026
Prepared for: CV. Citra Putra Mandiri