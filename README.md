# Portofolio Hafiz Aryan Siregar

Repositori ini adalah kode sumber situs portofolio pribadi Hafiz Aryan Siregar yang tayang melalui GitHub Pages di alamat https://hafizaryan.github.io.

Situs ini menampilkan profil, latar belakang, proyek yang pernah dikerjakan, galeri kegiatan, sertifikat, dan resume dari seorang Web Developer dan Software Tester.

## Fitur

- Halaman utama satu berkas (`index.html`) dengan konten yang dimuat dari berkas parsial di `assets/partials/` melalui `partials-loader.js`.
- Animasi saat halaman digulir menggunakan pustaka AOS (Animate On Scroll).
- Ikon menggunakan Font Awesome 6.5.1 dari CDN.
- Dukungan ikon aplikasi web melalui `site.webmanifest` dan berkas favicon.
- Berkas `robots.txt` untuk pengaturan perayapan mesin pencari.
- Domain khusus yang diatur melalui berkas `CNAME`.

## Teknologi

- HTML5
- CSS3 (berkas `assets/css/style.css` dan `assets/css/page-animations.css`)
- JavaScript murni (berkas di `assets/js/`)
- AOS 2.3.1 untuk animasi scroll
- Font Awesome untuk ikon
- GitHub Pages untuk hosting

## Struktur Folder

- `index.html` - halaman utama portofolio
- `assets/css/` - stylesheet utama dan animasi halaman
- `assets/js/` - JavaScript untuk pemuatan parsial, inisialisasi halaman, dan interaksi
- `assets/partials/` - potongan HTML yang dimuat ke halaman utama
- `assets/images/` - berkas gambar
- `CNAME` - konfigurasi domain khusus GitHub Pages
- `site.webmanifest` - manifest aplikasi web
- `robots.txt` - aturan perayapan mesin pencari

## Cara Menjalankan

Situs ini statis dan tidak membutuhkan proses build.

1. Clone repositori ini.
2. Jalankan server statis, contohnya `python -m http.server 8000` atau `npx serve .`.
3. Buka `http://localhost:8000` di browser.

Setiap perubahan yang di-push ke branch utama akan otomatis diterbitkan ulang oleh GitHub Pages.
