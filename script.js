/* =========================================================
   TERRANOVA STORE - script.js
   Daftar isi:
   1. KONFIGURASI (ganti nilai di sini)
   2. DATA PRODUK
   3. HELPER: WhatsApp link generator
   4. RENDER: Product card & grid
   5. RENDER: Pricelist
   6. SETUP: Link WhatsApp / Instagram / Grup di seluruh halaman
   7. HAMBURGER MENU & SIDEBAR
   8. SMOOTH SCROLL (khusus navbar sticky)
   9. ANIMASI SCROLL REVEAL
   10. GALAXY BACKGROUND (nebula, bintang, meteor)
   11. INTRO / OPENING ANIMATION (hanya di index.html)
   ========================================================= */

/* ================= 1. KONFIGURASI ================= */
/* Satu-satunya tempat data kontak Terranova Store. Kalau nomor WhatsApp,
   link grup, atau akun social media berubah, cukup ganti di sini saja -
   seluruh halaman otomatis ikut ter-update (dipakai lewat CONFIG.xxx). */
const CONFIG = {
  whatsapp: "628967198609", // nomor WhatsApp Business (tanpa +, spasi, atau -)
  whatsappLink: "https://wa.me/628967198609",
  group: "https://chat.whatsapp.com/BielVf93ytvLI20G5amjjp?s=cl&p=a&mlu=4&ilr=4",
  instagram: "https://www.instagram.com/_terranovastore/",
  tiktok: "https://www.tiktok.com/@_terranovastore",
};


/* ================= 2. DATA PRODUK ================= */
/*
  Setiap produk mengikuti struktur berikut:
  {
    name        : nama produk (tampil di card)
    category    : salah satu dari "streaming" | "editing" | "listening" | "study" | "lainnya" | "topup"
    icon        : emoji/ikon produk
    description : deskripsi singkat
    packages    : daftar paket -> [{ label: "1 Bulan", price: "Rp XX.XXX" }, ...]
  }

  CATATAN: Semua harga di bawah ini masih PLACEHOLDER (Rp XX.XXX).
  Ganti dengan harga asli sebelum website dipublikasikan.
  Untuk menambah produk baru, cukup tambahkan object baru ke array "products".
*/
const products = [

  /* ---------- APK STREAMING ---------- */
  {
    name: "Netflix Premium",
    category: "streaming",
    icon: "🎬",
    description: "Nonton film & series favorit sepuasnya, kualitas Ultra HD.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "2 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "Vidio Platinum",
    category: "streaming",
    icon: "📺",
    description: "Streaming film, series, dan siaran olahraga lokal.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "VIU Premium",
    category: "streaming",
    icon: "🎞️",
    description: "Drama Asia dan tayangan eksklusif tanpa iklan.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "YouTube Premium",
    category: "streaming",
    icon: "▶️",
    description: "Bebas iklan, bisa diputar di latar belakang.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
      { label: "6 Bulan", price: "Rp XX.XXX" },
    ],
  },

  /* ---------- APK EDITING ---------- */
  {
    name: "Canva Pro",
    category: "editing",
    icon: "🎨",
    description: "Desain grafis, konten sosial media, dan presentasi.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "1 Tahun", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "CapCut Pro",
    category: "editing",
    icon: "🎬",
    description: "Edit video dengan efek premium dan tanpa watermark.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "FaceApp Pro",
    category: "editing",
    icon: "🙂",
    description: "Filter wajah & efek AI premium.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "PicsArt Premium",
    category: "editing",
    icon: "🖌️",
    description: "Edit foto lengkap dengan stiker & tools premium.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "1 Tahun", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "Adobe Lightroom Premium",
    category: "editing",
    icon: "📷",
    description: "Preset & tools editing warna profesional.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "VSCO Membership",
    category: "editing",
    icon: "🌈",
    description: "Filter estetik dan tools editing foto premium.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "Remini Premium",
    category: "editing",
    icon: "✨",
    description: "Perbaiki & tingkatkan kualitas foto lama/blur.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "VN Editor Pro",
    category: "editing",
    icon: "🎥",
    description: "Aplikasi edit video ringan dengan fitur pro.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },

  /* ---------- APK LISTENING ---------- */
  {
    name: "Spotify Premium",
    category: "listening",
    icon: "🎵",
    description: "Dengarkan musik tanpa iklan, bisa download offline.",
    packages: [
      { label: "Sharing - 1 Bulan", price: "Rp XX.XXX" },
      { label: "Sharing - 3 Bulan", price: "Rp XX.XXX" },
      { label: "Full Garansi - 1 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "Apple Music",
    category: "listening",
    icon: "🎧",
    description: "Streaming musik kualitas tinggi dari Apple.",
    packages: [
      { label: "Sharing - 1 Bulan", price: "Rp XX.XXX" },
      { label: "Full Garansi - 1 Bulan", price: "Rp XX.XXX" },
    ],
  },

  /* ---------- APK STUDY ---------- */
  {
    name: "Quizlet Plus",
    category: "study",
    icon: "📖",
    description: "Flashcard & latihan soal untuk belajar lebih efektif.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "Brainly Plus",
    category: "study",
    icon: "🧠",
    description: "Bantuan jawaban & pembahasan tugas sekolah.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "CamScanner Premium",
    category: "study",
    icon: "📄",
    description: "Scan dokumen & tugas jadi PDF tanpa watermark.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },

  /* ---------- APK LAINNYA ---------- */
  {
    name: "GetContact Premium",
    category: "lainnya",
    icon: "📞",
    description: "Cek identitas nomor tak dikenal & anti-spam.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "Wattpad Premium",
    category: "lainnya",
    icon: "📚",
    description: "Baca cerita tanpa iklan dan akses fitur premium.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "VPN Premium",
    category: "lainnya",
    icon: "🛡️",
    description: "Koneksi internet lebih aman dan stabil.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },

  /* ---------- TOP UP GAME ---------- */
  {
    name: "Mobile Legends",
    category: "topup",
    icon: "🎮",
    description: "Top up diamond ML, proses cepat & aman.",
    packages: [
      { label: "86 Diamond", price: "Rp XX.XXX" },
      { label: "172 Diamond", price: "Rp XX.XXX" },
      { label: "257 Diamond", price: "Rp XX.XXX" },
      { label: "Weekly Diamond Pass", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "Free Fire",
    category: "topup",
    icon: "🔥",
    description: "Top up diamond FF, langsung masuk ke akun.",
    packages: [
      { label: "70 Diamond", price: "Rp XX.XXX" },
      { label: "140 Diamond", price: "Rp XX.XXX" },
      { label: "355 Diamond", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "PUBG Mobile",
    category: "topup",
    icon: "🪖",
    description: "Top up UC PUBG Mobile resmi & terpercaya.",
    packages: [
      { label: "60 UC", price: "Rp XX.XXX" },
      { label: "325 UC", price: "Rp XX.XXX" },
      { label: "660 UC", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "Roblox",
    category: "topup",
    icon: "🧱",
    description: "Top up Robux untuk semua kebutuhan game Roblox-mu.",
    packages: [
      { label: "80 Robux", price: "Rp XX.XXX" },
      { label: "400 Robux", price: "Rp XX.XXX" },
      { label: "800 Robux", price: "Rp XX.XXX" },
    ],
  },
];

// Label yang ditampilkan untuk tiap kategori (dipakai di Pricelist)
const categoryLabels = {
  streaming: "📺 APK STREAMING",
  editing: "🎬 APK EDITING",
  listening: "🎵 APK LISTENING",
  study: "📚 APK STUDY",
  lainnya: "📦 APK LAINNYA",
  topup: "🎮 TOP UP GAME",
};

// Accent warna per kategori - dipakai untuk border kiri & glow di pricelist-card.
// Untuk category-card & product-card di masing-masing halaman, accent-nya
// ditentukan langsung lewat class "accent-*" di HTML (lihat index.html &
// <kategori>.html), jadi tidak perlu di-generate lewat JS.
const categoryAccents = {
  streaming: { accent: "var(--cyan)", glow: "rgba(var(--cyan-rgb), 0.32)" },
  editing: { accent: "var(--purple)", glow: "rgba(var(--purple-rgb), 0.32)" },
  listening: { accent: "var(--magenta)", glow: "rgba(var(--magenta-rgb), 0.32)" },
  study: { accent: "var(--electric-blue)", glow: "rgba(var(--electric-blue-rgb), 0.32)" },
  lainnya: { accent: "var(--gold)", glow: "rgba(var(--gold-rgb), 0.32)" },
  topup: { accent: "var(--cyan)", glow: "rgba(var(--cyan-rgb), 0.32)" },
};


/* ================= 3. HELPER: WHATSAPP LINK GENERATOR ================= */

/**
 * Membuat link wa.me lengkap dengan pesan otomatis yang sudah di-encode.
 * @param {string} message - isi pesan WhatsApp
 * @returns {string} URL wa.me
 */
function buildWhatsAppLink(message) {
  return `${CONFIG.whatsappLink}?text=${encodeURIComponent(message)}`;
}

/** Pesan order untuk keseluruhan produk (tanpa paket spesifik) */
function buildProductOrderMessage(productName) {
  return `Halo Terranova Store, saya ingin order ${productName}.`;
}

/** Pesan order untuk produk + paket tertentu */
function buildPackageOrderMessage(productName, packageLabel) {
  return `Halo Terranova Store, saya ingin order ${productName} paket ${packageLabel}.`;
}


/* ================= 4. RENDER: PRODUCT CARD & GRID ================= */

/**
 * Membuat satu elemen product card berdasarkan data produk.
 */
function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card reveal";

  // Baris tiap paket, setiap baris juga bisa langsung diklik untuk order paket tsb.
  const packageRows = product.packages
    .map((pkg) => {
      const link = buildWhatsAppLink(
        buildPackageOrderMessage(product.name, pkg.label)
      );
      return `
        <a class="package-row" href="${link}" target="_blank" rel="noopener" title="Order paket ${pkg.label}">
          <span class="package-label">${pkg.label}</span>
          <span class="package-price">${pkg.price}</span>
        </a>
      `;
    })
    .join("");

  const orderLink = buildWhatsAppLink(buildProductOrderMessage(product.name));

  // Badge opsional (mis. "Best Seller", "Promo") - hanya muncul kalau field
  // "badge" diisi di data produk. Kosong secara default, tidak ada yang
  // di-generate otomatis di sini.
  const badgeHtml = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : "";

  card.innerHTML = `
    ${badgeHtml}
    <span class="product-icon">${product.icon}</span>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-desc">${product.description}</p>
    <div class="package-list">${packageRows}</div>
    <a class="btn-order" href="${orderLink}" target="_blank" rel="noopener">
      ORDER ${product.name.toUpperCase()}
    </a>
  `;

  return card;
}

/**
 * Menampilkan seluruh produk ke grid yang sesuai kategorinya.
 * Setiap grid diidentifikasi lewat id="grid-<category>" di index.html.
 */
function renderProducts() {
  Object.keys(categoryLabels).forEach((category) => {
    const grid = document.getElementById(`grid-${category}`);
    if (!grid) return;

    const items = products.filter((p) => p.category === category);
    items.forEach((product) => {
      grid.appendChild(createProductCard(product));
    });
  });
}


/* ================= 5. RENDER: PRICELIST ================= */

/**
 * Menampilkan ringkasan harga per kategori di section Pricelist.
 */
function renderPricelist() {
  const container = document.getElementById("pricelistGrid");
  if (!container) return;

  Object.entries(categoryLabels).forEach(([category, label]) => {
    const items = products.filter((p) => p.category === category);
    if (items.length === 0) return;

    const rows = items
      .map((product) => {
        // Ambil harga termurah dari setiap produk untuk ringkasan pricelist
        const cheapest = product.packages[0];
        return `
          <div class="pricelist-item">
            <span class="pricelist-item-name">${product.name}</span>
            <span class="pricelist-item-price">${cheapest.price}</span>
          </div>
        `;
      })
      .join("");

    const accent = categoryAccents[category];
    const card = document.createElement("div");
    card.className = "pricelist-card reveal";
    if (accent) {
      card.style.setProperty("--accent", accent.accent);
      card.style.setProperty("--accent-glow", accent.glow);
    }
    card.innerHTML = `
      <div class="pricelist-card-title">${label}</div>
      ${rows}
    `;
    container.appendChild(card);
  });
}


/* ================= 6. SETUP: LINK WHATSAPP / INSTAGRAM / TIKTOK / GRUP ================= */

function setupContactLinks() {
  const waLink = buildWhatsAppLink(
    "Halo Terranova Store, saya ingin bertanya-tanya tentang produk."
  );

  // Kontak singkat (setelah hero, hanya ada di index.html)
  const quickWa = document.getElementById("quickWhatsapp");
  const quickIg = document.getElementById("quickInstagram");
  const quickTiktok = document.getElementById("quickTiktok");
  if (quickWa) quickWa.href = waLink;
  if (quickIg) quickIg.href = CONFIG.instagram;
  if (quickTiktok) quickTiktok.href = CONFIG.tiktok;

  // Link "Gabung Grup OLSHOP" di footer (ada di setiap halaman)
  const footerGroup = document.getElementById("footerGroup");
  if (footerGroup) footerGroup.href = CONFIG.group;

  // Icon social media di footer (ada di setiap halaman)
  const footerWa = document.getElementById("footerWhatsapp");
  const footerIg = document.getElementById("footerInstagram");
  const footerTiktok = document.getElementById("footerTiktok");
  if (footerWa) footerWa.href = waLink;
  if (footerIg) footerIg.href = CONFIG.instagram;
  if (footerTiktok) footerTiktok.href = CONFIG.tiktok;
}


/* ================= 7. HAMBURGER MENU & SIDEBAR ================= */

function setupSidebar() {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const sidebar = document.getElementById("sidebar");
  const sidebarClose = document.getElementById("sidebarClose");
  const overlay = document.getElementById("overlay");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  function openSidebar() {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    hamburgerBtn.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    document.body.style.overflow = "";
  }

  hamburgerBtn.addEventListener("click", () => {
    const isActive = sidebar.classList.contains("active");
    isActive ? closeSidebar() : openSidebar();
  });

  sidebarClose.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Tutup sidebar otomatis saat salah satu menu diklik
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", closeSidebar);
  });

  // Tutup sidebar jika layar di-resize ke ukuran desktop/tablet landscape
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) closeSidebar();
  });
}


/* ================= 8. SMOOTH SCROLL (OFFSET NAVBAR) ================= */

function setupSmoothScroll() {
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId.length <= 1) return; // abaikan href="#"

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 1;

      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}


/* ================= 9. ANIMASI SCROLL REVEAL ================= */

function setupScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || revealEls.length === 0) {
    revealEls.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

/* Tandai card kategori & kontak singkat sebagai elemen "reveal" juga */
function markStaticRevealElements() {
  document
    .querySelectorAll(".category-card, .quick-card")
    .forEach((el) => el.classList.add("reveal"));
}


/* ================= 10. GALAXY BACKGROUND ================= */

/**
 * Membuat string box-shadow berisi banyak "titik bintang" dengan posisi acak.
 * Ini dijalankan SEKALI saat halaman dimuat (bukan animasi per-frame),
 * jadi tetap ringan walau jumlah titiknya banyak.
 */
function generateStarShadow(count, spreadX, spreadY, colorFn) {
  const shadows = [];
  for (let i = 0; i < count; i++) {
    const x = Math.round(Math.random() * spreadX);
    const y = Math.round(Math.random() * spreadY);
    shadows.push(`${x}px ${y}px ${colorFn()}`);
  }
  return shadows.join(", ");
}

/**
 * Menyuntikkan elemen dekoratif galaxy (nebula, 2 lapis bintang, meteor)
 * ke seluruh halaman. Dipanggil sekali per halaman agar konsisten tanpa
 * perlu menulis ulang markup-nya di 8 file HTML.
 *
 * Otomatis lebih hemat di HP/layar kecil ATAU di perangkat dengan CPU
 * terbatas (dideteksi lewat navigator.hardwareConcurrency), dan mematikan
 * meteor jika pengguna mengaktifkan "reduce motion" di perangkatnya.
 */
function createGalaxyBackground() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isSmallScreen = window.innerWidth < 640;
  // hardwareConcurrency = perkiraan jumlah core CPU. Tidak 100% akurat di
  // semua browser, tapi cukup sebagai sinyal kasar "perangkat terbatas".
  const isLowPowerDevice =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  const reduceParticles = isSmallScreen || isLowPowerDevice;

  const spreadX = Math.max(window.innerWidth, 1200);
  const tileSmall = 2000; // tinggi "ubin" pola bintang lapisan kecil (px)
  const tileMedium = 1400; // tinggi ubin lapisan bintang yang lebih besar/terang

  const smallCount = reduceParticles ? 70 : 130;
  const mediumCount = reduceParticles ? 30 : 55;

  const smallStars = generateStarShadow(
    smallCount,
    spreadX,
    tileSmall,
    () => `rgba(255,255,255,${(0.35 + Math.random() * 0.35).toFixed(2)})`
  );
  const mediumStars = generateStarShadow(
    mediumCount,
    spreadX,
    tileMedium,
    () => `rgba(255,255,255,${(0.6 + Math.random() * 0.4).toFixed(2)}) 0 0 1px`
  );

  const bg = document.createElement("div");
  bg.className = "galaxy-bg";
  bg.setAttribute("aria-hidden", "true");
  bg.innerHTML = `
    <div class="galaxy-nebula n1"></div>
    <div class="galaxy-nebula n2"></div>
    <div class="galaxy-nebula n3"></div>
    <div class="star-layer" style="--star-shadow:${smallStars}; --star-tile:${tileSmall}px; animation-duration:170s;"></div>
    <div class="star-layer" style="--star-shadow:${mediumStars}; --star-tile:${tileMedium}px; animation-duration:110s;"></div>
    ${prefersReducedMotion ? "" : `<div class="meteor m1"></div><div class="meteor m2"></div>`}
    ${prefersReducedMotion || reduceParticles ? "" : `<div class="meteor m3"></div><div class="meteor m4"></div>`}
  `;

  document.body.prepend(bg);
}


/* ================= 11. INTRO / OPENING ANIMATION ================= */
/* Hanya berjalan kalau elemen #introScreen ada di halaman (yaitu index.html
   saja - lihat pola guard "if (!el) return" yang sama dipakai di fungsi lain
   seperti renderProducts/renderPricelist). Muncul sekali per sesi browser
   (ditandai lewat sessionStorage), bisa di-skip kapan saja, dan otomatis
   dilewati total kalau pengguna mengaktifkan "reduce motion" di sistemnya. */

const INTRO_HOLD_MS = 2800; // lama tampil penuh sebelum mulai fade out
const INTRO_FADE_MS = 600; // durasi fade out - HARUS sama dengan transition di CSS (.intro)

function initIntro() {
  const intro = document.getElementById("introScreen");
  if (!intro) return; // bukan index.html, tidak ada yang perlu dikerjakan

  // Guard anti-flash di <head> sudah menandai <html> kalau intro pernah
  // muncul di sesi ini - tinggal buang elemennya, tanpa animasi apa pun.
  if (document.documentElement.classList.contains("intro-skip-init")) {
    intro.remove();
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Hormati preferensi sistem: langsung ke homepage, tanpa animasi.
    sessionStorage.setItem("terranovaIntroShown", "1");
    intro.remove();
    return;
  }

  // Tandai sekarang juga (bukan nanti setelah animasi selesai) supaya kalau
  // pengguna refresh di tengah intro, intro tidak terulang lagi di sesi ini.
  sessionStorage.setItem("terranovaIntroShown", "1");
  document.body.style.overflow = "hidden";

  // Background galaxy khusus intro - pakai ulang class .galaxy-nebula &
  // .star-layer yang sama dengan background utama, cuma jumlah bintangnya
  // lebih sedikit karena intro cuma tampil sebentar.
  const introBg = document.getElementById("introBg");
  if (introBg) {
    const introStars = generateStarShadow(
      60,
      window.innerWidth,
      window.innerHeight,
      () => `rgba(255,255,255,${(0.4 + Math.random() * 0.4).toFixed(2)})`
    );
    introBg.innerHTML = `
      <div class="galaxy-nebula n1"></div>
      <div class="galaxy-nebula n2"></div>
      <div class="star-layer" style="--star-shadow:${introStars}; --star-tile:${window.innerHeight}px; animation-duration:40s;"></div>
    `;
  }

  let introEnded = false;
  function endIntro() {
    if (introEnded) return; // cegah endIntro terpanggil dua kali (skip + timeout barengan)
    introEnded = true;
    intro.classList.add("intro-out");
    document.body.style.overflow = "";
    setTimeout(() => intro.remove(), INTRO_FADE_MS);
  }

  const skipBtn = document.getElementById("introSkip");
  if (skipBtn) skipBtn.addEventListener("click", endIntro);

  setTimeout(endIntro, INTRO_HOLD_MS);
}


/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  createGalaxyBackground();
  renderProducts();
  renderPricelist();
  setupContactLinks();
  setupSidebar();
  setupSmoothScroll();
  markStaticRevealElements();
  setupScrollReveal();
});
