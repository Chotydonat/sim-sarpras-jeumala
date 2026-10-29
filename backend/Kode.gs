// =========================================================================================
// SIM-SARPRAS MTs JEUMALA AMAL LUENG PUTU, PIDIE JAYA - ACEH
// BACKEND REST API CONTROLLER (Pure JSON - No iFrame - No CORS Issue)
// Mengikuti standar: gas-pro-api, gas-rahasia-script-properties, gas-scale-turbo
// =========================================================================================

const APP_NAME = 'SIM-SARPRAS MTs Jeumala Amal';
const APP_VERSION = '2.4.0-turbo';
const SESI_JAM = 12;

// =========================================================================================
// 1. SCRIPT PROPERTIES & KEAMANAN (gas-rahasia-script-properties)
// =========================================================================================
const PROPS = PropertiesService.getScriptProperties();
let _PROP_MEMO = null;

function prop_(key, def) {
  if (!_PROP_MEMO) _PROP_MEMO = PROPS.getProperties();
  const v = _PROP_MEMO[key];
  return v === undefined || v === null || v === '' ? (def === undefined ? '' : def) : v;
}

function setProp_(key, val) {
  PROPS.setProperty(key, String(val));
  if (_PROP_MEMO) _PROP_MEMO[key] = String(val);
}

function setProps_(obj) {
  PROPS.setProperties(obj);
  if (_PROP_MEMO) Object.keys(obj).forEach(k => { _PROP_MEMO[k] = String(obj[k]); });
}

function delProp_(key) {
  PROPS.deleteProperty(key);
  if (_PROP_MEMO) delete _PROP_MEMO[key];
}

function secret_() {
  let s = prop_('SESSION_SECRET');
  if (!s) {
    s = acak_(64);
    setProp_('SESSION_SECRET', s);
  }
  return s;
}

function acak_(n, huruf) {
  huruf = huruf || 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let s = '';
  while (s.length < n) {
    Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid())
      .forEach(b => { if (s.length < n) s += huruf[(b & 0xff) % huruf.length]; });
  }
  return s;
}

function sandiAcak_(n) {
  const s = acak_(n || 16);
  return /\d/.test(s) && /[A-Za-z]/.test(s) ? s : sandiAcak_(n);
}

function hashPass_(pass, salt) {
  let h = String(pass);
  for (let i = 0; i < 300; i++) {
    h = Utilities.base64Encode(Utilities.computeHmacSha256Signature(h + salt, salt));
  }
  return h;
}

function samaAman_(a, b) {
  a = String(a); b = String(b);
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

function hmac_(s) {
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(s, secret_())).replace(/=+$/, '');
}

function signToken_(p) {
  const body = Utilities.base64EncodeWebSafe(JSON.stringify(p)).replace(/=+$/, '');
  return body + '.' + hmac_(body);
}

function verifyToken_(t) {
  try {
    const parts = String(t || '').split('.');
    if (parts.length !== 2 || !samaAman_(hmac_(parts[0]), parts[1])) return null;
    let b = parts[0]; while (b.length % 4) b += '=';
    const p = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(b)).getDataAsString());
    if (!p.x || p.x < Date.now()) return null;

    const rev = Number(CacheService.getScriptCache().get('rev_' + p.e) || prop_('REV_' + p.e) || 0);
    if (p.i < rev) return null;

    return { email: p.e, role: p.r, nama: p.n || '', ruang: p.ruang || '', exp: p.x };
  } catch (e) {
    return null;
  }
}

// =========================================================================================
// 2. CACHEX & OPTIMASI KUOTA (gas-scale-turbo)
// =========================================================================================
const CacheX = {
  SZ: 50000,
  c: function () { return CacheService.getScriptCache(); },
  get: function (key) {
    try {
      const c = this.c(), head = c.get(key);
      if (head == null) return null;
      if (head.indexOf('__chunks:') !== 0) return JSON.parse(head);
      const n = +head.slice(9), keys = [];
      for (let i = 0; i < n; i++) keys.push(key + '#' + i);
      const parts = c.getAll(keys);
      let s = '';
      for (let i = 0; i < n; i++) {
        if (parts[keys[i]] == null) return null;
        s += parts[keys[i]];
      }
      return JSON.parse(s);
    } catch (e) { return null; }
  },
  put: function (key, val, ttl) {
    ttl = ttl || 1800; // default 30 menit
    try {
      const s = JSON.stringify(val), c = this.c();
      if (s.length <= this.SZ) { c.put(key, s, ttl); return true; }
      const n = Math.ceil(s.length / this.SZ);
      if (n > 20) return false;
      const m = {};
      for (let i = 0; i < n; i++) m[key + '#' + i] = s.substr(i * this.SZ, this.SZ);
      c.putAll(m, ttl);
      c.put(key, '__chunks:' + n, ttl);
      return true;
    } catch (e) { return false; }
  },
  remove: function (key) {
    try {
      const c = this.c(), head = c.get(key);
      if (head && head.indexOf('__chunks:') === 0) {
        const n = +head.slice(9), keys = [key];
        for (let i = 0; i < n; i++) keys.push(key + '#' + i);
        c.removeAll(keys);
      } else {
        c.remove(key);
      }
    } catch (e) {}
  }
};

// =========================================================================================
// 3. ENTRY POINTS: doGet & doPost (CORS Friendly, Pure REST JSON)
// =========================================================================================
function doGet(e) {
  const t0 = Date.now();
  try {
    const action = (e && e.parameter && e.parameter.action) || 'ping';
    let result;

    switch (action) {
      case 'ping':
        result = { success: true, message: 'SIM-SARPRAS Jeumala REST API Aktif', time: new Date().toISOString() };
        break;
      case 'getPublicConfig':
        result = getPublicConfig();
        break;
      case 'getRuanganList':
        result = getRuanganList();
        break;
      case 'getBarangList':
        result = getBarangList(e.parameter.id_ruang);
        break;
      case 'getLacakTiket':
        result = getLacakTiket(e.parameter.no_tiket);
        break;
      case 'getDashboardStats':
        result = getDashboardStats();
        break;
      case 'getDIRData':
        result = getDIRData(e.parameter.id_ruang);
        break;
      default:
        result = { success: false, message: 'Action doGet tidak dikenal: ' + action };
    }

    result.ms = Date.now() - t0;
    result.v = APP_VERSION;
    return buildResponse(result);
  } catch (err) {
    return buildResponse({ success: false, message: err.message, ms: Date.now() - t0, v: APP_VERSION });
  }
}

function doPost(e) {
  const t0 = Date.now();
  try {
    let body = {};
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
    const action = body.action || '';
    const payload = body.data || {};
    let result;

    switch (action) {
      case 'login':
        result = handleLogin(payload);
        break;
      case 'laporTiketWA':
        result = handleLaporTiketWA(payload);
        break;
      case 'simpanOpname':
        result = handleSimpanOpname(payload, body.token);
        break;
      case 'ajukanPinjam':
        result = handleAjukanPinjam(payload);
        break;
      case 'updateStatusTiket':
        result = handleUpdateStatusTiket(payload, body.token);
        break;
      case 'simpanBarang':
        result = handleSimpanBarang(payload, body.token);
        break;
      case 'updateRuangan':
        result = handleUpdateRuangan(payload, body.token);
        break;
      case 'prosesAntrianNotif':
        result = prosesAntrianNotifManual(body.token);
        break;
      default:
        result = { success: false, message: 'Action doPost tidak dikenal: ' + action };
    }

    result.ms = Date.now() - t0;
    result.v = APP_VERSION;
    return buildResponse(result);
  } catch (err) {
    return buildResponse({ success: false, message: err.message, ms: Date.now() - t0, v: APP_VERSION });
  }
}

function buildResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// =========================================================================================
// 4. BUSINESS LOGIC HANDLERS
// =========================================================================================

function getPublicConfig() {
  return {
    success: true,
    data: {
      appName: APP_NAME,
      version: APP_VERSION,
      institusi: 'MTs Jeumala Amal Lueng Putu',
      kabupaten: 'Pidie Jaya, Aceh',
      totalRuangan: 43,
      totalSiswa: 1050,
      hotlineSarprasWA: prop_('HOTLINE_WA', '6281234567890'),
      namaAdminSarpras: prop_('ADMIN_SARPRAS_NAMA', 'Ustadz Bukhari, S.T'),
      googleClientId: prop_('GOOGLE_CLIENT_ID', '')
    }
  };
}

function getRuanganList() {
  const cached = CacheX.get('list_ruangan');
  if (cached) return { success: true, data: cached, fromCache: true };

  const rows = getSheetData('Master_Ruangan');
  CacheX.put('list_ruangan', rows, 3600);
  return { success: true, data: rows };
}

function getBarangList(idRuang) {
  const cacheKey = 'list_barang_' + (idRuang || 'all');
  const cached = CacheX.get(cacheKey);
  if (cached) return { success: true, data: cached, fromCache: true };

  let rows = getSheetData('Master_Barang');
  if (idRuang) {
    rows = rows.filter(b => String(b.id_ruang).toLowerCase() === String(idRuang).toLowerCase());
  }
  CacheX.put(cacheKey, rows, 1800);
  return { success: true, data: rows };
}

function getLacakTiket(noTiket) {
  if (!noTiket) return { success: false, message: 'Nomor tiket wajib diisi' };
  const cleanTiket = String(noTiket).trim().toUpperCase();
  const rows = getSheetData('Tiket_Perbaikan_Sarpras');
  const found = rows.find(t => String(t.id_tiket).trim().toUpperCase() === cleanTiket);

  if (!found) {
    return { success: false, message: 'Tiket ' + cleanTiket + ' tidak ditemukan dalam sistem.' };
  }
  return { success: true, data: found };
}

function getDashboardStats() {
  const cached = CacheX.get('dashboard_stats');
  if (cached) return { success: true, data: cached, fromCache: true };

  const barang = getSheetData('Master_Barang');
  const ruangan = getSheetData('Master_Ruangan');
  const tiket = getSheetData('Tiket_Perbaikan_Sarpras');

  let baik = 0, rusakRingan = 0, rusakBerat = 0, hilang = 0;
  let totalNilai = 0;
  const sumberDanaCount = {};

  barang.forEach(b => {
    const k = String(b.kondisi || '').toLowerCase();
    if (k.includes('baik')) baik++;
    else if (k.includes('ringan')) rusakRingan++;
    else if (k.includes('berat')) rusakBerat++;
    else if (k.includes('hilang')) hilang++;
    else baik++;

    const harga = Number(b.harga_perolehan) || 0;
    totalNilai += harga;

    const dana = b.sumber_dana || 'Lainnya';
    sumberDanaCount[dana] = (sumberDanaCount[dana] || 0) + 1;
  });

  const tiketAktif = tiket.filter(t => !['selesai', 'ditolak', 'batal'].includes(String(t.status_tiket || '').toLowerCase()));
  const tiketMendesak = tiketAktif.filter(t => String(t.tingkat_prioritas || '').toLowerCase().includes('mendesak'));

  const stats = {
    totalRuangan: ruangan.length || 43,
    totalBarang: barang.length,
    kondisi: { baik, rusakRingan, rusakBerat, hilang, persentaseBaik: barang.length ? ((baik / barang.length) * 100).toFixed(1) : '100' },
    totalNilaiPerolehan: totalNilai,
    sumberDana: sumberDanaCount,
    tiket: {
      total: tiket.length,
      aktif: tiketAktif.length,
      mendesak: tiketMendesak.length,
      terbaru: tiket.slice(-5).reverse()
    }
  };

  CacheX.put('dashboard_stats', stats, 900); // 15 menit
  return { success: true, data: stats };
}

function getDIRData(idRuang) {
  if (!idRuang) return { success: false, message: 'ID Ruangan diperlukan' };
  const ruanganList = getSheetData('Master_Ruangan');
  const ruang = ruanganList.find(r => String(r.id_ruang).toLowerCase() === String(idRuang).toLowerCase());
  if (!ruang) return { success: false, message: 'Ruangan tidak ditemukan' };

  const barang = getBarangList(idRuang).data || [];
  const verificationPayload = idRuang + '|' + (ruang.nama_pj || '') + '|' + barang.length;
  const hmacCode = hmac_(verificationPayload).slice(0, 16);

  return {
    success: true,
    data: {
      ruang: ruang,
      barang: barang,
      tahunAjaran: prop_('TAHUN_AJARAN', '2026/2027'),
      kepalaMadrasah: prop_('KAMAD_NAMA', 'Ustadz Drs. H. Muhammad Jafar, M.Ag'),
      nipKamad: prop_('KAMAD_NIP', '197508122002121003'),
      hmacVerification: hmacCode,
      tanggalCetak: Utilities.formatDate(new Date(), 'Asia/Jakarta', 'dd MMMM yyyy')
    }
  };
}

// =========================================================================================
// 5. TRANSAKSI & MUTASI DATA (Idempotent, Safe, Non-Blocking)
// =========================================================================================

function handleLogin(payload) {
  const role = payload.role || '';
  const email = String(payload.email || '').trim().toLowerCase();
  const pin = String(payload.pin || '').trim();
  const idRuang = payload.id_ruang || '';

  // 1. Akses Darurat Super Admin
  if (email === prop_('EMERGENCY_USER', 'darurat') || email === 'admin') {
    const salt = prop_('EMERGENCY_SALT', '');
    const hash = prop_('EMERGENCY_PASS_HASH', '');
    if (salt && hash && samaAman_(hashPass_(pin, salt), hash)) {
      const token = signToken_({ e: 'admin@jeumala.sch.id', r: 'Admin', n: 'Super Admin Sarpras', i: Date.now(), x: Date.now() + SESI_JAM * 3600e3 });
      return { success: true, token: token, user: { email: 'admin@jeumala.sch.id', role: 'Admin', nama: 'Super Admin Sarpras' } };
    }
  }

  // 2. Akses Cepat Wali Kelas / Penanggung Jawab Ruangan via PIN
  if (idRuang) {
    const masterPIN = prop_('MASTER_PIN_PJ', '123456');
    const ruangList = getSheetData('Master_Ruangan');
    const ruang = ruangList.find(r => String(r.id_ruang).toLowerCase() === String(idRuang).toLowerCase());

    if (ruang && (pin === masterPIN || pin === String(ruang.pin_ruang || masterPIN))) {
      const token = signToken_({
        e: ruang.email_pj || ('pj_' + idRuang + '@jeumala.sch.id'),
        r: 'PJ_Ruang',
        n: ruang.nama_pj || ('PJ ' + ruang.nama_ruang),
        ruang: idRuang,
        i: Date.now(),
        x: Date.now() + SESI_JAM * 3600e3
      });
      return {
        success: true,
        token: token,
        user: { email: ruang.email_pj, role: 'PJ_Ruang', nama: ruang.nama_pj, ruang: ruang }
      };
    }
    return { success: false, message: 'PIN Akses Penanggung Jawab Ruangan salah atau tidak terdaftar.' };
  }

  return { success: false, message: 'Kombinasi akun atau PIN tidak valid.' };
}

function handleLaporTiketWA(payload) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Tiket_Perbaikan_Sarpras');
  if (!sheet) throw new Error('Sheet Tiket_Perbaikan_Sarpras tidak ditemukan');

  const idTiket = 'FIX-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd') + '-' + acak_(4, '0123456789');
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  // Handle foto base64 jika ada
  let fotoUrl = '';
  if (payload.foto_base64 && payload.foto_base64.length > 50) {
    try {
      fotoUrl = simpanFotoDrive(payload.foto_base64, 'FOTO_' + idTiket);
    } catch (e) {
      fotoUrl = 'Gagal upload: ' + e.message;
    }
  }

  const row = [
    idTiket,
    nowStr,
    payload.id_ruang || '',
    payload.nama_ruang || '',
    payload.pelapor_nama || 'Wali Kelas / PJ',
    payload.pelapor_wa || '',
    payload.tingkat_prioritas || 'Sedang',
    payload.judul_kendala || 'Kerusakan Sarpras',
    payload.deskripsi_lengkap || '',
    fotoUrl,
    'Diajukan',
    '', // tgl_selesai
    '', // teknisi_penangan
    '', // catatan_solusi
    ''  // biaya
  ];

  sheet.appendRow(row);
  CacheX.remove('dashboard_stats');

  // Siapkan Teks Pesan WhatsApp Terformat
  const hotlineWA = prop_('HOTLINE_WA', '6281234567890');
  const priorityEmoji = String(payload.tingkat_prioritas).includes('Mendesak') ? '🔴' : (String(payload.tingkat_prioritas).includes('Sedang') ? '🟡' : '🟢');
  const waText = 
    `*${priorityEmoji} TIKET PERMINTAAN PERBAIKAN SARPRAS*\n` +
    `*MTs Jeumala Amal Lueng Putu*\n` +
    `==================================\n` +
    `*No. Tiket:* #${idTiket}\n` +
    `*Prioritas:* ${payload.tingkat_prioritas || 'Sedang'}\n` +
    `*Ruangan:* ${payload.nama_ruang || payload.id_ruang}\n` +
    `*Pelapor:* ${payload.pelapor_nama || 'PJ Ruangan'}\n` +
    `*Kontak WA:* ${payload.pelapor_wa || '-'}\n` +
    `----------------------------------\n` +
    `*Item Kendala:* ${payload.judul_kendala || '-'}\n` +
    `*Keterangan:* ${payload.deskripsi_lengkap || '-'}\n` +
    (fotoUrl.startsWith('http') ? `*Foto Bukti:* ${fotoUrl}\n` : '') +
    `*Waktu Lapor:* ${nowStr} WIB\n` +
    `==================================\n` +
    `_Tiket tercatat di SIM-SARPRAS. Mohon segera dicek oleh Tim Teknisi._`;

  const waUrl = 'https://api.whatsapp.com/send?phone=' + hotlineWA.replace(/[^0-9]/g, '') + '&text=' + encodeURIComponent(waText);

  // Buat antrean notifikasi asynchronous ke sheet AntrianNotif (gas-notifikasi-wa-crm)
  tambahAntrianNotif_('WA', hotlineWA, 'Teknisi Sarpras', 'Tiket ' + idTiket, waText, 'TIKET_BARU', idTiket);

  return {
    success: true,
    message: 'Tiket berhasil didaftarkan!',
    no_tiket: idTiket,
    wa_url: waUrl,
    foto_url: fotoUrl
  };
}

function handleSimpanOpname(payload, token) {
  const auth = verifyToken_(token);
  if (!auth) return { success: false, message: 'Sesi habis, silakan login ulang.' };

  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Laporan_Opname_Ruang');
  const idLaporan = 'OPN-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd') + '-' + acak_(4, '0123456789');
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  const row = [
    idLaporan,
    payload.id_ruang || auth.ruang || '',
    nowStr,
    auth.nama || payload.pelapor_pj || '',
    payload.total_barang || 0,
    payload.jumlah_baik || 0,
    payload.jumlah_rusak || 0,
    payload.rincian_rusak || 'Semua dalam kondisi baik',
    payload.foto_url || '',
    'Selesai Cek'
  ];

  sheet.appendRow(row);
  CacheX.remove('list_ruangan');
  CacheX.remove('dashboard_stats');

  return { success: true, message: 'Stock Opname ruangan berhasil disimpan!', id_laporan: idLaporan };
}

function handleAjukanPinjam(payload) {
  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Transaksi_Peminjaman');
  const idPinjam = 'PINJAM-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd') + '-' + acak_(4, '0123456789');
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

  const row = [
    idPinjam,
    payload.kode_barang || '',
    payload.nama_barang || '',
    payload.nama_peminjam || '',
    payload.email_peminjam || '',
    payload.keperluan || '',
    nowStr,
    payload.rencana_kembali || '',
    '', // tgl kembali real
    payload.kondisi_sebelum || 'Baik',
    '', // kondisi sesudah
    'Diajukan',
    'Pending Approval'
  ];

  sheet.appendRow(row);
  return { success: true, message: 'Permohonan peminjaman berhasil diajukan!', id_pinjam: idPinjam };
}

function handleUpdateStatusTiket(payload, token) {
  const auth = verifyToken_(token);
  if (!auth || auth.role !== 'Admin') return { success: false, message: 'Akses ditolak. Khusus Admin.' };

  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Tiket_Perbaikan_Sarpras');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIndex = headers.indexOf('id_tiket');
  const statusIndex = headers.indexOf('status_tiket');
  const teknisiIndex = headers.indexOf('teknisi_penangan');
  const catatanIndex = headers.indexOf('catatan_solusi');
  const selesaiIndex = headers.indexOf('tgl_selesai');

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIndex]) === String(payload.id_tiket)) {
      if (statusIndex > -1) sheet.getRange(i + 1, statusIndex + 1).setValue(payload.status_tiket);
      if (teknisiIndex > -1 && payload.teknisi) sheet.getRange(i + 1, teknisiIndex + 1).setValue(payload.teknisi);
      if (catatanIndex > -1 && payload.catatan) sheet.getRange(i + 1, catatanIndex + 1).setValue(payload.catatan);
      if (selesaiIndex > -1 && payload.status_tiket === 'Selesai') {
        sheet.getRange(i + 1, selesaiIndex + 1).setValue(Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss'));
      }
      CacheX.remove('dashboard_stats');
      return { success: true, message: 'Status tiket berhasil diperbarui!' };
    }
  }
  return { success: false, message: 'Tiket tidak ditemukan.' };
}

function handleSimpanBarang(payload, token) {
  const auth = verifyToken_(token);
  if (!auth || auth.role !== 'Admin') return { success: false, message: 'Akses ditolak. Khusus Admin.' };

  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Master_Barang');
  const kodeBarang = payload.kode_barang || ('BRG-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy') + '-' + acak_(4, '0123456789'));

  let fotoUrl = payload.url_foto || '';
  if (payload.foto_base64 && payload.foto_base64.length > 50) {
    fotoUrl = simpanFotoDrive(payload.foto_base64, 'ASET_' + kodeBarang);
  }

  sheet.appendRow([
    kodeBarang,
    payload.no_inventaris || '',
    payload.nama_barang || '',
    payload.kategori_barang || '',
    payload.merek_tipe || '',
    payload.tahun_pembelian || new Date().getFullYear(),
    payload.sumber_dana || 'BOS Reguler',
    Number(payload.harga_perolehan) || 0,
    payload.kondisi || 'Baik',
    payload.id_ruang || '',
    payload.dapat_dipinjam || 'Tidak',
    fotoUrl,
    payload.url_qr_code || '',
    payload.keterangan || ''
  ]);

  CacheX.remove('list_barang_all');
  CacheX.remove('list_barang_' + payload.id_ruang);
  CacheX.remove('dashboard_stats');

  return { success: true, message: 'Aset barang baru berhasil disimpan!', kode_barang: kodeBarang };
}

function handleUpdateRuangan(payload, token) {
  const auth = verifyToken_(token);
  if (!auth || auth.role !== 'Admin') return { success: false, message: 'Akses ditolak. Khusus Admin.' };

  const ss = getSpreadsheet();
  const sheet = ss.getSheetByName('Master_Ruangan');
  const values = sheet.getDataRange().getValues();
  const headers = values[0];
  const idIndex = headers.indexOf('id_ruang');

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIndex]) === String(payload.id_ruang)) {
      if (payload.nama_pj) sheet.getRange(i + 1, headers.indexOf('nama_pj') + 1).setValue(payload.nama_pj);
      if (payload.nip_id_pj) sheet.getRange(i + 1, headers.indexOf('nip_id_pj') + 1).setValue(payload.nip_id_pj);
      if (payload.email_pj) sheet.getRange(i + 1, headers.indexOf('email_pj') + 1).setValue(payload.email_pj);
      if (payload.no_whatsapp_pj) sheet.getRange(i + 1, headers.indexOf('no_whatsapp_pj') + 1).setValue(payload.no_whatsapp_pj);
      CacheX.remove('list_ruangan');
      return { success: true, message: 'Data ruangan berhasil diperbarui!' };
    }
  }
  return { success: false, message: 'Ruangan tidak ditemukan.' };
}

// =========================================================================================
// 6. HELPER GOOGLE DRIVE & STORAGE
// =========================================================================================
function simpanFotoDrive(base64String, namaFile) {
  const uploadsFolderId = prop_('UPLOADS_FOLDER');
  let folder;
  if (uploadsFolderId) {
    try { folder = DriveApp.getFolderById(uploadsFolderId); } catch(e) {}
  }
  if (!folder) folder = DriveApp.getRootFolder();

  const parts = base64String.split(',');
  const contentType = parts[0].indexOf('png') > -1 ? 'image/png' : 'image/jpeg';
  const rawData = Utilities.base64Decode(parts[1] || parts[0]);
  const blob = Utilities.newBlob(rawData, contentType, namaFile + (contentType === 'image/png' ? '.png' : '.jpg'));
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w1200';
}
