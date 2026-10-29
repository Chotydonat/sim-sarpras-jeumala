// =========================================================================================
// SIM-SARPRAS MTs JEUMALA AMAL LUENG PUTU, PIDIE JAYA - ACEH
// MODUL NOTIFIKASI WHATSAPP (FONNTE / DEEP LINK), EMAIL & CRM KONTAK
// Mengikuti standar: gas-notifikasi-wa-crm & gas-scale-turbo
// =========================================================================================

const NOTIF_EVENTS = {
  TIKET_BARU: {
    label: 'Tiket Perbaikan Sarpras Diajukan',
    wa: true, email: true,
    subjek: '[SIM-SARPRAS] Tiket Baru #{no_tiket} ({prioritas}) - {ruang}',
    pesan: 'Assalamu\'alaikum Wr. Wb. Tim Sarpras,\nAda laporan perbaikan baru #{no_tiket} dari *{ruang}* ({pelapor}).\nPrioritas: *{prioritas}*\nItem: {item}\nKeterangan: {keterangan}\nMohon segera dicek. Terima kasih.'
  },
  TIKET_SELESAI: {
    label: 'Tiket Perbaikan Tuntas',
    wa: true, email: false,
    subjek: '[SIM-SARPRAS] Tiket #{no_tiket} Selesai Dikerjakan',
    pesan: 'Assalamu\'alaikum Wr. Wb. {pelapor},\nLaporan perbaikan #{no_tiket} di ruang *{ruang}* telah selesai dikerjakan oleh teknisi ({teknisi}).\nCatatan: {catatan}\nTerima kasih atas kerja samanya.'
  },
  PINJAM_JATUH_TEMPO: {
    label: 'Pengingat Pengembalian Alat KBM',
    wa: true, email: true,
    subjek: '[SIM-SARPRAS] Pengingat Pengembalian Alat #{id_pinjam}',
    pesan: 'Assalamu\'alaikum Wr. Wb. Ust./Ustdzh. {nama},\nPengingat bahwa peminjaman *{barang}* dijadwalkan kembali pada {target_kembali}. Mohon segera diserahkan ke bagian Sarpras jika sudah selesai digunakan. Terima kasih.'
  }
};

function waAktif_() {
  return prop_('NOTIF_WA_AKTIF', '1') === '1';
}

function emailAktif_() {
  return prop_('NOTIF_EMAIL_AKTIF', '1') === '1';
}

function hp62_(hp) {
  let s = String(hp || '').replace(/[^0-9]/g, '');
  if (s.startsWith('0')) s = '62' + s.slice(1);
  if (!s.startsWith('62') && s.length > 5) s = '62' + s;
  return s;
}

function hpValid_(hp) {
  const s = hp62_(hp);
  return s.length >= 10 && s.length <= 15;
}

function tambahAntrianNotif_(kanal, tujuan, namaPenerima, subjek, pesan, event, refId) {
  try {
    const ss = getSpreadsheet();
    let sheet = ss.getSheetByName('AntrianNotif');
    if (!sheet) {
      sheet = ss.insertSheet('AntrianNotif');
      sheet.appendRow(['AntrianID', 'Kanal', 'Tujuan', 'NamaPenerima', 'Subjek', 'Pesan', 'Event', 'RefID', 'Status', 'Percobaan', 'Respon', 'DibuatPada', 'DikirimPada']);
    }

    const antrianId = 'ANT-' + Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyyMMdd') + '-' + acak_(5, '0123456789');
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

    sheet.appendRow([
      antrianId,
      kanal,
      tujuan,
      namaPenerima || '',
      subjek || '',
      pesan || '',
      event || 'UMUM',
      refId || '',
      'Antri',
      0,
      '',
      nowStr,
      ''
    ]);

    setProp_('ANTRIAN_ADA', '1');
    return antrianId;
  } catch (e) {
    console.error('Gagal tambah antrian notif: ' + e.message);
    return null;
  }
}

// =========================================================================================
// PEMROSESAN ANTREAN NON-BLOCKING (Bisa dipanggil berkala via Time-driven Trigger)
// =========================================================================================
function prosesAntrianNotifManual(token) {
  const auth = verifyToken_(token);
  if (!auth || auth.role !== 'Admin') return { success: false, message: 'Akses ditolak.' };
  return prosesAntrianNotif_();
}

function prosesAntrianNotif_() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return { success: false, message: 'Proses lain sedang berjalan.' };

  try {
    const ss = getSpreadsheet();
    const sheet = ss.getSheetByName('AntrianNotif');
    if (!sheet) return { success: true, processed: 0 };

    const values = sheet.getDataRange().getValues();
    if (values.length <= 1) {
      setProp_('ANTRIAN_ADA', '0');
      return { success: true, processed: 0 };
    }

    const headers = values[0];
    const statusIdx = headers.indexOf('Status');
    const kanalIdx = headers.indexOf('Kanal');
    const tujuanIdx = headers.indexOf('Tujuan');
    const pesanIdx = headers.indexOf('Pesan');
    const subjekIdx = headers.indexOf('Subjek');
    const responIdx = headers.indexOf('Respon');
    const sentIdx = headers.indexOf('DikirimPada');
    const cobaIdx = headers.indexOf('Percobaan');

    const fonnteToken = prop_('FONNTE_TOKEN', '');
    let processedCount = 0;
    const nowStr = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'yyyy-MM-dd HH:mm:ss');

    // Proses maksimal 15 antrian per putaran agar tidak memakan limit eksekusi
    for (let i = 1; i < values.length && processedCount < 15; i++) {
      const row = values[i];
      if (row[statusIdx] === 'Antri') {
        const kanal = String(row[kanalIdx]).toUpperCase();
        const tujuan = String(row[tujuanIdx]).trim();
        const pesan = String(row[pesanIdx]);
        const subjek = String(row[subjekIdx]);
        let sukses = false;
        let responseMsg = '';

        if (kanal === 'WA') {
          if (fonnteToken && hpValid_(tujuan)) {
            try {
              const res = UrlFetchApp.fetch('https://api.fonnte.com/send', {
                method: 'POST',
                headers: { 'Authorization': fonnteToken },
                payload: {
                  target: hp62_(tujuan),
                  message: pesan
                },
                muteHttpExceptions: true
              });
              const resJson = JSON.parse(res.getContentText());
              sukses = resJson.status === true;
              responseMsg = resJson.reason || 'Fonnte Sent';
            } catch (err) {
              responseMsg = err.message;
            }
          } else {
            // Jika token Fonnte belum diisi, tandai siap kirim via Deep Link WA
            sukses = true;
            responseMsg = 'Siap via Deep Link WA Web';
          }
        } else if (kanal === 'EMAIL') {
          if (emailAktif_() && tujuan.includes('@')) {
            try {
              MailApp.sendEmail({
                to: tujuan,
                subject: subjek || '[SIM-SARPRAS] Notifikasi Madrasah',
                body: pesan
              });
              sukses = true;
              responseMsg = 'Email terkirim via MailApp';
            } catch (err) {
              responseMsg = err.message;
            }
          }
        }

        const newStatus = sukses ? 'Terkirim' : 'Gagal';
        const percobaan = (Number(row[cobaIdx]) || 0) + 1;

        sheet.getRange(i + 1, statusIdx + 1).setValue(newStatus);
        sheet.getRange(i + 1, cobaIdx + 1).setValue(percobaan);
        sheet.getRange(i + 1, responIdx + 1).setValue(responseMsg);
        if (sukses) {
          sheet.getRange(i + 1, sentIdx + 1).setValue(nowStr);
        }
        processedCount++;
      }
    }

    return { success: true, processed: processedCount };
  } finally {
    lock.releaseLock();
  }
}
