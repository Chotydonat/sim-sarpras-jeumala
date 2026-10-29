# UI/UX HIGH-RESOLUTION DESIGN PROMPT: SIM-SARPRAS MTs JEUMALA AMAL
## Luminous Sky-Sapphire & Origami 3D Neumorphic Design Specification for Google Stitch AI

```text
Design a complete high-resolution, production-grade visual UI/UX for SIM-SARPRAS MTs JEUMALA AMAL (Madrasah Tsanawiyah Jeumala Amal Lueng Putu, Pidie Jaya - Aceh).
SIM-SARPRAS is an integrated cloud-based facility and asset management platform for an Islamic secondary school with 43 rooms (30 classrooms VII-1 to IX-10, 6 Computer Labs, Science Lab, Sports facilities, and offices) serving 1,050 students. Key capabilities include an ultra-clean public landing page, an emergency WhatsApp maintenance dispatcher for homeroom teachers (handling broken lights, fans, electrical shorts), digital QR-code asset tagging, and official PDF Daftar Inventaris Ruang (DIR) printing.

## Design Identity
- Style: Luminous Clean Sky-Sapphire Blue & Origami 3D Neumorphism (Inspired by ultra-clean geometric travel/fintech portals with floating elevated cards, soft multi-layer shadows, pill tabs, and origami papercraft accents).
- Aesthetic: Fresh, luminous, trustworthy, and modern academic elegance. Crisp white floating containers over an ice-blue tint background, glowing pill tabs, 3D folded geometry accents, and high-contrast typography.
- Color Palette:
  Primary Sapphire: #0284C7 (Vibrant Sky/Sapphire Blue for primary buttons, active tabs, hero gradient)
  Primary Deep: #0369A1 (Deep Azure for hover states, active borders, and emphasis)
  Accent Royal: #1D4ED8 (Rich Royal Blue for banner cards and category headers)
  Accent Emergency: #EF4444 (Crimson Red for emergency broken lamp/fan/electrical alerts)
  Accent Gold/Prestige: #F59E0B (Amber Gold for madrasah achievements and priority highlights)
  Accent Success: #10B981 (Emerald Green for 100% Ready KBM status and verified assets)
  Canvas Background: #F0F7FF (Soft Ice Blue tint, giving a light, breezy, and uncluttered feel)
  Surface / Cards: #FFFFFF (Pure Crisp White with high elevation and rounded corners)
  Surface Soft: #E8F2FE (Secondary soft blue surface for widget tabs and table headers)
  Text Primary: #0F172A (Deep Slate Charcoal for razor-sharp readability)
  Text Secondary: #64748B (Muted Slate for subtitles, meta tags, and serial numbers)
  Border / Divider: #E2E8F0 (Subtle border) and rgba(2, 132, 199, 0.15) (Active glowing outline)
- Typography:
  Primary Font: 'Plus Jakarta Sans', sans-serif (Clean geometric shapes, optimal for digits & serial numbers)
  Display Accent: 'Plus Jakarta Sans', font-weight 700 with subtle italic sub-headlines
  Font Scale: Display H1 (44px/52px, 800), H2 (28px/36px, 700), H3 (20px/28px, 600), Body (14px/20px, 400-500), Small/Meta (12px/16px, 500)
- Icons: Lucide Icons (outline 1.75px stroke) combined with 3D Glossy Origami Pebble Icons for hero features.
- Corner Radius: 24px for large hero widgets, 16px for content cards, 12px for form inputs, 9999px (full-pill) for action buttons and navigation links.
- Elevation & Shadow:
  Floating Hero Widget: 0 20px 45px -10px rgba(2, 132, 199, 0.18), 0 0 0 1px rgba(255, 255, 255, 0.8) inset
  Standard Cards: 0 10px 25px -5px rgba(2, 132, 199, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)
  Hover State: 0 16px 36px -4px rgba(2, 132, 199, 0.16) + translateY(-4px)
- Base Grid: 8px spacing system, container max-width 1240px.

## Application Overview
The application consists of 5 unified visual modules:
1. Public Interactive Landing Page & Mobile Breakpoint (Showcase, quick multi-tab widget, 43 rooms catalog, emergency WA dispatcher)
2. Authentication & Access Gateway (Google Workspace SSO & Homeroom Teacher Quick PIN Access)
3. Homeroom Teacher & Room PIC Inspection Dashboard (Stock Opname, damage report, DIR download)
4. Admin Sarpras Executive Management Console (Analytics dashboard, 43 rooms mapping, asset register, batch QR generator)
5. Work Order Workspace & Official DIR PDF Document Preview

---

## Detailed Page Specifications

### 1. PUBLIC INTERACTIVE LANDING PAGE (DESKTOP)
Full-width ultra-clean landing page with layered depth and origami geometric flair.
- Sticky Floating Header (Height: 72px):
  - Floating white glassmorphism bar (background: rgba(255,255,255,0.92), backdrop-filter: blur(12px), border: 1px solid rgba(2,132,199,0.12), border-radius: 9999px, margin: 16px auto, max-width: 1200px, padding: 0 28px).
  - Left: Logo icon [origami geometric crest] in #0284C7 + text "SIM-SARPRAS" (18px, bold, #0F172A) + small badge "MTs Jeumala Amal" (#0284C7, bg: #E8F2FE).
  - Center: Pill menu items: "Beranda" (Active: #0284C7 font-weight 600 with bottom blue dot), "43 Ruangan", "Inventaris", "Lapor Cepat (WA)", "Lacak Tiket", "Tentang".
  - Right: Full-pill CTA button: "Masuk Portal 👤" (border: 1.5px solid #0284C7, text: #0284C7, hover bg: #0284C7, hover text: #FFFFFF, transition: all 0.25s).
- Hero Section (Height: ~600px):
  - Background: Crisp sky-blue gradient (#E0F2FE to #F0F7FF) with soft white polygonal origami cloud patterns and subtle light rays.
  - Left Column (55%):
    - Pill Badge: #0284C7 text on white pill with shadow: "⚡ SISTEM SARPRAS DIGITAL TERPADU"
    - Main Title H1: "SARPRAS MODERN MTs JEUMALA AMAL" (46px, 800, #0F172A, tracking -0.02em).
    - Subtitle Italic: "Aset Terjaga, Belajar Nyaman, Madrasah Hebat." (22px, 600, #0284C7, font-style: italic).
    - Paragraph: "Sistem Informasi Sarana & Prasarana MTs Jeumala Amal Lueng Putu. Mengelola 43 ruangan, 1.050 santri, dan layanan cepat tanggap perbaikan kelas via WhatsApp."
    - Button Group: Primary filled pill button "Jelajahi 43 Ruangan ↗" (#0284C7, text: #FFFFFF, shadow: 0 8px 20px rgba(2,132,199,0.35)) + Outline pill button "Lapor Kerusakan (WA) 🚨" (border: 2px solid #EF4444, text: #EF4444, bg: #FFFFFF).
  - Right Column (45%):
    - 3D Visual Rendering: Low-poly origami paper aircraft soaring upward over modern geometric architectural motifs representing the madrasah campus against a bright sky.
- Floating Multi-Tab Action Widget (Overlapping Hero, Signature Element):
  - Position: Half-overlapping bottom of Hero section, white card with 24px corner radius, shadow 0 20px 45px rgba(2,132,199,0.18).
  - Top Tabs: Rounded folder-tab style protruding from top of card:
    - Tab 1 (Active): "🚨 Lapor Cepat / Tiket WA" (White card background, text: #0284C7, font-weight 700, icon: AlertCircle, elevated above card).
    - Tab 2: "🔍 Cari Aset & Ruangan" (bg: #E8F2FE, text: #64748B, icon: Search).
    - Tab 3: "📦 Peminjaman Alat KBM" (bg: #E8F2FE, text: #64748B, icon: Package).
    - Tab 4: "🎫 Lacak Status Tiket" (bg: #E8F2FE, text: #64748B, icon: Ticket).
  - Active Tab Form Grid (4 Columns):
    - Column 1: Label "Ruangan Terkendala", Dropdown styled select "Pilih dari 43 Ruangan (Kelas VII-1 s/d IX-10, Lab 1-6...)" with map-pin icon.
    - Column 2: Label "Tingkat Prioritas", 3 Touch Pills: "🟢 Biasa" | "🟡 Sedang" | "🔴 Mendesak" (Active red pill has pulsing radar glow).
    - Column 3: Label "Uraian Kerusakan", Input placeholder "Lampu padam, kipas angin mati, konslet...".
    - Column 4: Primary Action Button: "Kirim Tiket WhatsApp 🚀" (bg: linear-gradient(135deg, #0284C7, #0369A1), text: #FFFFFF, full-pill, full width, shimmer sweep animation).
- Row of 4 Floating Pebble Feature Cards (Glass-Neumorphism):
  - Card 1: 3D glossy blue icon [School], Title "43 Ruangan Terdata", Subtext "30 Kelas, 6 Lab Komp, Lab IPA, 2 Lapangan".
  - Card 2: 3D glossy lightning icon [Zap], Title "Respon Cepat < 2 Jam", Subtext "Penanganan darurat lampu & kelistrikan kelas".
  - Card 3: 3D glossy QR shield icon [ShieldCheck], Title "QR Code Terstandar", Subtext "Pelacakan no. inventaris & dana BOS/Komite".
  - Card 4: 3D glossy user network icon [Users], Title "43 Penanggung Jawab", Subtext "Wali Kelas VII-1 s/d IX-10 & Kepala Lab".
- 43 Rooms Featured Catalog (Grid "Popular Facilities"):
  - Section Header: Left title "Fasilitas & Ruangan Madrasah" (28px, 800) + Right link "Lihat Semua 43 Ruangan →" (#0284C7).
  - Filter Category Tabs: Pill-shaped filters [Semua (43)] [Kelas VII (10)] [Kelas VIII (10)] [Kelas IX (10)] [Lab Komputer (6)] [Fasilitas & Lab IPA (7)].
  - 4-Card Interactive Showcase Grid:
    - Card: White surface, 16px radius, hover 3D tilt + border spotlight glow.
    - Image Banner: HD photo of classroom / lab with rounded top corners + corner fold tag "100% Siap KBM" (bg: #10B981, text: #FFFFFF, 11px bold).
    - Body: Title "Kelas IX-1 (Gedung Putra Lt. 2)" (18px, 700), Location subtext "Kampus Terpadu Lueng Putu".
    - Meta Row: "PJ: Ust. Zulkifli, S.Pd (Wali Kelas)" + "48 Item Aset".
    - Bottom Action: Circular blue arrow button (#0284C7, hover: #0369A1, text: #FFFFFF, diameter: 36px) that expands asset inspection modal.
- Service Priority Tiers Section (Navy Backdrop Banner):
  - Background: Royal Sapphire Gradient (#0284C7 to #1D4ED8) with subtle geometric origami facets in background.
  - Section Header: White title "Tingkat Prioritas Layanan Sarpras", white subtitle "SLA penanganan terstandar demi kenyamanan belajar 1.050 santri".
  - 4 Folded Cards Side-by-Side:
    - Card 1: "Prioritas Rutin" - Pengecatan kusam, perawatan meja/kursi siswa. Outline button.
    - Card 2: "Prioritas Sedang" - Pintu seret, stopkontak meja longgar, whiteboard. Outline button.
    - Card 3 (Featured Card - Most Reported / Fast Track): Elevated by 16px with glowing white border and gold badge "FAST TRACK EMERGENCY" - Bola lampu KBM mati, kipas angin mati di cuaca panas, sekering konslet, AC bocor. Filled Crimson Button (#EF4444) "Lapor Emergency via WA".
    - Card 4: "Usulan Pengadaan" - Usulan aset baru semester depan (BOS/Komite). Outline button.
- 4-Step Process Timeline ("Alur Pelaporan & Perbaikan"):
  - 4 Connected horizontal steps with arrows & 3D origami icons:
    - Step 1: "1. Pilih Ruangan" (Wali kelas memilih ruangan kelas/lab).
    - Step 2: "2. Foto Kendala" (Ambil foto kerusakan langsung dari kamera HP).
    - Step 3: "3. Kirim ke WhatsApp" (Format otomatis terkirim ke WhatsApp teknisi).
    - Step 4: "4. Ruangan Nyaman Kembali" (Teknisi tiba membawa suku cadang pengganti).
- Bottom Deep Blue Metric Counter Bar:
  - Deep Navy background (#0B192C to #0F2847), full width, 120px height.
  - Left Stat Counters (Large 36px bold white numbers with sky-blue captions):
    - "1.050+" Santri Putra & Putri | "43" Ruangan Terkelola | "30" Ruang Kelas Digital | "< 2 Jam" Respon Darurat Sarpras.
  - Right Testimonial Origami Box: White origami quote card with 5 golden stars: "Komitmen kami menghadirkan sarana terbaik untuk kenyamanan belajar santri Jeumala Amal." - Kepala Madrasah.

---

### 2. MOBILE BREAKPOINT (SMARTPHONE 390px VIEWPORT)
Optimized for Homeroom Teachers & Lab Heads on mobile devices.
- Sticky Top App Bar: White glassmorphic, Logo crest + "SIM-SARPRAS", Quick red SOS pill "Lapor WA", Hamburger menu icon.
- Mobile Hero Card: Luminous sky-blue card with rounded 20px corners, bold heading "SIM-SARPRAS JEUMALA", Emergency Action Banner "🚨 Ada Lampu/Kipas Mati di Kelas Anda? Ketuk Di Bawah".
- One-Thumb Fast Ticket Form:
  - Large dropdown: "Ruangan Anda (Contoh: Kelas VIII-3)" (Height: 48px).
  - Priority touch buttons (Segmented pill): [Biasa] [Sedang] [🔴 MENDESAK (Lampu/Kipas)].
  - Dotted camera box: "Ketuk untuk Foto Langsung dari Kamera HP" with camera icon and image preview thumbnail.
  - Sticky Bottom Action CTA: Full-width vibrant green/blue pill button (Height: 52px, shadow: 0 10px 25px rgba(2,132,199,0.35)): "[icon: WhatsApp] KIRIM TIKET PERBAIKAN SEKARANG".

---

### 3. AUTHENTICATION & ACCESS GATEWAY MODAL
Centered clean auth card (Width: 460px, radius: 24px, background: #FFFFFF, shadow: 0 25px 60px rgba(2,132,199,0.2)).
- Madrasah emblem at top center + H2 "Portal SIM-SARPRAS Jeumala".
- Subtitle: "Silakan pilih metode akses sesuai kewenangan Anda di madrasah."
- Primary Action: Large Google SSO button (border: 1.5px solid #E2E8F0, icon: Google multicolor, text: "Masuk dengan Akun Google Madrasah", height: 48px, radius: 9999px).
- Elegant divider with centered text: "ATAU AKSES CEPAT WALI KELAS / PJ RUANG".
- Form fields:
  - Select: "Pilih Ruangan Tanggung Jawab (30 Kelas / 6 Lab / TU)"
  - Password Input: "PIN / Kode Akses Wali Kelas" with show/hide eye icon.
  - Checkbox: "Simpan sesi di HP/perangkat ini".
- Primary Submit: "Masuk Sebagai Penanggung Jawab Ruang" (bg: #0284C7, text: #FFFFFF, height: 46px, radius: 9999px).

---

### 4. HOMEROOM TEACHER & ROOM PIC INSPECTION MODE (STOCK OPNAME)
Mobile & tablet friendly dedicated workspace for 30 Homeroom Teachers (Wali Kelas VII-1 s/d IX-10) and Lab Heads.
- Header Banner: Luminous soft-blue card (#E8F2FE) with room badge "RUANG KELAS VIII-3 (GEDUNG PUTRA LT. 2)", PIC Avatar + "Ust. Ahmad Fauzi, S.Pd (Wali Kelas)".
- Quick Action Toolbar:
  - Button "Verifikasi Semua Baik" (bg: #10B981, text: #FFFFFF, radius: 9999px).
  - Button "Lapor Barang Rusak" (bg: #EF4444, text: #FFFFFF, radius: 9999px).
  - Button "Unduh Lembar DIR (PDF)" (outline #0284C7, radius: 9999px).
- KPI Counter Bar: 42 Total Barang | 39 Kondisi Baik (#10B981) | 3 Rusak/Perlu Servis (#EF4444).
- Interactive Asset Item Cards (List View):
  - Normal Item Card: White card, left green indicator line, Item name "LCD Proyektor InFocus IN112AA", No. Inv: "012/MTs-JA/BOS/2023", Status Pill: "Baik" (bg: #DCFCE7, text: #166534), Action: "Laporkan Kendala".
  - Flagged Urgent Item Card: White card with glowing red border, Item name "Kipas Angin Dinding Regency 18\" (Unit 2)", Status Pill: "Rusak Berat - Mati Total" (bg: #FEE2E2, text: #991B1B), Note: "Mati mendadak saat KBM berlangsung dan mengeluarkan bau terbakar", Action button: "Lihat Tiket WA #FIX-023".

---

### 5. EMERGENCY WORK ORDER & LIVE WHATSAPP DISPATCH MODAL
2-Column split modal (Width: 840px, radius: 24px, background: #FFFFFF, shadow: 0 30px 70px rgba(0,0,0,0.25)).
- Left Column (Form Inputs, 55%):
  - Title: "Lapor Cepat Kerusakan Sarpras Ruangan"
  - Auto-detected location badge: "📍 Kelas VIII-3 (Gedung Putra Lt. 2)"
  - Priority Radio Buttons:
    - 🟢 Biasa (Estetika & mebeler)
    - 🟡 Sedang (Pintu seret & meja)
    - 🔴 Mendesak / Emergency (Lampu padam, kipas angin mati, konslet)
  - Textarea: Uraian kendala & dampak terhadap KBM santri.
  - Image Dropzone: Dotted box with uploaded thumbnail preview (badge: "240 KB - Terkompresi Otomatis").
- Right Column (Simulated Live WhatsApp Chat Bubble, 45%):
  - Header: WhatsApp Green (#075E54) header with text "Preview Pesan WhatsApp ke Tim Teknisi Sarpras".
  - Chat Bubble (#DCF8C6 background, rounded 12px with chat tail):
    Monospace formatted message with emergency icon, ticket number #FIX-202610-023, classroom location, PIC name & contact, problem description, and Google Drive photo link.
- Modal Footer:
  - Cancel button (Ghost).
  - Action button: Full-pill WhatsApp Green button (#25D366, text: #FFFFFF, icon: WhatsApp) "Buka WhatsApp & Kirim Tiket Sekarang".

---

### 6. ADMIN SARPRAS EXECUTIVE MANAGEMENT CONSOLE
Desktop management suite with fixed sidebar and data analytics.
- Fixed Left Sidebar (Width: 240px, background: #0F172A dark slate):
  - Brand header: Origami crest + "SIM-SARPRAS Jeumala".
  - Nav Items: Dashboard (Active: bg: rgba(2,132,199,0.25), text: #38BDF8 with 3px left active bar), 43 Ruangan & PJ, Master Inventaris, Sirkulasi Pinjam, Tiket Perbaikan (with red badge "4"), Laporan DIR & PDF, Pengaturan.
  - Bottom Profile: "Ust. Bukhari (Admin Sarpras)" + Logout button.
- Top App Bar: White bar with live global search "Cari no. inventaris, ruangan, atau nama aset...", Notification bell (#0284C7 badge: 3), Live calendar date.
- 4-Card Analytics Metric Row:
  - Card 1: Total Aset "2.845 Unit" (+12 bulan ini)
  - Card 2: Tingkat Kesiapan Aset "96.2% Siap KBM"
  - Card 3: Tiket Aktif "4 Tiket" (2 Darurat Lampu/Kipas)
  - Card 4: Nilai Pengadaan "Rp 1,42 Miliar" (BOS & Komite)
- Visual Analytics Widgets:
  - Left Widget: Donut Chart "Proporsi Kondisi Aset": 96.2% Baik (#10B981), 2.8% Rusak Ringan (#F59E0B), 1.0% Rusak Berat (#EF4444).
  - Right Widget: Horizontal Bar Chart "Distribusi Aset di 30 Ruang Kelas & 6 Lab Komputer".
- Real-Time Emergency Work Order Table:
  - Table columns with uppercase tracking-wider headers (#64748B): No. Tiket | Ruangan | Pelapor | Item | Prioritas | Status | Aksi.
  - Status badges: "Menunggu Teknisi" (#FEF3C7 amber), "Sedang Dikerjakan" (#DBEAFE blue), "Selesai" (#DCFCE7 green).
  - Quick action buttons: "Tugaskan Teknisi", "Hubungi WA Pelapor".

---

### 7. 43 ROOMS & PIC MAPPING MANAGER
- Top Action Bar: Search input "Cari ruang atau wali kelas...", Filter dropdown [Semua Kategori | Kelas VII | Kelas VIII | Kelas IX | Lab Komputer | Perkantoran], Action Button "+ Tambah Ruangan Baru" (#0284C7, pill).
- Clean Data Table (Zebra rows with subtle hover #F8FAFC):
  - Checkbox | ID Ruang | Nama Ruangan | Kategori | Penanggung Jawab (PJ) | NIP & Kontak WA | Total Aset | Status Kondisi | Aksi.
  - Actions: Edit PJ (Pencil), Lihat Lembar DIR (FileText), Cetak QR Ruang (QrCode).

---

### 8. MASTER INVENTARIS & BATCH QR CODE GENERATOR
- Multi-parameter Filter Bar: Ruangan, Sumber Dana (BOS Reguler / Komite / Bantuan Kemenag / Hibah), Tahun Perolehan (2022-2026), Kondisi Barang.
- Batch QR Action Bar (Appears when rows selected): "8 Aset Dipilih" -> Pill Button "Cetak 8 Stiker QR (Ukuran 5x3 cm)" + Pill Button "Mutasi Ruangan".
- Asset Table with thumbnail photos, formatted inventory code, condition badge, and miniature QR code preview.

---

### 9. OFFICIAL DAFTAR INVENTARIS RUANG (DIR) PDF GENERATOR
- Floating Print Controller Bar at Top: "Cetak Dokumen DIR" (#0284C7), "Unduh PDF Resmi" (#0F172A), "Export Excel" (#10B981).
- F4 Document Paper Canvas (White sheet with subtle realistic drop shadow):
  - Official Kop Surat of Yayasan Kesejahteraan Masyarakat Aceh (YAKKMA) & MTs Jeumala Amal Lueng Putu.
  - Dual logos: Kemenag RI (left) and MTs Jeumala Amal (right).
  - Double separator line.
  - Document Title: "DAFTAR INVENTARIS RUANG (DIR) TAHUN AJARAN 2026/2027".
  - Metadata block: Ruang Kelas VIII-3, Penanggung Jawab Ust. Ahmad Fauzi, S.Pd.
  - Structured asset inventory table with 10 columns (No, Kode, No Inv, Nama Barang, Merek, Jml, Tahun, Sumber Dana, Kondisi B/RR/RB, Ket).
  - Official Signatures: Kepala MTs Jeumala Amal, Digital HMAC QR Code Stamp, Penanggung Jawab Ruang.

---

## Global Design Requirements
- Fully responsive design: Show desktop primary (1240px container) and mobile adaptation (390px viewport) for the emergency repair dispatcher.
- Skeleton loading states with animated shimmering blue pulse for all data tables and card grids.
- Toast notifications: Success (Emerald Green #10B981), Error/Emergency (Crimson Red #EF4444), Info (Sky Blue #0284C7), Warning (Amber #F59E0B).
- Empty states: Friendly geometric origami illustration + helpful explanation + primary CTA button.
- Hover states: Smooth 0.25s transition with subtle -3px lift and soft blue shadow expansion on all interactive cards.
- Focus states: 2px solid #0284C7 ring with 2px offset for high accessibility.
- Overall feel: A breath of fresh air — radiant, pristine, highly organized, and technologically advanced madrasah portal that combines academic prestige with rapid emergency responsiveness.
```
