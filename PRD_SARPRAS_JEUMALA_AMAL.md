# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## SISTEM MANAJEMEN SARANA, PRASARANA & INVENTARIS BARANG (SIM-SARPRAS)
### MADRASAH TSANAWIYAH JEUMALA AMAL LUENG PUTU, PIDIE JAYA - ACEH
*(Edisi Spesial: Landing Page Interaktif & Integrasi WhatsApp Emergency Ticket)*

---

## 1. Judul & Ringkasan Eksekutif

- **Nama Aplikasi:** Sistem Informasi Manajemen Sarana & Prasarana MTs Jeumala Amal (**SIM-SARPRAS Jeumala Portal**)
- **Institusi Pengembang / Pengguna:** Madrasah Tsanawiyah Swasta (MTsS) Jeumala Amal Lueng Putu, Bandar Baru, Kabupaten Pidie Jaya, Provinsi Aceh.
- **Profil Entitas:** Madrasah terpadu dengan 1.050 peserta didik (putra & putri), 30 rombongan belajar (Kelas VII-1 s.d. IX-10), 6 Laboratorium Komputer, 1 Laboratorium IPA, 2 Ruang Guru, Ruang Pimpinan/Kepala Madrasah, Ruang Tata Usaha, dan 2 Sarana Olahraga (Total: **43 Ruangan / Zona Fasilitas**).
- **Ringkasan Eksekutif:**  
  SIM-SARPRAS Jeumala adalah aplikasi web berbasis *cloud* terintegrasi Google Workspace (Google Apps Script, Google Sheets, Google Drive) yang mengusung konsep **Landing Page Modern Ultra-Interaktif**. Aplikasi ini berfungsi ganda: sebagai etalase profil fasilitas & transparansi sarpras madrasah, sekaligus gerbang operasional digital.  
  Aplikasi dilengkapi modul **Fast Work Order & Emergency Ticket via WhatsApp** yang memungkinkan Wali Kelas dan Penanggung Jawab Ruangan mengajukan perbaikan sarpras (mulai dari prioritas biasa hingga mendesak seperti lampu mati, kipas angin rusak, atau konsleting listrik) secara instan ke nomor WhatsApp Staf Sarpras/Teknisi, sekaligus mencatatnya ke buku register perbaikan digital.

---

## 2. Tujuan Produk & Nilai Bisnis

1. **Etalase Interaktif & Transparansi Sarpras:** Menghadirkan portal beranda (*landing page*) beranimasi memukau dengan micro-interaction modern (kursor interaktif dinamis, kartu 3D tilt, efek magnetic button, running statistic counter) yang menampilkan transparansi 43 ruangan dan fasilitas unggulan madrasah.
2. **Respon Cepat Tanggap Kerusakan (SLA Terukur via WhatsApp):** Mengatasi keluhan klasik di kelas (misal kipas angin mati di cuaca panas atau lampu padam saat KBM) dengan formulir tiket cepat yang langsung men-generate pesan WhatsApp terstruktur ke Admin Sarpras/Teknisi tanpa jeda, sekaligus mengunggah foto kendala ke Google Drive.
3. **Akuntabilitas Terdistribusi 43 Penanggung Jawab (PJ):** Memberikan akses khusus yang mudah diakses dari smartphone bagi 30 Wali Kelas (VII-1 s.d IX-10), 6 Kepala Lab Komputer, Kepala Lab IPA, Kepala TU, dan Penanggung Jawab Olahraga.
4. **Digitalisasi Sentral & Kepatuhan Audit:** Melacak asal-usul barang (BOS, Komite, Kemenag, Hibah), nomor inventaris terstandar, mutasi aset, serta memudahkan cetak Daftar Inventaris Ruang (DIR) dan stiker QR Code resmi madrasah.

---

## 3. Pengguna Target & Matriks Hak Akses (Role-Based Access Control / RBAC)

| Peran (Role) | Target Pengguna | Hak Akses & Kewenangan |
| :--- | :--- | :--- |
| **Publik / Tamu / Santri** | Pengunjung Portal, Komite, Siswa | Melihat Landing Page, profil fasilitas 43 ruangan, statistik umum aset, panduan peminjaman, serta memindai QR Code publik barang/ruangan. |
| **Penanggung Jawab (PJ) Ruang** | 30 Wali Kelas (VII-1 s.d IX-10), Ka. Lab Komputer (1-6), Ka. Lab IPA, Ka. TU, Pembina Olahraga | Akses mobile instan: Mengirim **Tiket Perbaikan via WhatsApp** (Prioritas Biasa s.d Mendesak), memeriksa daftar inventaris ruangannya, mengisi ceklis fisik berkala (*Stock Opname*), dan mengunduh lembar DIR kelas/lab. |
| **Super Admin / Teknisi Sarpras** | Urusan Sarpras & Tim Perbaikan | Akses penuh: Menerima notifikasi WhatsApp tiket perbaikan, update status pengerjaan (*Pending* -> *Diproses* -> *Selesai*), manajemen master ruangan & barang, verifikasi peminjaman, cetak label QR massal. |
| **Guru / Tenaga Kependidikan** | Seluruh Asatidz & Karyawan | Mengajukan peminjaman alat sarpras bergerak (proyektor, sound, alat peraga), cek riwayat pinjam mandiri. |
| **Kepala Madrasah (Executive)** | Pimpinan MTs Jeumala Amal | *Executive Oversight*: Memantau dashboard statistik kondisi aset, audit sumber dana pengadaan, dan evaluasi kecepatan penanganan tiket perbaikan ruang kelas. |

---

## 4. Arsitektur Data & Integrasi Ekosistem Google Workspace

### 4.1. Struktur Database Relasional (Google Sheets)

Database disimpan pada satu berkas Google Spreadsheet dengan 6 tabel terintegrasi:

#### A. Tabel `Master_Ruangan`
- `id_ruang` (PK, misal `R-001` s.d `R-043`)
- `nama_ruang` (`Kelas VII-1` s.d `Kelas IX-10`, `Lab Komputer 1-6`, `Lab IPA`, `Ruang Guru`, `TU`, `Kamad`, `Sarana Olahraga 1-2`)
- `kategori_ruang` (`Ruang Kelas`, `Laboratorium`, `Perkantoran`, `Fasilitas Olahraga`)
- `nama_pj` (Wali Kelas / Kepala Lab / Ka. TU)
- `nip_id_pj` (NIP / NUPTK / ID Pegawai)
- `email_pj` & `no_whatsapp_pj` (Nomor WA aktif penanggung jawab)
- `lokasi_gedung` (Gedung Putra / Gedung Putri / Kampus Terpadu)
- `status_ruang` (`Aktif`, `Pemeliharaan`)

#### B. Tabel `Master_Barang`
- `kode_barang` (PK, misal `BRG-2024-0045`)
- `no_inventaris` (Unique, format: `045/MTs-JA/SARPRAS/BOS/2024`)
- `nama_barang`, `kategori_barang` (`Elektronik/Listrik`, `Mebeler`, `Media KBM`, `Alat Lab`, `Alat Olahraga`)
- `merek_tipe`, `tahun_pembelian`, `harga_perolehan`
- `sumber_dana` (`BOS Reguler`, `Komite / Yayasan`, `Bantuan Kemenag RI`, `Hibah / Wakaf`)
- `kondisi` (`Baik`, `Rusak Ringan`, `Rusak Berat`, `Hilang`, `Dalam Servis`)
- `id_ruang` (FK merujuk ke `Master_Ruangan.id_ruang`)
- `dapat_dipinjam` (`Ya` / `Tidak`)
- `url_foto` & `url_qr_code`

#### C. Tabel `Tiket_Perbaikan_Sarpras` (Work Order & WA Tickets)
- `id_tiket` (PK, format: `FIX-202610-001`)
- `tgl_lapor` (Timestamp pelaporan)
- `id_ruang` (FK, Ruang asal kendala)
- `pelapor_nama` & `pelapor_wa` (Wali Kelas / Ka. Lab pelapor)
- `tingkat_prioritas`:
  - 🟢 **Biasa / Rendah**: Pengecatan kusam, perbaikan taplak meja, engsel jendela kaku.
  - 🟡 **Sedang**: Pintu meja rusak, whiteboard buram, stopkontak meja longgar.
  - 🔴 **Mendesak / Darurat (Emergency)**: Bola lampu putus saat KBM, kipas angin mati/panas terik, konsleting instalasi listrik/sekering anjlok, proyektor mati menjelang ujian/tugas, AC bocor.
- `judul_kendala` (misal: "Kipas Angin Dinding Mati Total")
- `deskripsi_lengkap` (Rincian gejala dan dampak terhadap KBM santri)
- `url_foto_kendala` (Foto bukti dari kamera smartphone di Google Drive)
- `status_tiket` (`Diajukan`, `Diterima Teknisi`, `Sedang Dikerjakan`, `Menunggu Sparepart`, `Selesai`)
- `tgl_selesai` (Waktu tuntas penanganan)
- `teknisi_penangan` (Nama staf teknisi sarpras yang mengeksekusi)
- `catatan_solusi` & `biaya_perbaikan`

#### D. Tabel `Transaksi_Peminjaman`
- `id_pinjam` (PK), `kode_barang` (FK), `nama_peminjam`, `email_peminjam`, `keperluan`, `tgl_pinjam`, `rencana_kembali`, `tgl_kembali_real`, `kondisi_sebelum`, `kondisi_sesudah`, `status_pinjam` (`Diajukan`, `Disetujui`, `Selesai`, `Terlambat`), `petugas_sarpras`.

#### E. Tabel `Laporan_Opname_Ruang`
- `id_laporan` (PK), `id_ruang` (FK), `tgl_inspeksi`, `pelapor_pj`, `total_barang_ruang`, `jumlah_baik`, `jumlah_rusak`, `rincian_rusak`, `url_foto_bukti`, `status_tindak_lanjut`.

#### F. Tabel `Pengguna_Akses` & `Pengaturan_Sistem`
- `email_pengguna` (PK), `nama_lengkap`, `role` (`Admin`, `PJ_Ruang`, `Guru_Peminjam`, `Kepala_Madrasah`), `assigned_ruang`, `status_aktif`.
- Pengaturan: Nomor WhatsApp Hotline Sarpras / Teknisi, nomor WA Kepala Madrasah, link kop madrasah.

---

### 4.2. Arsitektur Berkas (Google Drive)
Folder Root: `[SIM-SARPRAS] MTs Jeumala Amal`
- 📁 `01_Foto_Aset_Barang`: Foto fisik resmi inventaris madrasah.
- 📁 `02_Foto_Tiket_Perbaikan`: Bukti foto kendala/kerusakan dari Wali Kelas / PJ.
- 📁 `03_Arsip_PDF_DIR`: Lembar Daftar Inventaris Ruang (DIR) resmi per kelas/lab ber-QR.
- 📁 `04_Label_QR_Aset`: File grafis QR Code siap cetak.

### 4.3. Integrasi Ekosistem Google Workspace & WhatsApp
- **Google Apps Script (GAS):** Mengelola REST API backend, kompresi berkas, pencatatan database Sheets, dan integrasi Drive.
- **WhatsApp Web / Mobile Deep-Link (`https://wa.me/...`):**  
  Mengonversi formulir tiket perbaikan menjadi format teks WA Markdown terstruktur lengkap dengan emoji prioritas, nomor tiket, nama kelas, kontak pelapor, dan link foto. Begitu tombol diklik, aplikasi langsung mengarahkan pengguna ke aplikasi WhatsApp di HP atau WhatsApp Web di PC.
- **Gmail Service (`MailApp`):** Tembusan notifikasi email resmi untuk rekap harian tiket darurat ke Kepala Urusan Sarpras & Pimpinan Madrasah.
- **Google Docs / PDF Template:** Meng-generate dokumen PDF resmi Daftar Inventaris Ruang (DIR) dan Berita Acara Perbaikan.

---

## 5. Persyaratan Fungsional

### 5.1. Modul Landing Page Publik Interaktif (Interactive Showcase)
1. **Hero Section Dinamis:**
   - Sambutan megah berlatar visual kampus hijau asri MTs Jeumala Amal.
   - Efek kursor interaktif (*magnetic cursor & glowing particle trail*).
   - Tombol Call-to-Action (CTA) ber-animasi *pulse & sheen*: **"Lapor Cepat / Tiket Perbaikan"** dan **"Masuk ke Portal Sarpras"**.
2. **Interactive Metric Counter:**
   - Angka statistik berjalan (*count-up animation*): **1.050 Santri**, **43 Ruangan Terkelola**, **30 Ruang Kelas Digital**, **6 Lab Komputer Modern**, dan **Rasio Kesiapan Fasilitas 98%**.
3. **Interactive 3D Tilt Feature Cards:**
   - Kartu-kartu fasilitas unggulan dengan efek hover 3D tilt, border spotlight shimmer, dan detail instan saat kursor melayang di atasnya.
4. **Alur Cepat 3-Langkah:**
   - Infografis interaktif cara lapor perbaikan bagi wali kelas: *Pilih Ruangan -> Unggah Foto -> Klik Kirim ke WhatsApp Teknisi*.
5. **Pelacak Tiket Publik:**
   - Kolom pencarian cepat: cukup masukkan nomor tiket (misal `#FIX-202610-001`) untuk mengetahui apakah lampu/kipas angin sedang dalam proses pengerjaan teknisi.

### 5.2. Modul Fast Work Order & Tiket Perbaikan via WhatsApp
1. **Formulir Lapor Cepat Ramah HP:**
   - Pilihan Ruangan (Dropdown otomatis 30 Kelas VII-1 s/d IX-10, Lab Komputer 1-6, Lab IPA, dsb).
   - Pengenalan Otomatis: Jika Wali Kelas sedang login, ruangan dan nama pelapor terisi otomatis.
2. **Pemilih Prioritas Berwarna:**
   - 🟢 **Biasa**: Estetika, mebeler ringan, kelengkapan administrasi.
   - 🟡 **Sedang**: Kerusakan parsial yang belum menghentikan KBM.
   - 🔴 **Mendesak / Emergency**: Berdampak langsung terhadap kelancaran KBM dan keselamatan santri (lampu mati, kipas angin rusak di siang hari, konsleting listrik, kabel terkelupas, proyektor padam saat pembelajaran).
3. **Kamera & Kompresi Foto Instan:**
   - Ambil foto langsung dari kamera HP atau galeri, otomatis dikompresi di browser (<300 KB) dan tersimpan ke Google Drive.
4. **Dispatcher WhatsApp 1-Klik:**
   - Sistem men-generate pesan otomatis dengan template:
     ```text
     *🚨 TIKET PERMINTAAN PERBAIKAN SARPRAS*
     *MTs Jeumala Amal Lueng Putu*
     ==================================
     *No. Tiket:* #FIX-202610-023
     *Status Prioritas:* 🔴 MENDESAK (EMERGENCY)
     *Lokasi Ruangan:* Kelas VIII-3 (Gedung Putra Lt. 2)
     *Penanggung Jawab:* Ust. Ahmad Fauzi, S.Pd (Wali Kelas)
     *Kontak WA:* 0812-XXXX-XXXX
     ----------------------------------
     *Item Kerusakan:* Kipas angin dinding mati total & sekering anjlok
     *Uraian:* Ruangan sangat panas, KBM santri terganggu, mohon penggantian atau perbaikan segera.
     *Foto Kondisi:* https://drive.google.com/open?id=xxx
     *Waktu Lapor:* 28 Okt 2026, 09:30 WIB
     ==================================
     _Tiket telah tercatat di SIM-SARPRAS. Mohon segera dicek oleh Tim Teknisi. Terima kasih._
     ```
   - Otomatis membuka aplikasi WhatsApp menuju nomor Admin Sarpras/Teknisi yang telah diset di konfigurasi.

### 5.3. Modul Manajemen Inventaris, Ruangan & QR Code
- Registrasi aset baru, kode inventaris otomatis, mutasi antar-ruang, dan filter sumber dana (BOS, Komite, Kemenag, Hibah).
- Generator QR Code individual dan massal siap cetak pada stiker label aset atau plakat pintu ruangan.
- Pemindaian QR Code membuka riwayat perawatan dan status penanggung jawab ruangan secara transparan.

### 5.4. Modul Ceklis Berkala Ruangan (Mobile PJ Mode)
- Tampilan kartu khusus Wali Kelas di HP untuk verifikasi rutin seluruh barang di kelasnya setiap awal semester atau bulanan.
- Rekap kondisi otomatis masuk ke laporan opname sarpras.

### 5.5. Modul Peminjaman & Sirkulasi Aset Bergerak
- Katalog alat bergerak (proyektor, sound portable, perlengkapan olahraga, alat lab).
- Form peminjaman online, status approval admin, dan catatan kondisi pengembalian.

### 5.6. Modul Dashboard Eksekutif & Laporan Resmi
- Grafik kondisi aset (Baik vs Rusak), sebaran pengadaan per sumber dana, dan statistik kecepatan penanganan tiket perbaikan oleh teknisi.
- Ekspor data ke Excel/CSV dan cetak otomatis dokumen **Daftar Inventaris Ruang (DIR)** per ruangan berformat PDF ber-Kop resmi madrasah.

---

## 6. Batasan Teknis & Mitigasi Kuota Google Apps Script

1. **Batas Eksekusi GAS 6 Menit:**
   - Semua operasi database menggunakan batch arrays (`getRange().getValues()` & `setValues()`), memangkas waktu eksekusi hingga di bawah 1,5 detik.
2. **Keterbatasan Pengiriman File Besar ke GAS:**
   - Foto kerusakan dikompresi di sisi browser menggunakan HTML5 Canvas Web API (resolusi maks 1280px, format JPEG 0.75, ukuran berkas ~200-300 KB) sebelum dikirim secara Base64 ke Google Drive via GAS.
3. **Respon Instan Tanpa Delay (Zero Latency Experience):**
   - Integrasi WhatsApp menggunakan URL Scheme Client-Side (`https://api.whatsapp.com/send?phone=...&text=...`), sehingga pengiriman pesan WA tidak membebani server GAS dan langsung terbuka di WhatsApp pengguna dalam hitungan milidetik.
4. **Caching & Optimasi Performa:**
   - Menggunakan `CacheService` di server dan `localStorage` di browser untuk menyimpan daftar 43 ruangan dan kontak PJ agar landing page dan formulir lapor terbuka secara instan (*instant load*).

---

## 7. Spesifikasi Tampilan & Antarmuka (UI/UX) — Mengadopsi Desain Referensi

Tampilan visual aplikasi mengadopsi secara presisi layout dan gaya estetika modern dari **gambar referensi visual** yang telah diunggah: **Luminous Clean Sky-Sapphire Blue & Origami 3D Neumorphism**.

### 7.1. Struktur Layout Landing Page (Sesuai Referensi Visual)

1. **Header & Navigation Bar (Floating Top Nav):**
   - **Kiri:** Logo resmi MTs Jeumala Amal + Teks Brand `SIM-SARPRAS JEUMALA`.
   - **Tengah (Pill Menu Bar):** Tautan navigasi responsif: `Beranda`, `43 Ruangan`, `Inventaris`, `Lapor Cepat (WA)`, `Lacak Tiket`, `Tentang`.
   - **Kanan (Pill CTA):** Tombol `Masuk Portal 👤` berbingkai kapsul elegan.

2. **Hero Banner & Floating Quick Action Widget (Signature Hero Element):**
   - **Sisi Kiri Atas:** Typographic Banner yang megah:
     - Judul Utama: **SARPRAS MODERN MTs JEUMALA AMAL**
     - Subtitle Kaligrafi/Italic: *Aset Terjaga, Belajar Nyaman, Madrasah Hebat.*
     - Deskripsi singkat pengelolaan 43 ruangan & 1.050 santri.
     - Tombol Pill CTA: `Jelajahi Fasilitas ↗` & `Lapor Kendala 🚨`.
   - **Sisi Kanan Atas:** Ilustrasi visual 3D Origami / Geometric Clean (simbol digitalisasi modern yang bersih dan futuristik).
   - **Floating Elevated Multi-Tab Widget (Mengadopsi Widget Pencarian Referensi):**
     - Tab Navigasi Kapsul Mengambang di bagian atas widget:
       - 🚨 **Lapor Cepat / Tiket WA** *(Aktif / Default)*
       - 🔍 **Cari Aset & Ruangan**
       - 📦 **Peminjaman Alat KBM**
       - 🎫 **Lacak Status Pengerjaan Tiket**
     - Area Input Instan:
       - Dropdown Ruangan: *Pilih dari 30 Kelas VII-1 s/d IX-10, 6 Lab Komputer, Lab IPA, dsb.*
       - Pemilih Prioritas: *🟢 Biasa | 🟡 Sedang | 🔴 Mendesak (Lampu/Kipas/Listrik)*
       - Tanggal & Jam Kejadian (otomatis hari ini)
       - Tombol Aksi Utama: Tombol Pill Biru Cerah `Kirim Tiket WhatsApp 🚀` dengan efek shimmer.

3. **Floating Pebble Feature Cards (Baris 4 Kartu Fitur Cepat):**
   - 4 kartu mengambang (*soft elevated glass-pebbles*) dengan ikon 3D glossy:
     1. 🏫 **43 Ruangan Terkelola** (30 Kelas, 6 Lab Komputer, 1 Lab IPA, 2 Lapangan Olahraga).
     2. ⚡ **Respon Cepat Teknisi** (Penanganan darurat lampu & kelistrikan kelas < 2 jam).
     3. 🏷️ **QR Code Aset Terstandar** (Pelacakan no. inventaris, tahun & sumber dana BOS/Komite).
     4. 🤝 **Akuntabilitas 43 PJ Ruang** (Wali Kelas VII-1 s/d IX-10 & Kepala Lab).

4. **Katalog Ruangan Unggulan (Mirip Grid "Popular Packages"):**
   - Judul Seksi: **FASILITAS & RUANGAN MADRASAH** disertai tombol `Lihat Semua 43 Ruangan →`.
   - Filter Kategori: *Semua*, *Kelas VII*, *Kelas VIII*, *Kelas IX*, *Laboratorium Komputer*, *Lab IPA & Olahraga*.
   - Kartu Ruangan 3D Tilt:
     - Foto ruangan ber-sudut melengkung halus dengan tag badge status (*"100% Siap KBM"*).
     - Nama Ruangan & Lokasi Gedung (misal: `Kelas IX-1 (Gedung Putra Lt. 2)`).
     - Nama Penanggung Jawab (Wali Kelas).
     - Jumlah aset terdata di ruangan tersebut.
     - Tombol lingkaran panah biru `→` untuk membuka lembar inventaris lengkap ruangan tersebut.

5. **Kategori Penanganan & Layanan Sarpras (Mirip Seksi "Pricing Details"):**
   - Latar belakang panel biru safir yang anggun.
   - 4 Kartu Kategori Berjajar:
     1. **Prioritas Biasa (Rutin)**: Pengecatan kusam, perawatan taplak, gorden, mebeler kayu ringan.
     2. **Prioritas Sedang**: Pintu meja seret, stopkontak meja longgar, papan tulis buram.
     3. **Prioritas Mendesak (Emergency Service - Featured Card)**: Dilengkapi badge khusus *"Paling Sering Dilaporkan / Fast Track"* dengan sorotan border bercahaya — untuk bola lampu putus saat jam belajar, kipas angin mati di cuaca panas, instalasi listrik berasap/konslet, AC bocor.
     4. **Usulan Aset Baru**: Pengajuan kebutuhan pengadaan baru untuk semester depan (BOS/Komite).

6. **Alur Pelaporan & Perbaikan (Mirip Seksi "How To Book"):**
   - 4 tahapan horizontal yang saling terhubung garis panah dengan ikon 3D:
     1. *1. Pilih Ruangan*: Wali Kelas memilih ruangan kelas/lab yang mengalami kendala.
     2. *2. Foto Kendala*: Ambil foto kerusakan langsung dari kamera ponsel.
     3. *3. Kirim via WhatsApp*: Pesan terstruktur otomatis terkirim ke WhatsApp Tim Sarpras.
     4. *4. Ruangan Nyaman Kembali*: Teknisi tiba membawa suku cadang pengganti & KBM santri berjalan lancar.

7. **Footer & Counter Statistik (Mirip Bottom Blue Metric Bar):**
   - Bar biru pekat di bagian dasar halaman dengan metrik statistik berjalan:
     - **1.050+** Santri Putra & Putri
     - **43** Ruangan Terkelola Penuh
     - **30** Ruang Kelas Digital
     - **< 2 Jam** Respon Darurat Sarpras
   - Di sisi kanan terdapat *Kutipan Testimoni / Pernyataan Pimpinan Madrasah* berbingkai origami elegan.

---

### 7.2. Palet Warna & Visual Token (Sesuai Referensi Visual)

| Token Warna | Nilai HEX | Penggunaan pada Antarmuka |
| :--- | :--- | :--- |
| **Sky / Sapphire Primary** | `#0284c7` & `#0369a1` | Warna tombol utama, tab aktif, ikon aksen, dan gradien hero. |
| **Royal Azure Accent** | `#1d4ed8` & `#2563eb` | Warna banner kategori mendesak dan teks aksen penting. |
| **Clean Pure White** | `#ffffff` | Latar kartu mengambang (*floating cards*), container utama, dan teks di atas tombol. |
| **Ice Soft Blue Surface** | `#f0f7ff` & `#e8f2fe` | Latar belakang seluruh halaman (*canvas body*), memberi kesan sejuk, bersih, dan lapang. |
| **Dark Slate Typography** | `#0f172a` & `#1e293b` | Warna judul, heading teks, dan isi tabel agar keterbacaan tajam dan kontras. |
| **Emergency Red Accent** | `#ef4444` & `#dc2626` | Badge dan indikator tombol darurat (lampu putus / konsleting). |

---

### 7.3. Micro-Interactions Khusus (Cursor, Cards, Buttons)

1. **Custom Interactive Cursor Follower:**
   - Lingkaran titik cahaya biru safir semi-transparan (`mix-blend-mode: multiply` di latar putih) yang melayang dinamis mengikuti pointer mouse desktop.
   - Saat melintasi tombol atau kartu, kursor membesar lembut dan memberikan efek magnetik (*magnetic pull*).
2. **3D Tilt & Light-Spotlight Cards:**
   - Kartu katalog ruangan dan kartu tiket perbaikan memiliki efek *3D perspective tilt* saat mouse digerakkan di atasnya.
   - Garis batas kartu (*border*) memancarkan pendaran cahaya bergerak mengikuti koordinat mouse (*radial-gradient border spotlight*).
3. **Animated Shimmer & Ripple Buttons:**
   - Tombol `Kirim Tiket WhatsApp` dan `Cari Aset` memiliki efek kilau cahaya diagonal yang menyapu secara berkala (*sheen animation*).
   - Efek gelombang air (*ripple effect*) saat tombol diklik.

---

## 8. Rencana Deployment & Tahapan Pengujian

1. **Tahap 1: Setup Spreadsheet & Direktori Drive**
   - Pembuatan Google Sheets dengan 6 tabel dan formula ID otomatis.
   - Pembuatan 4 subfolder Drive untuk penyimpanan foto aset dan foto tiket kerusakan.
2. **Tahap 2: Pembangunan Landing Page & Fitur WhatsApp Dispatcher**
   - Penulisan antarmuka SPA modular (`Index.html`, `Stylesheet.html`, `JavaScript.html`) lengkap dengan modul cursor, 3D tilt card, dan form WhatsApp.
   - Implementasi skrip backend Google Apps Script (`Kode.gs`).
3. **Tahap 3: Uji Coba Lapangan (UAT)**
   - Simulasi lapor kerusakan lampu dan kipas angin oleh 3 Wali Kelas (Gedung Putra & Putri).
   - Verifikasi ketepatan pesan masuk ke nomor WhatsApp Teknisi Sarpras.
4. **Tahap 4: Peluncuran Resmi (Go-Live) & Sosialisasi**
   - Sosialisasi ke 30 Wali Kelas dan Kepala Lab.
   - Pemasangan stiker QR Code di 43 ruangan madrasah.

---

🎨 **Tahapan Khusus: Penentuan Visual UI/UX**
1. **Unggah Referensi:** Silakan unggah referensi tangkapan layar, warna, dan gaya antarmuka yang diinginkan jika sudah memiliki contoh.
2. **Jika Belum Ada Referensi Visual:**
   - Buka dokumen [PRD_SARPRAS_JEUMALA_AMAL.md](file:///d:/ANTIGRAVITY/APLIKASI/SARPRAS/PRD_SARPRAS_JEUMALA_AMAL.md) dan salin teksnya.
   - Buka Google Stitch, lalu tempelkan teks PRD ke dalamnya.
   - Unduh hasil pratinjau desain visual yang dihasilkan oleh Google Stitch.
   - Unggah gambar hasil desain tersebut ke percakapan ini untuk langsung kita implementasikan ke dalam kode HTML/CSS/GAS.
