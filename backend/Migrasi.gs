// =========================================================================================
// SIM-SARPRAS MTs JEUMALA AMAL LUENG PUTU, PIDIE JAYA - ACEH
// MODUL MIGRASI & SINKRONISASI DATABASE SPREADSHEET (gas-migrasi-database)
// Memindahkan data inventaris lama ke sistem baru secara idempoten & aman
// =========================================================================================

function openSourceSpreadsheet_(idOrUrl) {
  const m = String(idOrUrl).match(/\/d\/([A-Za-z0-9_-]{20,})/);
  const id = m ? m[1] : String(idOrUrl).trim();
  const currentId = prop_('SPREADSHEET_ID');

  if (id === currentId) {
    throw new Error('ID Spreadsheet yang dimasukkan sama dengan spreadsheet aplikasi baru. Masukkan ID Spreadsheet LAMA.');
  }

  try {
    return SpreadsheetApp.openById(id);
  } catch (e) {
    throw new Error('Spreadsheet lama tidak dapat dibuka. Pastikan ID benar dan berada di akun Google yang sama.');
  }
}

function readSourceSheet_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh) return [];
  const v = sh.getDataRange().getValues();
  if (v.length <= 1) return [];

  const h = v[0].map(String).map(s => s.trim().toLowerCase());
  return v.slice(1).filter(r => r.join('') !== '').map(r => {
    const o = {};
    h.forEach((k, i) => { if (k) o[k] = r[i]; });
    return o;
  });
}

/**
 * Pindai & Migrasikan Master Barang dari Spreadsheet Lama
 * @param {string} sourceIdOrUrl - ID atau URL Spreadsheet lama
 * @param {string} sourceSheetName - Nama sheet di spreadsheet lama
 * @param {boolean} dryRun - Jika true, hanya simulasi hitung tanpa menulis
 */
function migrasikanDataBarang(sourceIdOrUrl, sourceSheetName, dryRun) {
  const ssLama = openSourceSpreadsheet_(sourceIdOrUrl);
  const dataLama = readSourceSheet_(ssLama, sourceSheetName || 'Data_Barang');
  if (!dataLama.length) {
    return { success: false, message: 'Tidak ada data ditemukan pada sheet sumber: ' + sourceSheetName };
  }

  const ssBaru = getSpreadsheet();
  const shTarget = ssBaru.getSheetByName('Master_Barang');
  const targetValues = shTarget.getDataRange().getValues();
  const targetHeaders = targetValues[0];
  const noInvIndex = targetHeaders.indexOf('no_inventaris');

  const existingMap = {};
  for (let r = 1; r < targetValues.length; r++) {
    const inv = String(targetValues[r][noInvIndex]).trim();
    if (inv) existingMap[inv] = r;
  }

  const hasil = { total: dataLama.length, ditambah: 0, diperbarui: 0, dilewati: 0, dryRun: !!dryRun };
  const barisBaru = [];

  dataLama.forEach(src => {
    // Cari mapping nama kolom secara fleksibel
    const noInv = String(src['no_inventaris'] || src['nomor_inventaris'] || src['no_inv'] || src['kode'] || '').trim();
    const namaBarang = String(src['nama_barang'] || src['nama'] || src['barang'] || '').trim();
    if (!namaBarang) {
      hasil.dilewati++;
      return;
    }

    const key = noInv || ('TEMP-' + acak_(6));

    if (existingMap[key] !== undefined) {
      // Data sudah ada, catat update
      hasil.diperbarui++;
    } else {
      // Data baru, siapkan baris baru sesuai urutan header target
      const kodeBarang = 'BRG-' + (src['tahun'] || new Date().getFullYear()) + '-' + acak_(4, '0123456789');
      const row = [
        kodeBarang,
        key,
        namaBarang,
        src['kategori'] || 'Mebeler',
        src['merek'] || src['tipe'] || '-',
        Number(src['tahun']) || new Date().getFullYear(),
        src['sumber_dana'] || 'BOS Reguler',
        Number(src['harga']) || 0,
        src['kondisi'] || 'Baik',
        src['id_ruang'] || src['ruangan'] || 'R-001',
        src['dapat_dipinjam'] || 'Tidak',
        '', // url_foto
        '', // url_qr_code
        src['keterangan'] || 'Hasil Migrasi Data Lama'
      ];
      barisBaru.push(row);
      hasil.ditambah++;
    }
  });

  if (!dryRun && barisBaru.length > 0) {
    shTarget.getRange(targetValues.length + 1, 1, barisBaru.length, targetHeaders.length).setValues(barisBaru);
    CacheX.remove('list_barang_all');
    CacheX.remove('dashboard_stats');
  }

  return { success: true, hasil: hasil };
}
