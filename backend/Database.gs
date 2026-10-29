// =========================================================================================
// SIM-SARPRAS MTs JEUMALA AMAL LUENG PUTU, PIDIE JAYA - ACEH
// DATABASE ACCESS & SETUP ENGINE (Batch Processing & Scale-Turbo Pattern)
// =========================================================================================

function getSpreadsheet() {
  const id = prop_('SPREADSHEET_ID');
  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (e) {}
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getSheetData(sheetName) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return [];

  const values = sheet.getDataRange().getValues();
  if (values.length <= 1) return [];

  const headers = values[0].map(h => String(h).trim());
  const list = [];

  for (let r = 1; r < values.length; r++) {
    const row = values[r];
    if (row.join('') === '') continue; // Lewati baris kosong
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] !== undefined ? row[i] : '';
    });
    list.push(obj);
  }

  return list;
}

// =========================================================================================
// INISIALISASI DATABASE & STRUKTUR 43 RUANGAN MTs JEUMALA AMAL (setupAppEnvironment)
// Jalankan SEKALI dari editor Apps Script
// =========================================================================================
function setupAppEnvironment() {
  Logger.log('🚀 Memulai inisialisasi lingkungan SIM-SARPRAS MTs Jeumala Amal...');

  // 1. Siapkan Folder Google Drive
  let rootFolder;
  const existingRoot = prop_('ROOT_FOLDER_ID');
  if (existingRoot) {
    try { rootFolder = DriveApp.getFolderById(existingRoot); } catch (e) {}
  }
  if (!rootFolder) {
    rootFolder = DriveApp.createFolder('📁 [SIM-SARPRAS] MTs Jeumala Amal');
  }

  const uploadsFolder = rootFolder.createFolder('📂 01_Foto_Bukti_Kerusakan');
  const dirFolder = rootFolder.createFolder('📂 02_Arsip_PDF_DIR');
  const qrFolder = rootFolder.createFolder('📂 03_Label_QR_Stiker');

  // 2. Siapkan Spreadsheet Database
  let ss;
  const existingSS = prop_('SPREADSHEET_ID');
  if (existingSS) {
    try { ss = SpreadsheetApp.openById(existingSS); } catch (e) {}
  }
  if (!ss) {
    ss = SpreadsheetApp.create('🗃️ Database SIM-SARPRAS MTs Jeumala Amal');
    DriveApp.getFileById(ss.getId()).moveTo(rootFolder);
  }

  // 3. Setup Sheet 1: Master_Ruangan (43 Ruangan Lengkap MTs Jeumala Amal)
  let sheetRuang = ss.getSheetByName('Master_Ruangan');
  if (!sheetRuang) {
    sheetRuang = ss.getActiveSheet().getName() === 'Sheet1' ? ss.getActiveSheet().setName('Master_Ruangan') : ss.insertSheet('Master_Ruangan');
    sheetRuang.appendRow(['id_ruang', 'nama_ruang', 'kategori_ruang', 'nama_pj', 'nip_id_pj', 'email_pj', 'no_whatsapp_pj', 'lokasi_gedung', 'pin_ruang', 'status_ruang']);

    const defaultRooms = [];
    // 30 Ruang Kelas (VII-1 s/d IX-10)
    for (let i = 1; i <= 10; i++) {
      defaultRooms.push(['R-0' + (i < 10 ? '0' + i : i), 'Kelas VII-' + i, 'Ruang Kelas', 'Wali Kelas VII-' + i, '19850101201001100' + i, 'walikelas7_' + i + '@jeumala.sch.id', '0812600100' + (i < 10 ? '0' + i : i), 'Gedung Kelas VII', '123456', 'Aktif']);
    }
    for (let i = 1; i <= 10; i++) {
      const idx = 10 + i;
      defaultRooms.push(['R-0' + idx, 'Kelas VIII-' + i, 'Ruang Kelas', 'Wali Kelas VIII-' + i, '1986020220110210' + idx, 'walikelas8_' + i + '@jeumala.sch.id', '0812600200' + (i < 10 ? '0' + i : i), 'Gedung Kelas VIII', '123456', 'Aktif']);
    }
    for (let i = 1; i <= 10; i++) {
      const idx = 20 + i;
      defaultRooms.push(['R-0' + idx, 'Kelas IX-' + i, 'Ruang Kelas', 'Wali Kelas IX-' + i, '1987030320120310' + idx, 'walikelas9_' + i + '@jeumala.sch.id', '0812600300' + (i < 10 ? '0' + i : i), 'Gedung Kelas IX', '123456', 'Aktif']);
    }

    // 6 Ruang Laboratorium Komputer
    for (let i = 1; i <= 6; i++) {
      const idx = 30 + i;
      defaultRooms.push(['R-0' + idx, 'Lab Komputer ' + i, 'Laboratorium Komputer', 'Ka. Lab Komputer ' + i, '1988040420130410' + idx, 'labkomp' + i + '@jeumala.sch.id', '0812600400' + i, 'Gedung Laboratorium Lt. 2', '123456', 'Aktif']);
    }

    // Fasilitas Pendukung Lainnya (7 Ruangan)
    defaultRooms.push(['R-037', 'Laboratorium IPA Terpadu', 'Laboratorium IPA', 'Kepala Lab IPA', '198905052014051037', 'labipa@jeumala.sch.id', '08126005001', 'Gedung Lab Lt. 1', '123456', 'Aktif']);
    defaultRooms.push(['R-038', 'Ruang Guru Putra', 'Perkantoran', 'Koordinator Guru Putra', '199006062015061038', 'guru.putra@jeumala.sch.id', '08126006001', 'Gedung Utama Lt. 1', '123456', 'Aktif']);
    defaultRooms.push(['R-039', 'Ruang Guru Putri', 'Perkantoran', 'Koordinator Guru Putri', '199107072016072039', 'guru.putri@jeumala.sch.id', '08126006002', 'Gedung Utama Lt. 1', '123456', 'Aktif']);
    defaultRooms.push(['R-040', 'Ruang Kepala Madrasah', 'Perkantoran', 'Drs. H. Muhammad Jafar, M.Ag', '197508122002121003', 'kamad@jeumala.sch.id', '08126007001', 'Gedung Utama Lt. 2', '123456', 'Aktif']);
    defaultRooms.push(['R-041', 'Ruang Tata Usaha (TU)', 'Perkantoran', 'Kepala Tata Usaha', '198009092008091041', 'tu@jeumala.sch.id', '08126008001', 'Gedung Utama Lt. 1', '123456', 'Aktif']);
    defaultRooms.push(['R-042', 'Sarana Olahraga 1 (Indoor Hall)', 'Sarana Olahraga', 'Pembina Olahraga', '199210102017101042', 'olahraga1@jeumala.sch.id', '08126009001', 'Kompleks Olahraga', '123456', 'Aktif']);
    defaultRooms.push(['R-043', 'Sarana Olahraga 2 (Lapangan Outdoor)', 'Sarana Olahraga', 'Pembina Olahraga', '199210102017101042', 'olahraga2@jeumala.sch.id', '08126009002', 'Kompleks Olahraga', '123456', 'Aktif']);

    sheetRuang.getRange(2, 1, defaultRooms.length, defaultRooms[0].length).setValues(defaultRooms);
  }

  // 4. Setup Sheet 2: Master_Barang
  let sheetBarang = ss.getSheetByName('Master_Barang');
  if (!sheetBarang) {
    sheetBarang = ss.insertSheet('Master_Barang');
    sheetBarang.appendRow(['kode_barang', 'no_inventaris', 'nama_barang', 'kategori_barang', 'merek_tipe', 'tahun_pembelian', 'sumber_dana', 'harga_perolehan', 'kondisi', 'id_ruang', 'dapat_dipinjam', 'url_foto', 'url_qr_code', 'keterangan']);

    // Sampel Aset Utama
    const sampleBarang = [
      ['BRG-2024-001', '001/MTs-JA/BOS/2024', 'LCD Proyektor InFocus', 'Elektronik/Listrik', 'InFocus IN112AA 3800 Lumens', 2024, 'BOS Reguler', 6500000, 'Baik', 'R-001', 'Tidak', '', '', 'Terpasang di plafon kelas VII-1'],
      ['BRG-2024-002', '002/MTs-JA/KOMITE/2023', 'Kipas Angin Dinding Regency 18"', 'Elektronik/Listrik', 'Regency TW18', 2023, 'Komite / Yayasan', 450000, 'Baik', 'R-001', 'Tidak', '', '', 'Unit 1 dinding depan'],
      ['BRG-2024-003', '003/MTs-JA/KOMITE/2023', 'Kipas Angin Dinding Regency 18"', 'Elektronik/Listrik', 'Regency TW18', 2023, 'Komite / Yayasan', 450000, 'Baik', 'R-001', 'Tidak', '', '', 'Unit 2 dinding belakang'],
      ['BRG-2024-004', '004/MTs-JA/BOS/2024', 'Meja Kursi Siswa Kayu Ganda (Set 16 Meja)', 'Mebeler', 'Kayu Jati Lokal Kokoh', 2024, 'BOS Reguler', 12000000, 'Baik', 'R-001', 'Tidak', '', '', 'Kapasitas 32 santri'],
      ['BRG-2024-005', '005/MTs-JA/KEMENAG/2024', 'PC All-in-One Asus Core i5 (Unit 01)', 'Laboratorium Komputer', 'Asus Vivo AiO V241', 2024, 'Bantuan Kemenag RI', 11500000, 'Baik', 'R-031', 'Tidak', '', '', 'Lab Komputer 1 Client 01'],
      ['BRG-2024-006', '006/MTs-JA/BOS/2024', 'Wireless Portable Sound System 15"', 'Elektronik/Listrik', 'Baretone MAX15HB', 2024, 'BOS Reguler', 3200000, 'Baik', 'R-041', 'Ya', '', '', 'Disimpan di TU - Siap Pinjam untuk KBM/Upacara']
    ];
    sheetBarang.getRange(2, 1, sampleBarang.length, sampleBarang[0].length).setValues(sampleBarang);
  }

  // 5. Setup Sheet 3: Tiket_Perbaikan_Sarpras
  let sheetTiket = ss.getSheetByName('Tiket_Perbaikan_Sarpras');
  if (!sheetTiket) {
    sheetTiket = ss.insertSheet('Tiket_Perbaikan_Sarpras');
    sheetTiket.appendRow(['id_tiket', 'tgl_lapor', 'id_ruang', 'nama_ruang', 'pelapor_nama', 'pelapor_wa', 'tingkat_prioritas', 'judul_kendala', 'deskripsi_lengkap', 'url_foto_kendala', 'status_tiket', 'tgl_selesai', 'teknisi_penangan', 'catatan_solusi', 'biaya_perbaikan']);

    sheetTiket.appendRow([
      'FIX-20261028-001',
      Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'),
      'R-013',
      'Kelas VIII-3',
      'Ust. Ahmad Fauzi, S.Pd',
      '08126002003',
      '🔴 Mendesak / Emergency',
      'Kipas Angin Dinding Mati Total',
      'KBM santri kepanasan, kipas unit 2 mendadak mati dan stopkontak berbau panas.',
      '',
      'Diterima Teknisi',
      '',
      'Pak Mulyadi (Teknisi Listrik)',
      'Akan diganti kapasitor dan pengecekan sekering',
      0
    ]);
  }

  // 6. Setup Sheet 4: Transaksi_Peminjaman
  let sheetPinjam = ss.getSheetByName('Transaksi_Peminjaman');
  if (!sheetPinjam) {
    sheetPinjam = ss.insertSheet('Transaksi_Peminjaman');
    sheetPinjam.appendRow(['id_pinjam', 'kode_barang', 'nama_barang', 'nama_peminjam', 'email_peminjam', 'keperluan', 'tgl_pinjam', 'rencana_kembali', 'tgl_kembali_real', 'kondisi_sebelum', 'kondisi_sesudah', 'status_pinjam', 'petugas_sarpras']);
  }

  // 7. Setup Sheet 5: Laporan_Opname_Ruang
  let sheetOpname = ss.getSheetByName('Laporan_Opname_Ruang');
  if (!sheetOpname) {
    sheetOpname = ss.insertSheet('Laporan_Opname_Ruang');
    sheetOpname.appendRow(['id_laporan', 'id_ruang', 'tgl_inspeksi', 'pelapor_pj', 'total_barang_ruang', 'jumlah_baik', 'jumlah_rusak', 'rincian_rusak', 'url_foto_bukti', 'status_tindak_lanjut']);
  }

  // 8. Setup Sheet 6: AntrianNotif (gas-notifikasi-wa-crm)
  let sheetNotif = ss.getSheetByName('AntrianNotif');
  if (!sheetNotif) {
    sheetNotif = ss.insertSheet('AntrianNotif');
    sheetNotif.appendRow(['AntrianID', 'Kanal', 'Tujuan', 'NamaPenerima', 'Subjek', 'Pesan', 'Event', 'RefID', 'Status', 'Percobaan', 'Respon', 'DibuatPada', 'DikirimPada']);
  }

  // 9. Setup Kredensial & Script Properties Idempoten
  secret_(); // Ensure SESSION_SECRET exists
  if (!prop_('EMERGENCY_PASS_HASH')) {
    const defaultPass = 'SarprasJeumala2026!';
    const salt = Utilities.getUuid();
    setProps_({
      EMERGENCY_USER: 'darurat',
      EMERGENCY_SALT: salt,
      EMERGENCY_PASS_HASH: hashPass_(defaultPass, salt)
    });
    Logger.log('🔐 Kredensial Super Admin Darurat:');
    Logger.log('   Username: darurat (atau admin)');
    Logger.log('   Password: ' + defaultPass);
  }

  setProps_({
    SPREADSHEET_ID: ss.getId(),
    ROOT_FOLDER_ID: rootFolder.getId(),
    UPLOADS_FOLDER: uploadsFolder.getId(),
    EXPORTS_FOLDER: dirFolder.getId(),
    QR_FOLDER: qrFolder.getId(),
    HOTLINE_WA: '6281260001234',
    ADMIN_SARPRAS_NAMA: 'Ustadz Bukhari, S.T',
    MASTER_PIN_PJ: '123456',
    TAHUN_AJARAN: '2026/2027',
    KAMAD_NAMA: 'Ustadz Drs. H. Muhammad Jafar, M.Ag',
    KAMAD_NIP: '197508122002121003',
    NOTIF_WA_AKTIF: '1',
    NOTIF_EMAIL_AKTIF: '1'
  });

  Logger.log('✅ Inisialisasi Berhasil! URL Spreadsheet: ' + ss.getUrl());
}
