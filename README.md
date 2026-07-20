# Daffa — Financial OS

Personal financial operating system (web app) untuk LPDP Scholar di UCL London.
Berjalan sepenuhnya di browser, data tersimpan otomatis di perangkatmu (localStorage), dan
bisa dipasang ke home screen HP seperti aplikasi (PWA).

## Isi paket
- `index.html` — aplikasi utama
- `manifest.webmanifest` — konfigurasi PWA (nama, ikon, warna)
- `sw.js` — service worker (buka instan + app shell offline)
- `icon-192.png`, `icon-512.png` — ikon aplikasi

---

## Cara deploy ke GitHub Pages (gratis, ±5 menit)

1. Buat akun di https://github.com (jika belum punya).
2. Klik **New repository**. Beri nama, misalnya `financial-os`. Pilih **Public**. Klik **Create repository**.
3. Di halaman repo, klik **Add file → Upload files**.
4. Seret **SEMUA file** dari folder ini (`index.html`, `manifest.webmanifest`, `sw.js`, `icon-192.png`, `icon-512.png`) ke area upload. Klik **Commit changes**.
5. Buka tab **Settings → Pages** (menu kiri).
6. Di bagian **Build and deployment → Source**, pilih **Deploy from a branch**.
7. Pilih branch **main** dan folder **/ (root)**. Klik **Save**.
8. Tunggu ±1 menit. Halaman akan menampilkan link seperti:
   `https://username-kamu.github.io/financial-os/`
9. Buka link itu di HP. Selesai! 🎉

## Pasang ke home screen HP
- **iPhone (Safari):** buka situs → tombol **Share** → **Add to Home Screen**.
- **Android (Chrome):** buka situs → menu **⋮** → **Add to Home screen / Install app**.

Ikon Financial OS muncul di layar utama dan membuka layar penuh tanpa address bar.

## Catatan
- Data (anggaran, catatan, kurs, pengaturan) tersimpan di perangkat tempat kamu membukanya.
  Membuka di HP dan laptop = dua salinan data terpisah.
- Untuk mengembalikan ke angka awal: buka **Kurs & Pengaturan → Reset**.
- Kurs dan grafik memerlukan koneksi internet saat pertama dibuka.

## Menjalankan lokal (opsional)
Cukup buka `index.html` di browser. Untuk service worker aktif, jalankan lewat server kecil:
```
python3 -m http.server 8080
```
lalu buka http://localhost:8080

---

## v3 — Sinkronisasi Google Drive, FlowAI, Struk, Laporan PDF

### Update file di GitHub
Upload & timpa: `index.html` dan `sw.js` (cache v3). Commit → tunggu 1 menit → refresh situs 2×.

### Sinkron laptop ↔ HP (Google Drive)
Data lama tidak sinkron karena tersimpan per-perangkat. Sekarang app bisa menyimpan ke folder
**FinancialOS-Daffa** yang dibuatnya sendiri di Google Drive-mu (folder share lama tidak dipakai —
app membuat folder baru otomatis, sesuai permintaan).

Setup sekali (±3 menit), di dalam app juga ada panduannya (menu Pengaturan):
1. console.cloud.google.com → New Project.
2. APIs & Services → Library → **Google Drive API** → Enable.
3. OAuth consent screen → External → isi nama & email → Save → tambahkan email-mu di **Test users**.
4. Credentials → Create Credentials → **OAuth client ID** → Web application →
   Authorized JavaScript origins: `https://USERNAME.github.io` → Create → salin **Client ID**.
5. Di app: Pengaturan → tempel Client ID → **Hubungkan Drive** → pilih akun → izinkan.
6. Di HP: buka situs yang sama → Pengaturan → Hubungkan Drive (Client ID sudah tersimpan ikut data) → data otomatis sama.

Tanpa Drive, tetap bisa sinkron manual: Pengaturan → **Export Data** → kirim file ke HP → **Import Data**.

### FlowAI
Menu **FlowAI Config** berisi 7 langkah mengambil kunci gratis dari openrouter.ai. Tempel kunci → Simpan → asisten aktif di Dashboard.

### Fitur baru lain
- Tambah Transaksi: **Pengeluaran / Pemasukan / Transfer** (transfer tidak dihitung pengeluaran/pemasukan)
- Input nominal **Rp atau £** — otomatis dikonversi memakai kurs yang kamu set
- **Scan/upload struk** (kamera HP didukung, gambar dikompres; ikut tersimpan ke Drive saat terhubung)
- **Laporan Keuangan** per bulan: ringkasan, per kategori, saldo akun, daftar transaksi & transfer → tombol **Download PDF / Print**
- Kategori & akun bisa ditambah sendiri; tema baru putih + biru muda

---

## v4 — Claude AI, Google Sheets database, Explorer Hemat

Upload & timpa: `index.html` + `sw.js` (cache v4).

**Claude AI** (menu "Claude AI"): kunci dari console.anthropic.com → Billing (min $5; Haiku ±$0.003/pertanyaan) → API Keys → Create → paste → Simpan. Model: Haiku (murah) atau Sonnet (lebih dalam).

**Google Sheets = database & sinkron**: app membuat spreadsheet **FinancialOS-Daffa** (sheet "Transaksi" bisa dibuka di app Google Sheets HP; sheet "_data" untuk sinkron). Setup Client ID sama seperti sebelumnya, TAPI kini Enable **dua** API: Google Drive API **dan** Google Sheets API. Struk tetap masuk folder Drive FinancialOS-Daffa.

**Explorer Hemat**: peta + pencarian "cari apa / area", tombol pintar Belanja Murah (Lidl/Aldi/halal butcher/charity shop/Marketplace/Vinted…), Transport Termurah (TfL/Citymapper/Maps transit/bus-only/Trainline/Megabus + trik Hopper/cap/Railcard), Wisata gratis (museum, Sky Garden, walking tour, TodayTix) & diskon pelajar (UNiDAYS/TOTUM/Too Good To Go), serta **Tips untukmu** yang dianalisis dari transaksimu + tombol analisis mendalam Claude.

Set "Area rumah" di Pengaturan agar pencarian "terdekat" akurat.

---

## v5 — Perbaikan hilangnya riwayat + sinkron aman (WAJIB update)

Upload & timpa: `index.html` + `sw.js` (cache v6).

Perbaikan inti:
- **Riwayat tidak bisa hilang lagi.** Sinkron kini MENGGABUNGKAN (union) transaksi lokal & cloud per-ID — cloud kosong/lama tidak akan menimpa data lokal.
- **Cadangan lokal otomatis** setiap kali menyimpan; jika app terbuka dengan riwayat kosong, cadangan dipulihkan otomatis. Ada tombol **↩ Pulihkan Riwayat** di Pengaturan.
- Transaksi yang dihapus dicatat (tombstone) sehingga tidak "hidup lagi" saat sinkron.
- Auto-connect senyap saat app dibuka; token diperbarui otomatis; jika gagal senyap, cukup 1 klik "Hubungkan Google".
- Sinkron otomatis saat app kembali aktif (pindah HP↔laptop).
