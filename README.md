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
