# WIREFRAME PROMPT: SIM-SARPRAS MTs JEUMALA AMAL
## Complete Google Stitch AI Wireframe Specification

```text
Create detailed wireframes for SIM-SARPRAS MTs JEUMALA AMAL (Madrasah Tsanawiyah Jeumala Amal Lueng Putu, Pidie Jaya - Aceh).
Use grayscale/black-and-white wireframe style only — no colors, no images, just layout structure, placeholder boxes, labels, and navigation flow.

## Application Context
A comprehensive cloud-based Facility, Asset Management & Emergency Repair Work Order System for MTs Jeumala Amal. It manages 43 rooms (30 classrooms VII-1 to IX-10, 6 Computer Labs, Science Lab, Sports facilities, and offices) and serves 1,050 students. Key features include an ultra-clean landing page with a floating multi-tab action widget, an emergency WhatsApp repair dispatch system for homeroom teachers (handling urgent broken lamps, ceiling fans, electrical issues), digital asset tracking with QR code labeling, and official PDF Daftar Inventaris Ruang (DIR) printing.

Has 5 main sections: Public Interactive Landing Page, Authentication & Access Portal, Room PIC & Homeroom Teacher Inspection Mode, Admin Sarpras Management Console, and Work Order & Official Report Engine.

## Wireframe Pages Required

--- PAGE W-01: PUBLIC INTERACTIVE LANDING PAGE (DESKTOP) ---
Layout: Full-width modern landing page with floating sticky top navbar, multi-layer hero section, overlapping multi-tab action card, feature grid, priority tier cards, 4-step process timeline, and deep bottom metric footer.
- Top Sticky Navbar:
  - Left: [icon: school-crest] "SIM-SARPRAS JEUMALA AMAL" logo & text.
  - Center: Pill-shaped menu links: [Home] [43 Rooms] [Asset Directory] [Report Repair (WA)] [Track Ticket] [About].
  - Right: Outlined pill button [icon: user] "Portal Login".
- Hero Section:
  - Left Column (60%):
    - Subtitle badge: [badge: "SISTEM MANAJEMEN SARPRAS TERPADU"]
    - Headline H1: "SARPRAS MODERN MTs JEUMALA AMAL"
    - Sub-headline (italic): "Aset Terjaga, Belajar Nyaman, Madrasah Hebat."
    - Paragraph: "Sistem Informasi Manajemen Sarana, Prasarana & Pelaporan Cepat Ruang Kelas MTs Jeumala Amal Lueng Putu, Pidie Jaya. Mengelola 43 ruangan dan 1.050 santri putra-putri."
    - Action Buttons: Primary dark button [icon: building] "Jelajahi 43 Ruangan", Secondary outline button [icon: alert-triangle] "Lapor Kerusakan (WA)".
  - Right Column (40%):
    - Large wireframe box with X [Visual: 3D Origami Paper Plane & Geometric Madrasah Campus Landmark].
- Overlapping Floating Multi-Tab Quick Action Widget (Signature Component):
  - Top Floating Pill Tabs:
    - Tab 1 (Active/Dark filled): [icon: whatsapp] "Lapor Cepat / Tiket WA"
    - Tab 2 (Outlined): [icon: search] "Cari Aset & Ruangan"
    - Tab 3 (Outlined): [icon: package] "Peminjaman Alat KBM"
    - Tab 4 (Outlined): [icon: ticket] "Lacak Status Tiket"
  - Active Tab Body Container (Card with subtle border):
    - Field 1: Label "Pilih Ruangan Terkendala", Dropdown selector "[Pilih Ruang: Kelas VII-1 s/d IX-10, Lab Komputer 1-6, Lab IPA, dsb.]".
    - Field 2: Label "Tingkat Prioritas", 3 Radio Pills: [⚪ Biasa / Rutin] [⚪ Sedang] [🔘 🔴 Mendesak (Lampu/Kipas/Listrik)].
    - Field 3: Label "Rincian Kerusakan", Textarea "[Contoh: Lampu KBM putus & Kipas angin mati total di Kelas VIII-3...]".
    - Action Row: Secondary upload button [icon: camera] "Unggah Foto HP", Primary dark CTA button [icon: send] "Kirim Tiket WhatsApp ke Teknisi Sarpras".
- Floating Pebble Feature Cards (Row of 4 Cards):
  - Card 1: [icon: box] "43 Ruangan Terdata", subtext "30 Kelas, 6 Lab Komp, 1 Lab IPA, 2 Lapangan".
  - Card 2: [icon: zap] "Respon Cepat < 2 Jam", subtext "Penanganan darurat lampu & listrik kelas".
  - Card 3: [icon: qr-code] "QR Code Terstandar", subtext "Pelacakan no. inventaris & dana BOS/Komite".
  - Card 4: [icon: users] "43 Penanggung Jawab", subtext "Wali Kelas VII-1 s/d IX-10 & Kepala Lab".
- Featured 43 Rooms Catalog Section:
  - Header: Section Title "FASILITAS & RUANGAN MADRASAH", Right link "Lihat Semua 43 Ruangan →".
  - Filter Tabs: [Semua] [Kelas VII] [Kelas VIII] [Kelas IX] [Lab Komputer] [Lab IPA & Olahraga].
  - 4-Card Grid:
    - Card [X placeholder for Room Photo], Badge [badge: "100% Siap KBM"], Title "Kelas IX-1 (Gedung Putra Lt. 2)", Subtitle "PJ: Ust. Zulkifli, S.Pd (Wali Kelas)", Info line "Total Aset: 48 Barang (Meja, Kursi, AC, Proyektor)", Circle button [icon: arrow-right].
- Repair Priority Tier Section (4 Column Cards):
  - Card 1: "Prioritas Biasa (Rutin)" - Pengecatan kusam, perawatan taplak & mebeler. Button "Lapor Biasa".
  - Card 2: "Prioritas Sedang" - Pintu seret, stopkontak meja longgar, whiteboard. Button "Lapor Sedang".
  - Card 3 (Elevated & Highlighted with "FAST TRACK" badge): "Prioritas Mendesak / Emergency" - Bola lampu KBM mati, kipas angin mati cuaca terik, sekering konslet, AC bocor. Filled dark button "Lapor Emergency via WA".
  - Card 4: "Usulan Pengadaan Baru" - Pengajuan barang baru semester depan. Button "Ajukan Proposal".
- 4-Step Process Timeline ("Alur Pelaporan & Perbaikan"):
  - 4 Connected horizontal steps with arrows:
    - Step 1: [icon: map-pin] "1. Pilih Ruangan"
    - Step 2: [icon: camera] "2. Foto Kendala"
    - Step 3: [icon: whatsapp] "3. Kirim ke WhatsApp Teknisi"
    - Step 4: [icon: check-circle] "4. Ruangan Nyaman Kembali"
- Deep Bottom Metric Counter Footer:
  - Left stats counter: "1.050+ Santri Aktif" | "43 Ruangan Terkelola" | "30 Ruang Kelas Digital" | "< 2 Jam Respon Cepat".
  - Right quote box: [icon: quote] "Komitmen MTs Jeumala Amal untuk fasilitas belajar terbaik dan nyaman bagi seluruh santri." - Kepala Madrasah.

--- PAGE W-01M: MOBILE BREAKPOINT — HOMEPAGE & EMERGENCY WA TICKET ---
Layout: Single-column 390px mobile viewport optimized for Homeroom Teachers on smartphones.
- Mobile Sticky Header: School Logo, "SIM-SARPRAS", Hamburger menu icon [icon: menu], Quick SOS Button [icon: zap].
- Mobile Hero Card: Headline "SIM-SARPRAS MTs Jeumala Amal", Tagline "Aset Terjaga, Belajar Nyaman", Full-width Red Warning Pill "🚨 Butuh Perbaikan Cepat di Kelas? Ketuk Di Bawah".
- Mobile Emergency Ticket Form (One-Thumb Friendly):
  - Dropdown: "Ruangan Anda (Contoh: Kelas VII-4)"
  - Priority Selector: 3 Large touch buttons [Biasa] [Sedang] [MENDESAK (Lampu/Kipas)]
  - Camera Input Button: Large dotted square [icon: camera] "Ambil Foto Kerusakan Langsung dari Kamera HP"
  - Large Primary Button: Filled dark [icon: whatsapp] "KIRIM SEKARANG KE WA SARPRAS"
- Mobile Quick Stats Accordion: [43 Ruangan] [Status Tiket Anda] [Kontak Teknisi Darurat].

--- PAGE W-02: AUTHENTICATION & ROLE GATEWAY ---
Layout: Centered auth modal with clean dual-login options.
- Header: Madrasah Emblem [icon: school-crest], Title "Masuk ke SIM-SARPRAS Jeumala".
- Subtitle: "Silakan pilih metode masuk sesuai akun atau peran Anda di madrasah."
- Primary SSO Button: Full-width button [icon: google] "Masuk dengan Akun Google Madrasah".
- Divider line with text "ATAU AKSES CEPAT PENANGGUNG JAWAB (PJ)"
- Form Fields:
  - Dropdown: "Pilih Ruangan Tanggung Jawab (30 Kelas / Lab / TU)"
  - Input field: "PIN / Kode Akses Wali Kelas"
  - Checkbox: "Ingat saya di perangkat ini"
- Action Button: Filled dark button "Masuk Sebagai Penanggung Jawab Ruang".
- Footer link: "Butuh bantuan akses? Hubungi Admin Sarpras di WhatsApp".

--- PAGE W-03: HOMEROOM TEACHER & ROOM PIC INVENTORY CHECK (STOCK OPNAME) ---
Layout: Mobile-first & Tablet dashboard specifically for 30 Homeroom Teachers (Wali Kelas VII-1 to IX-10) and Lab Heads.
- Header Bar: Back arrow [icon: arrow-left], Title "Inventaris Ruang: KELAS VIII-3", Status Badge [badge: "PJ: Ust. Ahmad Fauzi, S.Pd"].
- Action Bar: Button [icon: check-square] "Verifikasi Semua Baik", Button [icon: alert-circle] "Laporkan Barang Rusak", Button [icon: printer] "Unduh Lembar DIR (PDF)".
- Summary Banner: Total Barang: 42 Item | Kondisi Baik: 39 | Rusak: 3.
- Asset Checklist Cards (Vertical List):
  - Card 1: [icon: square-check] "LCD Proyektor InFocus IN112AA" | No. Inv: `012/MTs-JA/BOS/2023` | Kondisi: [badge: "BAIK"] | Lokasi: Plafon Tengah | Action: [Laporkan Kendala]
  - Card 2: [icon: square-check] "Kipas Angin Dinding Regency 18\" (Unit 1)" | Kondisi: [badge: "BAIK"].
  - Card 3 (Flagged): [icon: alert-triangle] "Kipas Angin Dinding Regency 18\" (Unit 2)" | Kondisi: [badge: "RUSAK BERAT"] | Note: "Mati total dan mengeluarkan dengung panas" | Action: [Lihat Tiket Perbaikan WA #FIX-023].
  - Card 4: [icon: square-check] "Meja Siswa Kayu Ganda (16 Unit)" | Kondisi: [badge: "BAIK"].
  - Card 5: [icon: square-check] "Kursi Siswa Kayu (32 Unit)" | Kondisi: [badge: "BAIK"].
- Floating Bottom Button: [icon: camera] "+ Tambah Laporan Kerusakan Baru".

--- PAGE W-04: EMERGENCY WORK ORDER & WHATSAPP DISPATCH MODAL ---
Layout: 2-step modal dialog with live WhatsApp message preview.
- Modal Header: Title "Formulir Lapor Cepat / Tiket Perbaikan Sarpras", Close button [X].
- Step Indicator: [Step 1: Rincian Kendala] → [Step 2: Preview WhatsApp & Kirim].
- Left Form Panel:
  - Input: Ruangan Asal (Auto-filled: "Kelas VIII-3 - Gedung Putra Lt. 2").
  - Radio Priority: 🟢 Biasa | 🟡 Sedang | 🔴 Mendesak / Darurat (Lampu, Kipas, Listrik).
  - Input: Item Kerusakan ("Kipas Angin Dinding Unit 2").
  - Textarea: Uraian Kendala & Dampak KBM santri.
  - File Dropzone: [Box with X] "Foto Kerusakan (Telah terkompresi otomatis 240 KB)".
- Right WhatsApp Preview Box (Simulated Chat Bubble):
  - Top header: "Preview Pesan WhatsApp ke Hotline Sarpras / Teknisi".
  - Chat Bubble (Monospace text box):
    ```
    *🚨 TIKET PERMINTAAN PERBAIKAN SARPRAS*
    *MTs Jeumala Amal Lueng Putu*
    ==================================
    *No. Tiket:* #FIX-202610-023
    *Status Prioritas:* 🔴 MENDESAK (EMERGENCY)
    *Lokasi Ruangan:* Kelas VIII-3 (Gedung Putra Lt. 2)
    *Penanggung Jawab:* Ust. Ahmad Fauzi, S.Pd
    ----------------------------------
    *Item Kerusakan:* Kipas angin dinding mati total
    *Foto Kondisi:* https://drive.google.com/open?id=xxx
    ==================================
    ```
- Bottom Actions: Secondary button "Batal", Primary dark button [icon: whatsapp] "Buka WhatsApp & Kirim Sekarang".

--- PAGE W-05: ADMIN SARPRAS EXECUTIVE DASHBOARD ---
Layout: Sidebar navigation + Top app bar + 4-column metric cards + chart widgets + live work order table.
- Left Sidebar (Fixed 240px):
  - Brand: [icon: school] "SIM-SARPRAS"
  - Nav Items: [Dashboard (Active)] [43 Ruangan & PJ] [Master Barang] [Sirkulasi Pinjam] [Tiket Perbaikan (Badge: 4)] [Laporan DIR & PDF] [Pengaturan Sistem].
  - Bottom Profile: "Admin Sarpras (Ust. Bukhari)" [icon: log-out].
- Top App Bar: Search bar "Cari no. inventaris, ruangan, atau nama aset...", Notification bell [icon: bell (Badge: 3)], Date display.
- Metric KPI Cards (Row of 4):
  - Card 1: "Total Aset Terdata", Number "2.845 Unit", subtext "Dari 43 Ruangan".
  - Card 2: "Kondisi Baik", Number "96.2%", subtext "2.737 Unit Aktif KBM".
  - Card 3: "Tiket Perbaikan Aktif", Number "4 Tiket", subtext "2 Mendesak (Lampu & Kipas)".
  - Card 4: "Nilai Aset Pembelian", Number "Rp 1.42 M", subtext "BOS, Yayasan & Kemenag".
- Charts & Visualization Row:
  - Left Chart Widget (50%): [Chart frame: Pie/Donut Chart "Sebaran Kondisi Aset: Baik (96.2%), Rusak Ringan (2.8%), Rusak Berat (1.0%)"].
  - Right Chart Widget (50%): [Chart frame: Bar Chart "Kepadatan Aset di 30 Ruang Kelas, 6 Lab Komputer, & Fasilitas"].
- Recent Emergency Tickets Table:
  - Header: "Tiket Perbaikan Terkini", Right filter: [Semua] [Mendesak] [Sedang].
  - Columns: No. Tiket | Ruangan | Pelapor | Item | Prioritas | Status | Aksi.
  - Row 1: `#FIX-023` | Kelas VIII-3 | Ust. Ahmad Fauzi | Kipas Angin | [badge: MENDESAK] | [badge: Menunggu Teknisi] | [Assign Teknisi] [Hubungi WA].
  - Row 2: `#FIX-022` | Lab Komputer 2 | Ust. Hendra, S.Kom | Stopkontak PC 08 | [badge: SEDANG] | [badge: Dikerjakan] | [Update Status].

--- PAGE W-06: 43 ROOMS & PIC MAPPING MANAGER ---
Layout: Sidebar + Top bar + Data Management Table.
- Header: Title "Kelola 43 Ruangan & Penanggung Jawab (PJ)", Action Button [icon: plus] "+ Tambah Ruangan Baru".
- Filter & Search Bar: Search input "Cari ruangan atau wali kelas...", Dropdown "Kategori: [Semua | Kelas VII | Kelas VIII | Kelas IX | Lab Komputer | Fasilitas]", Dropdown "Gedung: [Semua | Gedung Putra | Gedung Putri]".
- Data Table:
  - Columns: [ ] Checkbox | ID Ruang | Nama Ruangan | Kategori | Penanggung Jawab (PJ) | NIP / Kontak WA | Total Barang | Kondisi | Aksi.
  - Row 1: [ ] | `R-001` | Kelas VII-1 | Ruang Kelas | Ustdzah Nurul, S.Pd | 0812-xxxx | 42 Item | [badge: 100% Baik] | [Edit PJ] [Lihat DIR] [Cetak QR].
  - Row 2: [ ] | `R-031` | Lab Komputer 1 | Laboratorium | Ust. Hendra, S.Kom | 0813-xxxx | 38 PC + 2 AC | [badge: 95% Baik] | [Edit PJ] [Lihat DIR] [Cetak QR].
- Bottom Pagination: "Menampilkan 1-10 dari 43 Ruangan", Page numbers: [1] [2] [3] [4] [5].

--- PAGE W-07: MASTER INVENTARIS & QR CODE STIKER GENERATOR ---
Layout: Sidebar + Data Table with multi-parameter filter and batch QR generator.
- Header: Title "Master Data Barang & Aset Madrasah", Action Buttons: [icon: plus] "Tambah Aset Baru", [icon: qr-code] "Cetak Massal Stiker QR", [icon: upload] "Import Excel".
- Multi-Filter Row:
  - Filter 1: Dropdown "Ruangan: [Semua 43 Ruangan]"
  - Filter 2: Dropdown "Sumber Dana: [BOS Reguler | Komite / Yayasan | Kemenag | Hibah]"
  - Filter 3: Dropdown "Tahun Pengadaan: [2022 | 2023 | 2024 | 2025 | 2026]"
  - Filter 4: Dropdown "Kondisi: [Semua | Baik | Rusak Ringan | Rusak Berat]"
- Data Table:
  - Columns: [ ] | No. Inventaris | Nama Barang | Merek / Tipe | Ruangan | Sumber Dana | Tahun | Kondisi | Preview QR | Aksi.
  - Row 1: [ ] | `012/MTs-JA/BOS/2023` | LCD Proyektor | InFocus IN112AA | Kelas VIII-3 | BOS Reguler | 2023 | [badge: Baik] | [icon: qr-mini] | [Edit] [Mutasi] [Cetak Label].
  - Row 2: [ ] | `045/MTs-JA/KOMITE/2024`| PC All-in-One | Asus V241 | Lab Komputer 2 | Komite | 2024 | [badge: Baik] | [icon: qr-mini] | [Edit] [Mutasi] [Cetak Label].
- Batch Action Bar (Sticky Bottom when checkbox active):
  - Selected count: "8 Barang Dipilih" | Button [icon: qr-code] "Cetak 8 Stiker QR (Ukuran 5x3 cm)" | Button [icon: refresh-cw] "Mutasi ke Ruangan Lain".

--- PAGE W-08: CIRCULATION & ASSET LOAN TRACKER ---
Layout: Sidebar + Split view (Catalog of Borrowable Assets on Left + Active Loans on Right).
- Left Panel (45%): "Katalog Barang Bergerak Siap Pinjam"
  - Search bar: "Cari proyektor, sound portable, mikroskop, alat olahraga..."
  - Grid of available items:
    - Item 1: "LCD Proyektor Portable (Epson EB-E500)" | Status: [badge: TERSEDIA] | Button "Pinjamkan"
    - Item 2: "Wireless Sound System Baretone 15\"" | Status: [badge: TERSEDIA] | Button "Pinjamkan"
    - Item 3: "Set Bola Futsal & Voli (5 Unit)" | Status: [badge: DIPINJAM].
- Right Panel (55%): "Daftar Peminjaman Aktif & Jatuh Tempo"
  - Table Columns: ID Pinjam | Peminjam (Guru/Staf) | Barang | Tgl Pinjam | Rencana Kembali | Status | Aksi.
  - Row 1: `#PINJAM-011` | Ust. Faisal, M.Pd | Proyektor Portable 01 | 28 Okt 08:00 | 28 Okt 14:00 | [badge: AKTIF] | [Proses Kembali].
  - Row 2: `#PINJAM-009` | Ustdzah Rahma, S.Pd | Sound Wireless | 27 Okt 09:00 | 27 Okt 16:00 | [badge: TERLAMBAT] | [Kirim Pengingat WA].

--- PAGE W-09: MAINTENANCE & WORK ORDER WORKSPACE ---
Layout: Sidebar + Kanban Board / Tabular view of all maintenance tickets.
- View Switcher: [Kanban Board] | [Tabel Register]
- 4 Kanban Columns:
  1. Column "Menunggu Konfirmasi (1)":
     - Ticket Card: `#FIX-024` | Kelas VII-2 | "Lampu LED 18W putus di depan papan tulis" | Prioritas: [badge: MENDESAK] | Pelapor: Ust. Anwar (Wali Kelas) | Button "Terima & Tugaskan Teknisi".
  2. Column "Dalam Pengerjaan (2)":
     - Ticket Card: `#FIX-023` | Kelas VIII-3 | "Ganti kapasitor kipas angin Regency" | Teknisi: Pak Mulyadi | Estimasi: 45 Menit.
  3. Column "Menunggu Sparepart (1)":
     - Ticket Card: `#FIX-020` | Lab Komputer 4 | "Motherboard PC 12 mati daya" | Note: Menunggu belanja BOS.
  4. Column "Selesai Hari Ini (5)":
     - Ticket Card: `#FIX-021` | Kelas IX-5 | "Perbaikan stopkontak longgar" | Selesai: 10:15 WIB.

--- PAGE W-10: OFFICIAL REPORT & DIR (DAFTAR INVENTARIS RUANG) PDF PREVIEW ---
Layout: Centered document layout mimicking an official F4/A4 madrasah document with floating print toolbar.
- Floating Top Toolbar: Button [icon: printer] "Cetak Langsung", Button [icon: download] "Unduh PDF Resmi", Button [icon: file-excel] "Export Excel", Zoom controls [ - 100% + ].
- F4 Document Paper Container (White Box with drop shadow):
  - Header (Kop Resmi Madrasah):
    - Left: [icon: logo-kemenag] Logo Kementerian Agama RI.
    - Center: "YAYASAN KESEJAHTERAAN MASYARAKAT ACEH (YAKKMA)\nMADRASAH TSANAWIYAH JEUMALA AMAL\nKECAMATAN BANDAR BARU KABUPATEN PIDIE JAYA - ACEH\nJl. Banda Aceh - Medan Km. 136 Lueng Putu Telp: (0653) 821234".
    - Right: [icon: logo-jeumala] Logo Resmi MTs Jeumala Amal.
    - Double horizontal border line.
  - Document Title: "DAFTAR INVENTARIS RUANG (DIR)"
  - Metadata Table:
    - Nama Ruangan: Ruang Kelas VIII-3
    - Lokasi: Gedung Belajar Putra Lantai 2
    - Penanggung Jawab: Ustadz Ahmad Fauzi, S.Pd (Wali Kelas)
    - Tahun Ajaran: 2026/2027
  - Asset Inventory Table:
    - Table columns: No | Kode Barang | Nomor Inventaris | Nama Barang | Merek / Tipe | Jml | Tahun | Sumber Dana | Keadaan (B / RR / RB) | Keterangan.
    - 15 Data Rows filled with representative items (Meja, Kursi, Papan Tulis, Kipas Angin, Jam Dinding, Lemari Kelas, dll).
  - Signature Footer Block:
    - Left: Mengetahui, Kepala MTs Jeumala Amal (Nama & NIP + Digital Signature Space).
    - Center: [Box with QR: HMAC Verification QR Code - "Pindai untuk verifikasi keaslian dokumen DIR"].
    - Right: Lueng Putu, [Tanggal Cetak], Penanggung Jawab Ruangan (Wali Kelas VIII-3).

## Wireframe Style Notes
- Use only grayscale: white, light gray (#EEEEEE), medium gray (#AAAAAA), dark gray (#333333), black.
- Text placeholders: Use actual representative labels (MTs Jeumala Amal, Kelas VII-1 s/d IX-10, Lab Komputer, BOS Reguler, Wali Kelas), not "Lorem Ipsum".
- Buttons: Show shape and label clearly — primary buttons filled dark, secondary outlined.
- Images/covers: Show as plain box with X through it (standard wireframe placeholder).
- Charts: Show as empty chart frames with axis labels and chart type label inside.
- Icons: Show as simple labeled brackets [icon: name].
- Status Badges: Show as rounded pill frames [badge: LABEL].
- Number badges: Show on nav items where relevant (e.g., ticket count on sidebar).
- Show mobile breakpoint for the Home & Fast WA Ticket page as frame W-01M.
- Navigation Flow Arrows:
  - W-01 (Landing Page CTA) → W-04 (Emergency WhatsApp Modal) → Direct to WhatsApp External App.
  - W-01 (Portal Login) → W-02 (Auth Gateway) → W-03 (If PJ Ruang) or W-05 (If Admin Sarpras).
  - W-03 (Homeroom Teacher Stock Opname) → W-04 (Emergency Work Order) → W-09 (Admin Work Order Queue).
  - W-06 (Rooms Manager) → W-10 (Print DIR Document).
  - W-07 (Asset Directory) → Stiker QR Print Modal.
```
