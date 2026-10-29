# PANDUAN LENGKAP SETUP & DEPLOYMENT SIM-SARPRAS
## MTs JEUMALA AMAL LUENG PUTU, PIDIE JAYA - ACEH
*(Frontend GitHub Pages / Static Host + Backend Google Apps Script REST API)*

---

## 1. Ringkasan Arsitektur Proyek

Aplikasi **SIM-SARPRAS MTs Jeumala Amal** dibangun dengan arsitektur modern decoupled murni (bebas iframe, bebas `google.script.run`, bebas CORS error):

```text
┌────────────────────────────────────────────────────────┐
│  FRONTEND (GitHub Pages / Static Host)                 │
│  - index.html (Landing page ultra-interaktif)         │
│  - css/style.css (Luminous Sapphire & Origami 3D)     │
│  - js/config.js (Hanya menyimpan GAS_URL - R11)        │
│  - js/app.js (Kursor magnetik, 3D tilt, kompresi foto) │
└────────────────────────────────────────────────────────┘
                          ↕ HTTP POST (text/plain;charset=utf-8)
┌────────────────────────────────────────────────────────┐
│  BACKEND (Google Apps Script REST API)                 │
│  - backend/Kode.gs (REST API controller, auth HMAC)    │
│  - backend/Database.gs (setupAppEnvironment, 43 Ruang) │
│  - backend/NotifikasiCRM.gs (Fonnte WA & antrean)      │
│  - backend/Migrasi.gs (Migrasi database lama aman)     │
│  - backend/appsscript.json (Manifest GAS)              │
│                                                        │
│  Google Sheets Database (6 Tabel Terstruktur)          │
│  Google Drive Storage (Foto Kerusakan & Dokumen DIR)   │
└────────────────────────────────────────────────────────┘
```

---

## 2. Langkah Setup Backend Google Apps Script (GAS)

### Langkah 2.1: Buat Proyek Google Apps Script Baru
1. Buka [script.google.com](https://script.google.com/) di browser Anda (pastikan login dengan akun Google resmi madrasah).
2. Klik tombol **Proyek Baru** (*New Project*).
3. Beri nama proyek: `SIM-SARPRAS Backend - MTs Jeumala Amal`.

### Langkah 2.2: Masukkan Kode Backend
Salin dan tempelkan file-file dari folder `backend/` ke editor Apps Script:

1. **`Kode.gs`**: Buka file bawaan `Code.gs`, ganti namanya menjadi `Kode.gs`, lalu tempelkan seluruh isi dari berkas `backend/Kode.gs`.
2. **`Database.gs`**: Klik tombol **+** di samping Files → pilih **Script** → beri nama `Database` → tempelkan isi dari `backend/Database.gs`.
3. **`NotifikasiCRM.gs`**: Klik tombol **+** → pilih **Script** → beri nama `NotifikasiCRM` → tempelkan isi dari `backend/NotifikasiCRM.gs`.
4. **`Migrasi.gs`**: Klik tombol **+** → pilih **Script** → beri nama `Migrasi` → tempelkan isi dari `backend/Migrasi.gs`.
5. **`appsscript.json`** *(Opsional tapi Disarankan)*:
   - Buka **Project Settings** (ikon roda gigi di bilah kiri).
   - Centang opsi *"Show 'appsscript.json' manifest file in editor"*.
   - Kembali ke editor file, buka `appsscript.json`, dan ganti isinya dengan berkas `backend/appsscript.json`.

---

### Langkah 2.3: Jalankan Fungsi `setupAppEnvironment()`
1. Di bilah menu atas editor Apps Script, pilih fungsi **`setupAppEnvironment`** dari dropdown pilihan fungsi.
2. Klik tombol **Run (Jalankan)** ▶.
3. Google akan meminta izin akses (*Authorization Required*):
   - Klik **Review Permissions** → Pilih akun Google Anda.
   - Klik **Advanced (Lanjutan)** → Klik **Go to SIM-SARPRAS Backend (unsafe)**.
   - Klik **Allow (Izinkan)**.
4. Periksa jendela **Execution Log**:
   - Sistem akan secara otomatis membuat folder Google Drive `📁 [SIM-SARPRAS] MTs Jeumala Amal`, subfolder foto, dan Spreadsheet Database baru yang langsung terisi **43 Ruangan Lengkap MTs Jeumala Amal** (30 Kelas VII-1 s/d IX-10, 6 Lab Komputer, Lab IPA, Ruang Guru, TU, Kamad, Sarana Olahraga).
   - Kredensial darurat super admin dan kunci sesi HMAC akan langsung dibangkitkan dan disimpan aman di **Script Properties**.

---

### Langkah 2.4: Deploy Sebagai Web App (Publikasi REST API)
1. Di pojok kanan atas editor Apps Script, klik tombol biru **Deploy** → pilih **New deployment** (*Penerapan baru*).
2. Klik ikon gerigi di samping *Select type* → pilih **Web app**.
3. Isi parameter deployment:
   - **Description**: `SIM-SARPRAS REST API v1.0`
   - **Execute as**: **Me (email Anda)**
   - **Who has access**: **Anyone (Siapa saja)** *(Wajib "Anyone" agar frontend di GitHub Pages dapat mengirimkan tiket perbaikan tanpa kendala login Google)*.
4. Klik **Deploy**.
5. Salin URL Web App yang dihasilkan (berakhiran `/exec`), contoh:  
   `https://script.google.com/macros/s/AKfycbx.../exec`

---

## 3. Hubungkan Backend ke Frontend

1. Buka berkas `js/config.js` di direktori proyek lokal Anda.
2. Tempelkan URL Web App yang baru saja disalin pada variabel `GAS_URL`:
   ```javascript
   const CONFIG = {
     GAS_URL: 'https://script.google.com/macros/s/AKfycbx_PASTE_URL_DISINI/exec',
     ...
   };
   ```
3. Simpan berkas (`Ctrl + S`).

---

## 4. Panduan Deploy Frontend ke GitHub Pages (Sesuai `github-pages-deploy-guide`)

Ikuti langkah-langkah terminal berikut untuk mempublikasikan landing page Anda ke internet secara gratis dan cepat:

### Langkah 4.1: Cek & Inisialisasi Git
Buka PowerShell atau terminal di direktori `D:\ANTIGRAVITY\APLIKASI\SARPRAS`:

```bash
# 1. Inisialisasi repositori Git lokal
git init

# 2. Tambahkan seluruh berkas ke staging
git add .

# 3. Buat commit pertama
git commit -m "feat: release SIM-SARPRAS MTs Jeumala Amal full-stack app"

# 4. Pastikan branch utama bernama main
git branch -M main
```

### Langkah 4.2: Buat Repositori Baru di GitHub
1. Buka [github.com/new](https://github.com/new).
2. Beri nama repositori, misalnya: `sim-sarpras-jeumala`.
3. Pilih opsi **Public** (wajib untuk GitHub Pages gratis).
4. **JANGAN** centang *Add a README file*, `.gitignore`, atau license.
5. Klik **Create repository**.

### Langkah 4.3: Hubungkan & Push ke GitHub
```bash
# Ganti USERNAME dan sim-sarpras-jeumala sesuai akun Anda
git remote add origin https://github.com/USERNAME/sim-sarpras-jeumala.git

# Kirim berkas ke GitHub (gunakan Personal Access Token jika diminta password)
git push -u origin main
```

### Langkah 4.4: Aktifkan GitHub Pages
1. Di halaman repositori GitHub Anda, buka tab **Settings** → menu **Pages** di bilah kiri.
2. Di bagian **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: Pilih `main` dan folder `/ (root)`
   - Klik **Save**.
3. Centang opsi **Enforce HTTPS**.
4. Tunggu 1–2 menit, refresh halaman hingga muncul banner hijau:  
   `Your site is live at https://USERNAME.github.io/sim-sarpras-jeumala/`

---

## 5. Fitur Unggulan yang Siap Digunakan

| Modul | Cara Penggunaan di Aplikasi |
| :--- | :--- |
| **🚨 Tiket Perbaikan WA Cepat** | Wali Kelas/PJ cukup pilih ruangan, pilih prioritas (🟢 Biasa, 🟡 Sedang, 🔴 Mendesak), ketik kendala lampu/kipas/listrik, ambil foto dari kamera HP, lalu klik *Kirim Tiket WhatsApp 🚀*. Pesan WA terstruktur langsung terbuka di HP. |
| **🔍 Cari Aset & Ruangan** | Masukkan nomor inventaris atau nama proyektor/mebeler untuk melacak lokasi ruang, tahun beli, dan sumber dana BOS/Komite. |
| **📦 Pinjam Alat KBM** | Form cepat guru untuk meminjam proyektor portabel, sound system 15", dan alat olahraga dengan jatuh tempo otomatis. |
| **🎫 Lacak Status Tiket** | Masukkan nomor tiket (misal `FIX-20261028-001`) untuk melihat apakah teknisi listrik sudah ditugaskan. |
| **📋 Ceklis Opname Ruang** | Buka kartu ruangan di katalog, masukkan PIN `123456`, lakukan verifikasi kondisi barang kelas, dan unduh lembar DIR resmi ber-Kop Madrasah. |
| **🖨️ Cetak Lembar DIR (PDF)** | Dokumen resmi ukuran F4 lengkap dengan Kop MTs Jeumala Amal, tanda tangan Kamad & Wali Kelas, serta stempel HMAC verification siap cetak langsung via browser. |

---

## 6. Pemeliharaan & Migrasi Database Lama (`Migrasi.gs`)

Jika madrasah memiliki spreadsheet inventaris lama:
1. Buka file `Migrasi.gs` di editor Apps Script.
2. Jalankan fungsi:
   ```javascript
   migrasikanDataBarang('ID_SPREADSHEET_LAMA', 'Nama_Sheet_Lama', true); // dryRun = true untuk simulasi
   ```
3. Periksa execution log untuk melihat jumlah baris baru yang ditemukan.
4. Ganti `dryRun` menjadi `false` untuk mengeksekusi impor data secara aman tanpa mengubah satu pun sel di spreadsheet lama.
