Folder ini untuk menyimpan aset gambar/animasi Anda.

LOGO KUCING TERRANOVA (video MP4)
-----------------------------------
Kode di semua file HTML sudah disiapkan untuk memakai file ini:

  assets/images/logo-kucing.mp4

Yang perlu Anda lakukan:

1. Simpan file video animasi kucing Anda di folder ini dengan nama PERSIS:
   logo-kucing.mp4
   (huruf besar/kecil dan ekstensi harus cocok persis, atau video tidak
   akan muncul)

2. Selesai. Tidak perlu edit kode apa pun - begitu file ini ada di folder,
   video otomatis muncul di 3 tempat:
   a. Navbar (kecil, 40x40px) - ada di SEMUA 8 halaman, video LOOP terus
      (cari <span class="brand-logo-wrap"> kalau mau lihat kodenya)
   b. Hero besar (96x96px) - hanya di index.html, video LOOP terus
      (cari <div class="hero-logo-wrap"> kalau mau lihat kodenya)
   c. Intro/opening animation - hanya di index.html, video diputar SEKALI
      saja (tidak loop), sesuai permintaan
      (cari <div class="intro-logo-wrap"> kalau mau lihat kodenya)

3. Video sudah diatur otomatis: autoplay, muted (tanpa suara), playsinline
   (supaya autoplay jalan di HP/iPhone tanpa perlu disentuh dulu), dan
   preload="auto". Tidak ada tombol kontrol video yang muncul.

4. Sebelum file ini ada (atau kalau nama filenya keliru), navbar/hero/intro
   akan otomatis menampilkan badge "TN" bergradasi cyan-ungu sebagai
   fallback - jadi tampilan tetap rapi, bukan area kosong/rusak.

5. Intro animation TIDAK bergantung pada video ini untuk selesai - durasi
   intro (sekitar 2-3 detik) dan tombol Skip berjalan pakai timer sendiri
   di script.js, terpisah total dari status video. Jadi walau videonya
   belum ada atau gagal dimuat, intro tetap otomatis lanjut ke homepage
   seperti biasa, tidak akan "macet".

CATATAN PERFORMA
-----------------
- Usahakan ukuran file video tidak terlalu besar (idealnya di bawah 2-3 MB,
  durasi pendek) supaya loading halaman tetap cepat di HP.
- Jangan tambahkan animasi CSS transform tambahan langsung ke tag <video>
  logo (misal rotate/scale terus-menerus) karena bisa bentrok dengan
  animasi internal video itu sendiri dan menyebabkan patah-patah (stutter).
  Animasi floating/glow/hover sudah dipasang di elemen WRAPPER
  (brand-logo-wrap / hero-logo-wrap / intro-logo-wrap), bukan di file
  video-nya langsung - biarkan seperti itu.
