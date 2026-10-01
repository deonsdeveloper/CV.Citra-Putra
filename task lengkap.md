============================================================
FINAL VISUAL CORRECTION & PREMIUM POLISH
CV. CITRA PUTRA MANDIRI — ABOUT PAGE
============================================================

IMPORTANT:

Saya sudah melihat hasil implementasi About Page saat ini.

JANGAN melakukan redesign dari nol.

JANGAN mengubah struktur utama halaman.

Struktur saat ini SUDAH BAGUS dan harus dipertahankan.

Tugas sekarang adalah:

1. Memperbaiki masalah contrast
2. Memperbaiki background section
3. Memperkuat visual hierarchy
4. Memperbaiki Hero
5. Memperbaiki logo motion
6. Mengurangi kesan AI-generated template
7. Membuat dark section benar-benar DARK
8. Memperbaiki typography readability
9. Menambahkan motion yang lebih premium
10. Melakukan final responsive polish

============================================================
CURRENT PAGE STRUCTURE — KEEP THIS
============================================================

01 HERO

02 WHO WE ARE

03 OUR JOURNEY

04 BIG BRAND STATEMENT

05 WHAT WE DO

06 INDUSTRIES WE SERVE

07 VISION & MISSION

08 OUR VALUES

09 WHY CLIENTS TRUST US / METHODOLOGY

10 FINAL CTA


JANGAN menghapus section.

JANGAN menambahkan section yang tidak diperlukan.

JANGAN mengubah urutan section.


============================================================
CRITICAL ISSUE #1
HERO CONTRAST
============================================================

MASALAH SAAT INI:

Hero menggunakan:

white background

tetapi:

H1 = white
subtitle = very light
logo = berada di atas background terang

Akibatnya:

TEXT SULIT DIBACA.

INI HARUS DIPERBAIKI.

Gunakan HERO dengan:

DEEP NAVY / PRIMARY BRAND COLOR

bukan putih.

Contoh visual direction:

------------------------------------------------

DEEP NAVY BACKGROUND

01 / 09 • PROFIL KORPORASI
(teal)

Tentang CV.
Citra Putra Mandiri
(white)

Mitra strategis industri...
(light gray)

                         LOGO
                         CV.
                         CITRA PUTRA
                         MANDIRI

↓ GULIR UNTUK MENJELAJAHI

------------------------------------------------

Background harus solid dan premium.

JANGAN menggunakan:

- white background
- white gradient
- excessive blur
- glassmorphism
- factory photo


============================================================
HERO COLOR
============================================================

Gunakan warna brand existing.

Prioritas:

Deep Navy
Teal
White
Orange accent

Contoh:

background:
#071A2B / gunakan warna navy existing project

text:
#FFFFFF

secondary text:
rgba(255,255,255,0.72)

accent:
gunakan teal existing

orange:
gunakan hanya sebagai small accent.


============================================================
HERO LOGO
============================================================

Logo perusahaan yang sudah digunakan sekarang
SUDAH BENAR.

JANGAN mengganti logo.

JANGAN membuat logo baru.

Jadikan logo sebagai visual centerpiece.

Posisi desktop:

LEFT:
H1 + description

RIGHT:
large company logo

Logo harus lebih besar daripada sekarang.

Tetapi:

JANGAN terlalu besar sampai mendominasi H1.

Gunakan:

max-width:
360–460px desktop

Pada desktop:

logo berada di center-right.

Tambahkan subtle glow menggunakan
brand teal dengan opacity rendah.

BUKAN neon glow.


============================================================
LOGO MOTION
============================================================

Logo harus mempunyai motion.

Initial:

opacity:
0 → 1

scale:
0.92 → 1

translateY:
20px → 0

duration:
0.8s

easing:
easeOut


Setelah initial animation:

gunakan floating motion yang sangat halus.

translateY:

0
→
-8px
→
0

duration:

6 seconds

ease-in-out

infinite


Jika logo mempunyai elemen lingkaran/emblem:

BOLEH memberikan rotasi sangat lambat:

360deg

duration:

30–45 seconds

linear

infinite


JANGAN membuat:

- fast rotation
- bouncing
- spinning cepat
- glitch
- pulse berlebihan


============================================================
HERO DECORATION
============================================================

Tambahkan elemen visual ringan agar hero
tidak terlihat seperti hanya teks.

Gunakan CSS:

- thin technical lines
- subtle grid
- small circular nodes
- abstract engineering geometry

Opacity:

0.04–0.10

Elemen hanya dekoratif.

Jangan mengganggu readability.


============================================================
HERO TEXT ANIMATION
============================================================

Sequence:

0.0s
background

0.2s
badge

0.35s
title

0.55s
subtitle

0.75s
logo

1.0s
scroll indicator


Animation:

opacity
+
translateY(20px → 0)


Jangan menggunakan typing effect.


============================================================
CRITICAL ISSUE #2
BIG BRAND STATEMENT
============================================================

CURRENT ISSUE:

Section terlihat putih tetapi menggunakan
WHITE TEXT.

Akibatnya text hampir tidak terlihat.

WAJIB diperbaiki.

Section ini HARUS:

DEEP NAVY BACKGROUND.

Contoh:

--------------------------------------------

FILOSOFI LAYANAN KAMI

"Kami tidak hanya memasok
produk kimia.

Kami membantu menjaga
performa sistem industri
Anda."

--------------------------------------------

Background:
Deep Navy

Text:
White

Highlighted words:
Teal


============================================================
BIG STATEMENT VISUAL
============================================================

Gunakan:

background:
deep navy

small label:
teal

heading:
white

highlight:
teal

secondary text:
rgba(255,255,255,0.72)


Tambahkan:

subtle technical grid

atau

thin animated line.


============================================================
BIG STATEMENT ANIMATION
============================================================

Gunakan reveal per line.

Contoh:

line 1
fade + translateY

line 2
fade + translateY

line 3
fade + translateY

highlight text:
delay 100ms


Jangan menggunakan:

glitch
typing
bounce
spin.


============================================================
CRITICAL ISSUE #3
INDUSTRIES SECTION
============================================================

CURRENT ISSUE:

Section menggunakan white text
tetapi background putih.

WAJIB ubah menjadi:

DEEP NAVY BACKGROUND.


Layout:

--------------------------------------------

CAKUPAN SEKTOR

Dipercaya di Berbagai
Sektor Industri Strategis

description


01
Industri Manufaktur & Perakitan

02
Makanan & Minuman (F&B)

03
Tekstil & Garment

04
Pulp & Paper

05
Fabrikasi Logam & Baja

06
Pembangkit Energi & Utilitas

--------------------------------------------


Background:
Deep Navy

Heading:
White

Numbers:
Teal

Description:
rgba(255,255,255,0.68)


============================================================
INDUSTRIES INTERACTION
============================================================

Jangan gunakan cards.

Tetap editorial grid.

Setiap item:

border-bottom:
1px solid rgba(255,255,255,0.15)


Hover:

number:
teal

title:
white

underline:
teal

description:
opacity 1

Item lainnya:

opacity:
0.5


Transition:

300–400ms.


============================================================
CRITICAL ISSUE #4
FINAL CTA
============================================================

CURRENT ISSUE:

CTA masih menggunakan:

white background
+
white heading

Ini salah.

WAJIB:

DEEP NAVY BACKGROUND.


Contoh:

--------------------------------------------

PROFIL PERUSAHAAN

Menjaga Performa Sistem.
Melindungi Investasi Industri Anda.

Hubungi tim teknis kami untuk konsultasi awal
dan uji laboratorium air baku.

[ Hubungi Kami → ]
[ WhatsApp ]

--------------------------------------------

Background:
Deep Navy

Heading:
White

Description:
rgba(255,255,255,0.7)


Button 1:

Orange

Button 2:

Teal / brand green


============================================================
SECTION COLOR SYSTEM
============================================================

Gunakan rhythm berikut:

01 HERO
DARK NAVY

↓

02 WHO WE ARE
WHITE

↓

03 OUR JOURNEY
WHITE

↓

04 BIG BRAND STATEMENT
DARK NAVY

↓

05 WHAT WE DO
WHITE

↓

06 INDUSTRIES
DARK NAVY

↓

07 VISION & MISSION
WHITE

↓

08 OUR VALUES
WHITE

↓

09 METHODOLOGY
WHITE / very light neutral

↓

10 FINAL CTA
DARK NAVY


JANGAN membuat semua section white.

JANGAN membuat dark section
dengan background putih.


============================================================
CRITICAL ISSUE #5
TEXT CONTRAST
============================================================

JANGAN menggunakan:

light gray text
di atas white background

jika readability menjadi rendah.

Untuk LIGHT sections:

Heading:
Deep Navy

Body:
Dark gray / navy

Secondary:
#64748B atau warna existing
yang memiliki contrast cukup.

Accent:
Teal.


Untuk DARK sections:

Heading:
White

Body:
rgba(255,255,255,0.72)

Accent:
Teal

Number:
Teal

Jangan gunakan white text
dengan opacity terlalu rendah.


============================================================
WHAT WE DO
============================================================

Section ini secara struktur SUDAH BAGUS.

Pertahankan:

left editorial list

right supporting information.

Tetapi kurangi kesan "card template".

Bagian:

INTEGRITAS TEKNIS

boleh tetap menggunakan container,
tetapi:

- jangan terlalu rounded
- jangan terlalu banyak shadow
- gunakan border
- gunakan flat surface
- lebih editorial

Contoh:

border-left:
2px solid teal

background:
#F8FAFC

border-radius:
0–4px

shadow:
none / sangat minimal.


============================================================
OUR JOURNEY
============================================================

Section ini SUDAH BAGUS.

Pertahankan.

Tetapi timeline line harus lebih terlihat.

Gunakan:

thin line:

rgba(7,26,43,0.18)

Active milestone:

teal


Saat scroll:

line:
0 → 100%

milestones:

01 → 02 → 03 → 04


Gunakan stagger.


============================================================
WHO WE ARE
============================================================

Section ini sudah cukup baik.

Jangan ubah besar-besaran.

Pertahankan:

LEFT:
large statement

RIGHT:
company story

BOTTOM:
15+
100+
28+


Statistics:

gunakan count-up.

15+
100+
28+


Tambahkan small line animation
saat statistic muncul.


============================================================
VISION & MISSION
============================================================

Pertahankan editorial split layout.

LEFT:

VISI PERUSAHAAN

large quotation.

RIGHT:

MISI KAMI

01
02
03


Tidak perlu card.

Gunakan:

divider horizontal.

Mission item:

hover → teal number.

============================================================
OUR VALUES
============================================================

Pertahankan:

01 Kualitas Teruji
02 Respon Cepat
03 Integritas Tinggi
04 Fokus Solusi


Jangan card.

Gunakan:

editorial 4-column layout desktop.

Divider atas.

Number besar.

Hover:

number → teal

title → navy

description → visible.


============================================================
METHODOLOGY
============================================================

CURRENT VERSION:

4 cards.

Ini masih sedikit terasa seperti
AI-generated card layout.

UBAH menjadi:

editorial numbered process.

Contoh:

01
ANALISIS AIR
Uji parameter air baku...

────────────

02
FORMULASI & DOSIS
Rekomendasi...

────────────

03
PASOKAN & KEPATUHAN
...

────────────

04
MONITORING RUTIN
...


Jika tetap menggunakan 4-column
karena layout desktop:

hilangkan shadow.

hilangkan border radius besar.

gunakan flat white.

Gunakan hanya:

border-left: 1px teal


============================================================
NAVBAR
============================================================

NAVBAR SUDAH BAGUS.

Jangan redesign.

Pertahankan:

logo
navigation
language
contact button.

Active:

Tentang Kami

teal underline.


============================================================
FLOATING BUTTON
============================================================

Back to top dan WhatsApp
SUDAH BAIK.

Pertahankan.

Jangan mengubah fungsi.

Pastikan:

z-index tinggi

tidak menutupi content.

Mobile:

position fixed
bottom safe-area.


============================================================
MOTION SYSTEM
============================================================

Gunakan motion secara konsisten.

GLOBAL:

section reveal:

opacity:
0 → 1

translateY:
24px → 0

duration:
0.7s

ease:
easeOut


STAGGER:

100–150ms


Hover:

transform:
translateY(-2px)

atau

translateX(4px)


Tidak perlu:

bounce
rotate
glitch
excessive scale.


============================================================
SCROLL PROGRESS
============================================================

Tambahkan jika sesuai dengan existing system:

small progress indicator
di sisi kanan atau top.

Progress:

0% → 100%

Gunakan:

teal.

Sangat subtle.

Jika implementasinya mengganggu UX:

JANGAN digunakan.


============================================================
BACKGROUND TECHNICAL DETAILS
============================================================

Untuk membuat website terasa
lebih "industrial engineering":

gunakan CSS-only decorative elements:

- grid
- lines
- circles
- crosshair
- thin borders
- measurement marks

Opacity:

0.03–0.08


Contoh:

+----------------------+
|                      |
|   technical grid     |
|                      |
+----------------------+

Jangan menggunakan:

3D factory
stock photo
AI generated image.


============================================================
TYPOGRAPHY
============================================================

Pertahankan font existing jika sudah sesuai.

Jika sudah menggunakan font modern
seperti Inter / Manrope / Plus Jakarta Sans,
jangan mengganti tanpa alasan.

Hierarchy:

H1:
56–84px desktop

H2:
42–60px

H3:
22–30px

Body:
16–18px

Small label:
11–13px

Letter spacing label:

0.18em – 0.25em


Jangan membuat body text terlalu tipis.


============================================================
SPACING
============================================================

Gunakan whitespace besar.

Section:

padding-top:
120–160px desktop

padding-bottom:
120–160px desktop


Mobile:

padding:
72–96px


Jangan membuat section terlalu pendek.


============================================================
MOBILE
============================================================

WAJIB cek:

320px
360px
375px
390px
414px
430px


Hero:

dark navy.

Logo:

center / top.

Title:

white.

No overflow.


Dark sections tetap dark.

Jangan sampai CSS responsive
mengubah background dark menjadi white.


============================================================
MOBILE HERO
============================================================

Urutan:

badge

logo

title

description

scroll indicator


Logo:

width:
180–240px

H1:

clamp(40px, 11vw, 58px)


============================================================
ACCESSIBILITY
============================================================

Semua text harus memiliki
contrast yang cukup.

Jangan menggunakan opacity
yang menyebabkan readability buruk.

Pertahankan:

keyboard navigation
focus states
ARIA
semantic HTML
prefers-reduced-motion.


============================================================
IMPORTANT — DO NOT CHANGE CONTENT
============================================================

Jangan mengarang data perusahaan.

Jangan mengubah:

15+
100+
28+

kecuali data existing memang berbeda.

Jangan menambahkan:

fake clients
fake certification
fake awards
fake employee numbers
fake factory names.


============================================================
IMPORTANT — DO NOT BREAK EXISTING FEATURES
============================================================

Jangan merusak:

- navbar
- routing
- language switcher
- WhatsApp
- contact button
- mobile menu
- back-to-top
- SEO
- security
- API
- backend


============================================================
FINAL VISUAL TARGET
============================================================

Saya ingin hasil akhir terasa seperti:

PREMIUM INDUSTRIAL CORPORATE WEBSITE

dengan karakter:

- clean
- sophisticated
- technical
- trustworthy
- mature
- professional
- editorial
- premium

BUKAN:

- SaaS
- startup
- dashboard
- template
- AI-generated landing page


============================================================
FINAL COLOR CHECK
============================================================

SEBELUM SELESAI, PASTIKAN:

HERO:
DARK NAVY ✓

WHO WE ARE:
WHITE ✓

OUR JOURNEY:
WHITE ✓

BIG BRAND STATEMENT:
DARK NAVY ✓

WHAT WE DO:
WHITE ✓

INDUSTRIES:
DARK NAVY ✓

VISION & MISSION:
WHITE ✓

OUR VALUES:
WHITE ✓

METHODOLOGY:
WHITE / LIGHT ✓

FINAL CTA:
DARK NAVY ✓


============================================================
FINAL QA
============================================================

Setelah selesai:

1. npm run build

2. Check console errors

3. Check horizontal overflow

4. Check all text contrast

5. Check Hero readability

6. Check dark section readability

7. Check logo animation

8. Check scroll animation

9. Check mobile layout

10. Check navbar

11. Check WhatsApp

12. Check language switching

13. Check accessibility

14. Check security

15. Check performance


============================================================
FINAL INSTRUCTION
============================================================

JANGAN menganggap:

"npm run build berhasil"

berarti pekerjaan selesai.

Lakukan VISUAL REVIEW.

Fokus terbesar sekarang adalah:

CONTRAST
BACKGROUND
TYPOGRAPHY
LOGO
MOTION
VISUAL HIERARCHY

Jika ada section dengan:

WHITE TEXT
+
WHITE BACKGROUND

MAKA ITU BUG VISUAL
dan WAJIB DIPERBAIKI.

Jika ada section yang seharusnya dark
tetapi background masih putih:

WAJIB DIPERBAIKI.

Jangan berhenti sebelum seluruh halaman
memiliki contrast yang jelas dan konsisten.

Hasil akhir harus terlihat seperti
website resmi perusahaan industri profesional,
bukan template AI.