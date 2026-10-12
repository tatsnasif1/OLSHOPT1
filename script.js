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


/* ================= 2. DATA PRODUK & LOGO ASLI RESMI ================= */

/**
 * Daftar path ikon aplikasi asli/resmi (official high-res store icon).
 * Disimpan secara lokal dalam format WebP yang tajam, ringan, dan cepat.
 */
const APP_ICONS = {
  "Netflix Premium": "assets/images/apps/netflix.webp",
  "Vidio Platinum": "assets/images/apps/vidio.webp",
  "VIU Premium": "assets/images/apps/viu.webp",
  "YouTube Premium": "assets/images/apps/youtube.webp",
  "Canva Pro": "assets/images/apps/canva.webp",
  "CapCut Pro": "assets/images/apps/capcut.webp",
  "FaceApp Pro": "assets/images/apps/faceapp.webp",
  "PicsArt Premium": "assets/images/apps/picsart.webp",
  "Adobe Lightroom Premium": "assets/images/apps/lightroom.webp",
  "VSCO Membership": "assets/images/apps/vsco.webp",
  "Remini Premium": "assets/images/apps/remini.webp",
  "VN Editor Pro": "assets/images/apps/vn.webp",
  "Spotify Premium": "assets/images/apps/spotify.webp",
  "Apple Music": "assets/images/apps/apple-music.webp",
  "Quizlet Plus": "assets/images/apps/quizlet.webp",
  "Brainly Plus": "assets/images/apps/brainly.webp",
  "CamScanner Premium": "assets/images/apps/camscanner.webp",
  "GetContact Premium": "assets/images/apps/getcontact.webp",
  "Wattpad Premium": "assets/images/apps/wattpad.webp",
  "VPN Premium": "assets/images/apps/vpn.webp",
  "Mobile Legends": "assets/images/apps/mobile-legends.webp",
  "Free Fire": "assets/images/apps/free-fire.webp",
  "PUBG Mobile": "assets/images/apps/pubg-mobile.webp",
  "Roblox": "assets/images/apps/roblox.webp",
};

function getAppLogo(name, iconUrl) {
  if (iconUrl) {
    return `<img src="${iconUrl}" alt="Logo Asli ${name}" class="app-official-icon" loading="lazy" onerror="this.src='assets/images/apps/netflix.webp'" />`;
  }
  const iconSrc = APP_ICONS[name];
  if (iconSrc) {
    return `<img src="${iconSrc}" alt="Logo Asli ${name}" class="app-official-icon" loading="lazy" />`;
  }
  return `<span class="ui-emoji">📦</span>`;
}

let products = [

  /* ---------- APK STREAMING ---------- */
  {
    name: "Netflix Premium",
    category: "streaming",
    icon: getAppLogo("Netflix Premium"),
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
    icon: getAppLogo("Vidio Platinum"),
    description: "Streaming film, series, dan siaran olahraga lokal.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "VIU Premium",
    category: "streaming",
    icon: getAppLogo("VIU Premium"),
    description: "Drama Asia dan tayangan eksklusif tanpa iklan.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "YouTube Premium",
    category: "streaming",
    icon: getAppLogo("YouTube Premium"),
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
    icon: getAppLogo("Canva Pro"),
    description: "Desain grafis, konten sosial media, dan presentasi.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "1 Tahun", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "CapCut Pro",
    category: "editing",
    icon: getAppLogo("CapCut Pro"),
    description: "Edit video dengan efek premium dan tanpa watermark.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "3 Bulan", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "FaceApp Pro",
    category: "editing",
    icon: getAppLogo("FaceApp Pro"),
    description: "Filter wajah & efek AI premium.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "PicsArt Premium",
    category: "editing",
    icon: getAppLogo("PicsArt Premium"),
    description: "Edit foto lengkap dengan stiker & tools premium.",
    packages: [
      { label: "1 Bulan", price: "Rp XX.XXX" },
      { label: "1 Tahun", price: "Rp XX.XXX" },
    ],
  },
  {
    name: "Adobe Lightroom Premium",
    category: "editing",
    icon: getAppLogo("Adobe Lightroom Premium"),
    description: "Preset & tools editing warna profesional.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "VSCO Membership",
    category: "editing",
    icon: getAppLogo("VSCO Membership"),
    description: "Filter estetik dan tools editing foto premium.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "Remini Premium",
    category: "editing",
    icon: getAppLogo("Remini Premium"),
    description: "Perbaiki & tingkatkan kualitas foto lama/blur.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "VN Editor Pro",
    category: "editing",
    icon: getAppLogo("VN Editor Pro"),
    description: "Aplikasi edit video ringan dengan fitur pro.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },

  /* ---------- APK LISTENING ---------- */
  {
    name: "Spotify Premium",
    category: "listening",
    icon: getAppLogo("Spotify Premium"),
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
    icon: getAppLogo("Apple Music"),
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
    icon: getAppLogo("Quizlet Plus"),
    description: "Flashcard & latihan soal untuk belajar lebih efektif.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "Brainly Plus",
    category: "study",
    icon: getAppLogo("Brainly Plus"),
    description: "Bantuan jawaban & pembahasan tugas sekolah.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "CamScanner Premium",
    category: "study",
    icon: getAppLogo("CamScanner Premium"),
    description: "Scan dokumen & tugas jadi PDF tanpa watermark.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },

  /* ---------- APK LAINNYA ---------- */
  {
    name: "GetContact Premium",
    category: "lainnya",
    icon: getAppLogo("GetContact Premium"),
    description: "Cek identitas nomor tak dikenal & anti-spam.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "Wattpad Premium",
    category: "lainnya",
    icon: getAppLogo("Wattpad Premium"),
    description: "Baca cerita tanpa iklan dan akses fitur premium.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },
  {
    name: "VPN Premium",
    category: "lainnya",
    icon: getAppLogo("VPN Premium"),
    description: "Koneksi internet lebih aman dan stabil.",
    packages: [{ label: "1 Bulan", price: "Rp XX.XXX" }],
  },

  /* ---------- TOP UP GAME ---------- */
  {
    name: "Mobile Legends",
    category: "topup",
    icon: getAppLogo("Mobile Legends"),
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
    icon: getAppLogo("Free Fire"),
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
    icon: getAppLogo("PUBG Mobile"),
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
    icon: getAppLogo("Roblox"),
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
  streaming: { accent: "var(--crimson-red)", glow: "rgba(var(--crimson-red-rgb), 0.35)" },
  editing: { accent: "var(--purple)", glow: "rgba(var(--purple-rgb), 0.32)" },
  listening: { accent: "var(--magenta)", glow: "rgba(var(--magenta-rgb), 0.32)" },
  study: { accent: "var(--electric-blue)", glow: "rgba(var(--electric-blue-rgb), 0.32)" },
  lainnya: { accent: "var(--gold)", glow: "rgba(var(--gold-rgb), 0.32)" },
  topup: { accent: "var(--cyber-green)", glow: "rgba(var(--cyber-green-rgb), 0.35)" },
};


/* ================= 3. HELPER: WHATSAPP LINK GENERATOR ================= */

/**
 * Format & deteksi harga nominal secara otomatis.
 * Mendeteksi apakah harga masih placeholder (XXX / Rp XX.XXX) atau sudah memiliki nominal riil.
 */
function parsePriceInfo(priceStr) {
  if (!priceStr) {
    return { hasRealPrice: false, display: "Rp XX.XXX", nominalOnly: "" };
  }
  const clean = String(priceStr).trim();
  // Cek apakah masih berupa placeholder (XXX, Rp XX.XXX, xx, dsb.)
  const isPlaceholder = /x{2,}/i.test(clean) || /^\?+$/.test(clean);
  if (isPlaceholder) {
    return { hasRealPrice: false, display: clean, nominalOnly: "" };
  }

  // Jika input berupa angka murni seperti "25000", otomatis format jadi "Rp 25.000"
  if (/^\d+$/.test(clean)) {
    const formatted = "Rp " + Number(clean).toLocaleString("id-ID");
    return { hasRealPrice: true, display: formatted, nominalOnly: formatted };
  }

  return { hasRealPrice: true, display: clean, nominalOnly: clean };
}

/**
 * Membuat link wa.me lengkap dengan pesan otomatis yang sudah di-encode.
 * @param {string} message - isi pesan WhatsApp
 * @returns {string} URL wa.me
 */
function buildWhatsAppLink(message) {
  return `${CONFIG.whatsappLink}?text=${encodeURIComponent(message)}`;
}

/** Pesan order untuk keseluruhan produk (tanpa paket spesifik) */
function buildProductOrderMessage(productName, price = "") {
  const pInfo = parsePriceInfo(price);
  if (pInfo.hasRealPrice) {
    return `Halo Kak Admin Terranova Store! Mau order ${productName} seharga ${pInfo.nominalOnly} nih kak. Ditunggu kak, terima kasih!`;
  }
  return `Halo Kak Admin Terranova Store! Mau order ${productName} nih kak, ready kah? Ditunggu kak, terima kasih!`;
}

/** Pesan order untuk produk + paket tertentu */
function buildPackageOrderMessage(productName, packageLabel, price = "") {
  const pInfo = parsePriceInfo(price);
  if (pInfo.hasRealPrice) {
    return `Halo Kak Admin Terranova Store! Mau order ${productName} paket ${packageLabel} seharga ${pInfo.nominalOnly} nih kak. Ditunggu kak, terima kasih!`;
  }
  return `Halo Kak Admin Terranova Store! Mau order ${productName} paket ${packageLabel} nih kak, ready kah? Ditunggu kak, terima kasih!`;
}


/* ================= 4. RENDER: PRODUCT CARD & GRID ================= */

/**
 * Membuat satu elemen product card berdasarkan data produk.
 */
function createProductCard(product, showCategoryTag = false) {
  const card = document.createElement("article");
  const accentClass = {
    streaming: "accent-cyan",
    editing: "accent-purple",
    listening: "accent-magenta",
    study: "accent-blue",
    lainnya: "accent-gold",
    topup: "accent-cyan",
  }[product.category] || "accent-cyan";

  card.className = `product-card reveal in-view ${accentClass}`;

  const hasPkg = (product.hasPackages === true || (Array.isArray(product.packages) && product.packages.length > 0 && product.packages.some(pkg => pkg.label && pkg.label.trim())));

  let packageOrPriceHtml = "";
  if (hasPkg && Array.isArray(product.packages) && product.packages.length > 0) {
    const packageRows = product.packages
      .map((pkg, idx) => {
        return `
          <button type="button" class="package-row" data-pkg-index="${idx}" title="Order paket ${pkg.label}">
            <span class="package-label">${pkg.label}</span>
            <span class="package-price">${pkg.price}</span>
          </button>
        `;
      })
      .join("");
    packageOrPriceHtml = `<div class="package-list">${packageRows}</div>`;
  } else {
    const rawPrice = product.price || (product.packages && product.packages[0] ? product.packages[0].price : "Rp XX.XXX");
    const pInfo = parsePriceInfo(rawPrice);
    packageOrPriceHtml = `
      <div class="product-single-price-box">
        <span class="single-price-label">Harga</span>
        <span class="single-price-val">${pInfo.display}</span>
      </div>
    `;
  }

  const badgeHtml = product.badge
    ? `<span class="product-badge">${product.badge}</span>`
    : "";

  const categoryTagHtml = showCategoryTag
    ? `<span class="product-category-tag">${categoryLabels[product.category] || product.category}</span>`
    : "";

  const iconHtml = product.icon || getAppLogo(product.name, product.iconUrl);

  card.innerHTML = `
    ${badgeHtml}
    ${categoryTagHtml}
    <span class="product-icon">${iconHtml}</span>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-desc">${product.description}</p>
    ${packageOrPriceHtml}
    <button type="button" class="btn-order">
      ORDER ${product.name.toUpperCase()}
    </button>
  `;

  // Klik tombol Order -> buka modal dengan paket default (index 0)
  const orderBtn = card.querySelector(".btn-order");
  if (orderBtn) {
    orderBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openOrderModal(product, 0);
    });
  }

  // Klik baris paket -> buka modal dengan paket tsb langsung terpilih
  card.querySelectorAll(".package-row").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.getAttribute("data-pkg-index") || "0", 10);
      openOrderModal(product, idx);
    });
  });

  // Klik pada area kartu produk -> buka modal
  card.addEventListener("click", (e) => {
    if (e.target.closest("button, a, input")) return;
    openOrderModal(product, 0);
  });

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
    grid.innerHTML = ""; // Bersihkan dulu agar tidak terduplikasi saat re-render

    const items = products.filter((p) => p.category === category && p.active !== false);
    items.forEach((product) => {
      grid.appendChild(createProductCard(product));
    });
  });
}


/* ================= 4b. REAL-TIME FILTER / SEARCH WITH SKELETON LOADER ================= */

/**
 * Membuat kartu placeholder skeleton saat pencarian berlangsung.
 */
function createSkeletonCard() {
  const card = document.createElement("article");
  card.className = "product-card skeleton-card";
  card.setAttribute("aria-hidden", "true");
  card.innerHTML = `
    <div class="skeleton-shimmer"></div>
    <div class="skeleton-line skeleton-tag"></div>
    <div class="skeleton-circle"></div>
    <div class="skeleton-line skeleton-title"></div>
    <div class="skeleton-line skeleton-desc"></div>
    <div class="skeleton-line skeleton-desc-short"></div>
    <div class="skeleton-packages">
      <div class="skeleton-line skeleton-pkg"></div>
      <div class="skeleton-line skeleton-pkg"></div>
    </div>
    <div class="skeleton-line skeleton-btn"></div>
  `;
  return card;
}

function renderSkeletons(grid, count = 3) {
  grid.innerHTML = "";
  grid.style.display = "grid";
  for (let i = 0; i < count; i++) {
    grid.appendChild(createSkeletonCard());
  }
}

function initRealtimeSearch() {
  const searchInput = document.getElementById("productSearchInput");
  const clearBtn = document.getElementById("searchClearBtn");
  const filterPills = document.querySelectorAll(".filter-pill");
  const liveResults = document.getElementById("liveSearchResults");
  const defaultCategoryView = document.getElementById("defaultCategoryView");
  const resultsGrid = document.getElementById("searchProductGrid");
  const resultsCount = document.getElementById("searchResultsCount");
  const resultsTitle = document.getElementById("searchResultsTitle");
  const emptyState = document.getElementById("searchEmptyState");
  const emptyDesc = document.getElementById("searchEmptyDesc");
  const requestBtn = document.getElementById("searchRequestBtn");

  if (!searchInput || !liveResults || !defaultCategoryView || !resultsGrid) {
    return;
  }

  let activeCategory = "all";
  let debounceTimer = null;
  let currentSearchToken = 0;

  function executeFilter(query, rawQuery) {
    const filtered = products.filter((item) => {
      // Category match
      if (activeCategory !== "all" && item.category !== activeCategory) {
        return false;
      }

      // Keyword match
      if (query === "") return true;

      const nameMatch = item.name.toLowerCase().includes(query);
      const descMatch = item.description.toLowerCase().includes(query);
      const catLabel = (categoryLabels[item.category] || "").toLowerCase();
      const catMatch = catLabel.includes(query);
      const packageMatch = item.packages.some((pkg) =>
        pkg.label.toLowerCase().includes(query)
      );

      return nameMatch || descMatch || catMatch || packageMatch;
    });

    // Update Header Count & Title
    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} produk ditemukan`;
    }

    if (resultsTitle) {
      if (query && activeCategory !== "all") {
        resultsTitle.textContent = `Pencarian "${rawQuery.trim()}" di ${categoryLabels[activeCategory] || activeCategory}`;
      } else if (query) {
        resultsTitle.textContent = `Hasil Pencarian: "${rawQuery.trim()}"`;
      } else {
        resultsTitle.textContent = `Katalog: ${categoryLabels[activeCategory] || activeCategory}`;
      }
    }

    // Render cards or empty state
    resultsGrid.innerHTML = "";
    if (filtered.length === 0) {
      if (emptyState) emptyState.style.display = "block";
      resultsGrid.style.display = "none";
      if (emptyDesc) {
        emptyDesc.textContent = query
          ? `Tidak ada aplikasi atau game yang cocok dengan "${rawQuery.trim()}". Mau pesan atau request khusus?`
          : `Belum ada produk di kategori ini.`;
      }
      if (requestBtn) {
        requestBtn.href = buildWhatsAppLink(
          `Halo Kak Admin Terranova Store! Mau tanya untuk produk ${rawQuery.trim() || activeCategory} ready kah? Mau order nih kak, terima kasih!`
        );
      }
    } else {
      if (emptyState) emptyState.style.display = "none";
      resultsGrid.style.display = "grid";
      filtered.forEach((product) => {
        resultsGrid.appendChild(createProductCard(product, true));
      });
    }
  }

  function triggerSearch(immediate = false) {
    const rawQuery = searchInput.value;
    const query = rawQuery.trim().toLowerCase();

    // Show or hide clear button
    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? "flex" : "none";
    }

    // If query is empty and category is 'all', restore default category cards
    if (query === "" && activeCategory === "all") {
      if (debounceTimer) clearTimeout(debounceTimer);
      liveResults.style.display = "none";
      defaultCategoryView.style.display = "block";
      resultsGrid.innerHTML = "";
      return;
    }

    // Switch view to live search results
    defaultCategoryView.style.display = "none";
    liveResults.style.display = "block";

    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const searchToken = ++currentSearchToken;

    if (immediate) {
      executeFilter(query, rawQuery);
    } else {
      // Display skeleton cards with shimmer wave while query is processing
      if (emptyState) emptyState.style.display = "none";
      if (resultsCount) resultsCount.textContent = "Mencari...";
      renderSkeletons(resultsGrid, 3);

      debounceTimer = setTimeout(() => {
        if (searchToken === currentSearchToken) {
          executeFilter(query, rawQuery);
        }
      }, 180);
    }
  }

  // Real-time input listener with debounced skeleton
  searchInput.addEventListener("input", () => triggerSearch(false));

  // Clear button click listener
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      searchInput.value = "";
      searchInput.focus();
      triggerSearch(true);
    });
  }

  // Quick category pills listener
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCategory = pill.getAttribute("data-category") || "all";
      triggerSearch(false);
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
  container.innerHTML = ""; // Bersihkan dulu untuk support re-render dinamis

  Object.entries(categoryLabels).forEach(([category, label]) => {
    const items = products.filter((p) => p.category === category && p.active !== false);
    if (items.length === 0) return;

    const rows = items
      .map((product) => {
        const hasPkg = (product.hasPackages === true || (Array.isArray(product.packages) && product.packages.length > 0 && product.packages.some(pkg => pkg.label && pkg.label.trim())));
        const rawPrice = hasPkg && Array.isArray(product.packages) && product.packages[0]
          ? product.packages[0].price
          : (product.price || (product.packages && product.packages[0] ? product.packages[0].price : "Rp XX.XXX"));
        const pInfo = parsePriceInfo(rawPrice);
        return `
          <div class="pricelist-item pricelist-clickable" data-product-name="${product.name}" tabindex="0" role="button" title="Pesan ${product.name}">
            <span class="pricelist-item-name">${product.name}</span>
            <span class="pricelist-item-price">${pInfo.display} <span class="pricelist-arrow">→</span></span>
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

  // Delegasi event listener untuk item pricelist agar langsung membuka modal order
  container.addEventListener("click", (e) => {
    const item = e.target.closest(".pricelist-clickable");
    if (!item) return;
    const pName = item.getAttribute("data-product-name");
    const foundProduct = products.find((p) => p.name === pName);
    if (foundProduct) {
      openOrderModal(foundProduct, 0);
    }
  });

  // Dukungan tombol Enter / Spasi untuk aksesibilitas keyboard
  container.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const item = e.target.closest(".pricelist-clickable");
      if (!item) return;
      e.preventDefault();
      const pName = item.getAttribute("data-product-name");
      const foundProduct = products.find((p) => p.name === pName);
      if (foundProduct) {
        openOrderModal(foundProduct, 0);
      }
    }
  });
}


/* ================= 6. SETUP: LINK WHATSAPP / INSTAGRAM / TIKTOK / GRUP ================= */

function setupContactLinks() {
  const waLink = buildWhatsAppLink(
    "Halo Kak Admin Terranova Store! Mau tanya-tanya produk dan pricelist terbarunya ya kak, terima kasih!"
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

  // Tombol Escape keyboard untuk menutup sidebar di PC / Laptop
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("active")) {
      closeSidebar();
    }
  });
}


/* ================= 8. SMOOTH SCROLL (OFFSET NAVBAR & INTERNAL NAVIGATION) ================= */

function setupSmoothScroll() {
  const getNavbarOffset = () => {
    const navbar = document.getElementById("navbar");
    return (navbar ? navbar.offsetHeight : 76) + 16;
  };

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scrollToTarget = (target, updateHash = true) => {
    if (!target) return;
    const offset = getNavbarOffset();
    const targetTop =
      target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });

    if (updateHash && target.id) {
      try {
        history.pushState(null, "", `#${target.id}`);
      } catch (err) {}
    }
  };

  // Tangani semua navigasi internal:
  // 1. Link anchor standar: href="#section"
  // 2. Link internal dengan nama file yang sama: href="index.html#section" saat di index.html
  const currentPath = window.location.pathname.toLowerCase();
  const currentFile =
    currentPath.substring(currentPath.lastIndexOf("/") + 1) || "index.html";

  document.querySelectorAll("a[href]").forEach((link) => {
    const rawHref = link.getAttribute("href");
    if (!rawHref || rawHref === "#" || rawHref.startsWith("javascript:")) return;

    let targetSelector = "";
    if (rawHref.startsWith("#")) {
      targetSelector = rawHref;
    } else {
      try {
        const url = new URL(link.href, window.location.href);
        if (url.origin === window.location.origin && url.hash) {
          const urlFile =
            url.pathname.substring(url.pathname.lastIndexOf("/") + 1) || "index.html";
          if (
            urlFile === currentFile ||
            (currentFile === "index.html" && (urlFile === "" || urlFile === "index.html"))
          ) {
            targetSelector = url.hash;
          }
        }
      } catch (e) {}
    }

    if (targetSelector && targetSelector.length > 1) {
      link.addEventListener("click", (e) => {
        const target = document.querySelector(targetSelector);
        if (target) {
          e.preventDefault();
          scrollToTarget(target, true);
        }
      });
    }
  });

  // Dukungan scroll halus saat halaman dibuka langsung dengan anchor hash di URL
  if (window.location.hash) {
    const hashTarget = document.querySelector(window.location.hash);
    if (hashTarget) {
      setTimeout(() => {
        scrollToTarget(hashTarget, false);
      }, 350);
    }
  }
}


/* ================= 9. ANIMASI SCROLL REVEAL & CATEGORY STAGGER ================= */

function setupScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // 1. Tangani category-cards dengan IntersectionObserver khusus cascade / staggered fade-in
  const categoryCards = document.querySelectorAll(".category-card");
  if (categoryCards.length > 0) {
    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      categoryCards.forEach((card) => {
        card.classList.add("reveal", "in-view");
      });
    } else {
      const categoryObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const card = entry.target;
              const index = Array.from(categoryCards).indexOf(card);
              const delay = Math.max(0, index) * 75; // 75ms cascade stagger per card

              card.style.transitionDelay = `${delay}ms`;
              card.classList.add("in-view");
              categoryObserver.unobserve(card);

              // Bersihkan transitionDelay setelah animasi selesai agar respon hover tetap instan!
              setTimeout(() => {
                card.style.transitionDelay = "";
              }, delay + 680);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );

      categoryCards.forEach((card) => {
        card.classList.add("reveal", "category-reveal");
        categoryObserver.observe(card);
      });
    }
  }

  // 2. Tangani elemen reveal lainnya (quick-card, dll.)
  const revealEls = document.querySelectorAll(".reveal:not(.category-reveal)");
  if (!("IntersectionObserver" in window) || revealEls.length === 0 || prefersReducedMotion) {
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

/* Tandai kontak singkat sebagai elemen "reveal" juga */
function markStaticRevealElements() {
  document
    .querySelectorAll(".quick-card")
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
  const isMobile = window.innerWidth <= 768;
  const isLowPowerDevice =
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4;
  const reduceParticles = isMobile || isLowPowerDevice || prefersReducedMotion;

  const bg = document.createElement("div");
  bg.className = "galaxy-bg";
  bg.setAttribute("aria-hidden", "true");

  if (isMobile) {
    // Pada mobile: gunakan background kosmik statis & ultra-ringan tanpa animasi box-shadow berat
    bg.innerHTML = `
      <div class="galaxy-nebula n1" style="animation:none; filter:blur(40px); opacity:0.35;"></div>
      <div class="galaxy-nebula n2" style="animation:none; filter:blur(40px); opacity:0.25;"></div>
    `;
    document.body.prepend(bg);
    return;
  }

  const spreadX = Math.max(window.innerWidth, 1200);
  const tileSmall = 2000;
  const tileMedium = 1400;

  const smallCount = reduceParticles ? 40 : 120;
  const mediumCount = reduceParticles ? 20 : 50;

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
/* Berjalan setiap kali halaman utama (index.html) dimuat atau di-reload.
   Dilengkapi tombol Lewati (Skip) dan tombol keyboard Escape untuk kenyamanan pengguna,
   serta tetap menghormati preferensi "reduce motion" sistem. */

const INTRO_HOLD_MS = 6600; // durasi penuh sinematik roket + ketik huruf
const INTRO_FADE_MS = 750; // durasi fade out transisi ke homepage

function initIntro() {
  const intro = document.getElementById("introScreen");
  if (!intro) {
    // Di halaman kategori produk, pasang listener agar user yang klik Beranda tidak dipaksa melihat intro
    document.querySelectorAll('a[href="index.html"], a[href="./index.html"]').forEach((link) => {
      link.addEventListener("click", () => {
        try {
          sessionStorage.setItem("terranova_navigated_back", "true");
        } catch (_) {}
      });
    });
    return;
  }

  // Bersihkan sisa flag lama saat halaman dimuat/direload
  try {
    sessionStorage.removeItem("terranova_intro_seen");
  } catch (_) {}

  // Cek apakah user baru saja kembali dari sub-halaman produk
  let isNavigatedBack = false;
  try {
    isNavigatedBack = sessionStorage.getItem("terranova_navigated_back") === "true";
    sessionStorage.removeItem("terranova_navigated_back");
  } catch (_) {}

  // Jika kembali dari sub-halaman, skip intro agar user dapat langsung browsing
  if (isNavigatedBack || document.documentElement.classList.contains("intro-skip-init")) {
    document.documentElement.classList.remove("intro-skip-init");
    intro.remove();
    document.body.style.overflow = "";
    return;
  }

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.remove("intro-skip-init");
    intro.remove();
    document.body.style.overflow = "";
    return;
  }

  // Kunci scroll halaman selama intro berlangsung
  document.body.style.overflow = "hidden";

  // Background galaxy & kosmik luar angkasa khusus intro
  const isMobileScreen = window.innerWidth <= 768;
  const introBg = document.getElementById("introBg");
  if (introBg && !isMobileScreen) {
    const introStars = generateStarShadow(
      90,
      window.innerWidth,
      window.innerHeight,
      () => `rgba(255,255,255,${(0.4 + Math.random() * 0.4).toFixed(2)})`
    );
    introBg.innerHTML = `
      <div class="galaxy-nebula n1"></div>
      <div class="galaxy-nebula n2"></div>
      <div class="star-layer" style="--star-shadow:${introStars}; --star-tile:${window.innerHeight}px; animation-duration:35s;"></div>
    `;
  }

  const introCosmos = document.getElementById("introCosmos");
  if (introCosmos && !isMobileScreen) {
    const cosmosStars = generateStarShadow(
      70,
      window.innerWidth,
      window.innerHeight,
      () => `rgba(34,211,238,${(0.5 + Math.random() * 0.45).toFixed(2)}) 0 0 1px`
    );
    introCosmos.innerHTML = `
      <div class="star-layer" style="--star-shadow:${cosmosStars}; --star-tile:${window.innerHeight}px; animation-duration:25s;"></div>
      <div class="meteor m1"></div>
      <div class="meteor m2"></div>
    `;
  }

  let introEnded = false;
  function endIntro() {
    if (introEnded) return; // cegah endIntro terpanggil dua kali (skip + timeout barengan)
    introEnded = true;

    // Hentikan video intro seketika agar tidak membebani decoder GPU di HP
    const introVideo = intro.querySelector("video");
    if (introVideo) {
      try {
        introVideo.pause();
        introVideo.removeAttribute("src");
        introVideo.load();
      } catch (_) {}
    }

    window.removeEventListener("keydown", onIntroKeyDown);
    intro.classList.add("intro-out");
    document.body.style.overflow = "";

    // Sinkronkan dan putar hero video dari detik 0 saat homepage mulai terlihat
    const heroVideo = document.querySelector("video.hero-logo-media");
    if (heroVideo) {
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => {});
    }

    setTimeout(() => intro.remove(), INTRO_FADE_MS);
  }

  function onIntroKeyDown(e) {
    if (e.key === "Escape") {
      endIntro();
    }
  }

  window.addEventListener("keydown", onIntroKeyDown);

  const skipBtn = document.getElementById("introSkip");
  if (skipBtn) skipBtn.addEventListener("click", endIntro);

  setTimeout(endIntro, INTRO_HOLD_MS);
}


/* ================= 12. ACTIVE NAV HIGHLIGHT ================= */

function highlightActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  let currentFile = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  if (!currentFile || currentFile === "/") currentFile = "index.html";
  if (!currentFile.endsWith(".html") && !currentFile.includes(".")) {
    currentFile += ".html";
  }

  const allNavLinks = document.querySelectorAll(".nav-menu a, .sidebar-nav a");
  allNavLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;
    const cleanHref = href.split("#")[0].toLowerCase();

    if (!cleanHref && href.startsWith("#")) return;

    if (cleanHref === currentFile || (currentFile === "index.html" && (cleanHref === "" || cleanHref === "index.html"))) {
      if (href.includes("#quick-contact") && !window.location.hash.includes("quick-contact")) {
        return;
      }
      link.classList.add("active");
    }
  });
}


/* ================= 12b. FLOATING BACK TO TOP ================= */

function initBackToTop() {
  // Cek apakah tombol sudah ada, jika belum buat elemennya secara dinamis
  let btn = document.getElementById("backToTopBtn");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "backToTopBtn";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Kembali ke navigasi atas");
    btn.setAttribute("title", "Kembali ke atas");
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);
  }

  // Tentukan ambang batas scroll:
  // - Pada index.html: tombol muncul setelah user melewati hero section (atau min 300px)
  // - Pada halaman kategori (streaming, editing, dll): tombol muncul setelah scroll 220px
  const hero = document.querySelector(".hero");

  function getScrollThreshold() {
    if (hero) {
      const rect = hero.getBoundingClientRect();
      const heroBottom = rect.bottom + window.scrollY;
      return Math.max(300, heroBottom - 180);
    }
    return 220;
  }

  let threshold = getScrollThreshold();
  window.addEventListener(
    "resize",
    () => {
      threshold = getScrollThreshold();
    },
    { passive: true }
  );

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > threshold) {
          btn.classList.add("visible");
        } else {
          btn.classList.remove("visible");
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // evaluasi awal saat muat halaman

  btn.addEventListener("click", () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
}


/* ================= 12c. REUSABLE ORDER NOW MODAL COMPONENT ================= */

let activeOrderProduct = null;
let activeOrderPackageIndex = 0;
let activePaymentMethod = "QRIS";

function initOrderModal() {
  if (document.getElementById("orderModalBackdrop")) return;

  const backdrop = document.createElement("div");
  backdrop.id = "orderModalBackdrop";
  backdrop.className = "order-modal-backdrop";
  backdrop.setAttribute("aria-hidden", "true");

  backdrop.innerHTML = `
    <div class="order-modal" role="dialog" aria-modal="true" aria-labelledby="orderModalTitle">
      <div class="order-modal-header">
        <div class="order-modal-title-wrap">
          <span id="orderModalIcon" class="order-modal-icon">📦</span>
          <div>
            <span id="orderModalTag" class="order-modal-tag">KATEGORI</span>
            <h3 id="orderModalTitle" class="order-modal-title">Nama Produk</h3>
          </div>
        </div>
        <button type="button" id="orderModalClose" class="order-modal-close" aria-label="Tutup popup order">&times;</button>
      </div>

      <div class="order-modal-body">
        <p id="orderModalDesc" class="order-modal-desc"></p>

        <div class="order-modal-section" id="orderModalPackagesSection">
          <label class="order-modal-label">Pilih Paket / Varian:</label>
          <div id="orderModalPackages" class="order-packages-grid"></div>
        </div>

        <div class="order-modal-section">
          <label class="order-modal-label">Pilihan Metode Pembayaran:</label>
          <div id="orderModalPayments" class="order-payments-grid" style="grid-template-columns: 1fr;">
            <button type="button" class="payment-pill active" data-payment="QRIS" style="justify-content: center; cursor: default;">
              <span>⚡</span> QRIS (Semua E-Wallet &amp; Bank Transfer)
            </button>
          </div>
        </div>

        <div class="order-modal-section">
          <label for="orderModalNotes" class="order-modal-label">Catatan / Email Akun (Opsional):</label>
          <input type="text" id="orderModalNotes" class="order-modal-input" placeholder="Contoh: Email saya abc@gmail.com / akun baru">
        </div>

        <div class="order-summary-box">
          <div class="order-summary-row" id="orderSummaryPkgRow">
            <span class="summary-label">Paket Dipilih:</span>
            <span id="orderSummaryPkg" class="summary-value">-</span>
          </div>
          <div class="order-summary-row">
            <span class="summary-label">Total Harga:</span>
            <span id="orderSummaryPrice" class="summary-value price-highlight">-</span>
          </div>
          <div class="order-summary-row">
            <span class="summary-label">Metode Pembayaran:</span>
            <span id="orderSummaryPay" class="summary-value">QRIS</span>
          </div>
        </div>
      </div>

      <div class="order-modal-footer">
        <button type="button" id="orderModalCancel" class="btn-modal-cancel">Batal</button>
        <a id="orderModalSubmit" class="btn-modal-whatsapp" href="#" target="_blank" rel="noopener">
          <svg class="wa-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
          <span>Lanjut ke WhatsApp</span>
        </a>
      </div>
    </div>
  `;

  document.body.appendChild(backdrop);

  // Event listener tombol tutup
  const closeBtn = document.getElementById("orderModalClose");
  const cancelBtn = document.getElementById("orderModalCancel");
  if (closeBtn) closeBtn.addEventListener("click", closeOrderModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeOrderModal);

  // Klik backdrop untuk menutup modal
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeOrderModal();
  });

  // Tombol Escape keyboard
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) {
      closeOrderModal();
    }
  });

  // Input catatan
  const notesInput = document.getElementById("orderModalNotes");
  if (notesInput) {
    notesInput.addEventListener("input", updateOrderModalWhatsAppLink);
  }

  // Pilihan metode pembayaran
  const paymentPills = backdrop.querySelectorAll(".payment-pill");
  paymentPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      paymentPills.forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activePaymentMethod = pill.getAttribute("data-payment") || "QRIS";
      const summaryPay = document.getElementById("orderSummaryPay");
      if (summaryPay) summaryPay.textContent = activePaymentMethod;
      updateOrderModalWhatsAppLink();
    });
  });
}

function openOrderModal(product, initialPackageIndex = 0) {
  initOrderModal();

  activeOrderProduct = product;
  const hasPkg = (product.hasPackages === true || (Array.isArray(product.packages) && product.packages.length > 0 && product.packages.some(pkg => pkg.label && pkg.label.trim())));

  activeOrderPackageIndex = hasPkg && Array.isArray(product.packages) && product.packages.length > 0
    ? Math.min(Math.max(0, initialPackageIndex), product.packages.length - 1)
    : 0;

  const backdrop = document.getElementById("orderModalBackdrop");
  if (!backdrop) return;

  // Set aksen warna sesuai kategori produk
  const accent = categoryAccents[product.category] || categoryAccents.streaming;
  backdrop.style.setProperty("--modal-accent", accent.accent);
  backdrop.style.setProperty("--modal-glow", accent.glow);

  // Isi data header
  const iconEl = document.getElementById("orderModalIcon");
  const tagEl = document.getElementById("orderModalTag");
  const titleEl = document.getElementById("orderModalTitle");
  const descEl = document.getElementById("orderModalDesc");
  const notesInput = document.getElementById("orderModalNotes");

  if (iconEl) iconEl.innerHTML = product.icon || getAppLogo(product.name, product.iconUrl);
  if (tagEl) tagEl.textContent = categoryLabels[product.category] || product.category;
  if (titleEl) titleEl.textContent = product.name;
  if (descEl) descEl.textContent = product.description;
  if (notesInput) notesInput.value = "";

  // Reset metode pembayaran ke default (QRIS)
  const paymentPills = backdrop.querySelectorAll(".payment-pill");
  paymentPills.forEach((pill, idx) => {
    if (idx === 0) {
      pill.classList.add("active");
      activePaymentMethod = pill.getAttribute("data-payment") || "QRIS";
    } else {
      pill.classList.remove("active");
    }
  });
  const summaryPay = document.getElementById("orderSummaryPay");
  if (summaryPay) summaryPay.textContent = activePaymentMethod;

  // Render opsi paket produk jika ada paket
  const packagesSection = document.getElementById("orderModalPackagesSection");
  const packagesContainer = document.getElementById("orderModalPackages");
  const summaryPkgRow = document.getElementById("orderSummaryPkgRow");

  if (hasPkg && Array.isArray(product.packages) && product.packages.length > 0) {
    if (packagesSection) packagesSection.style.display = "block";
    if (summaryPkgRow) summaryPkgRow.style.display = "flex";
    if (packagesContainer) {
      packagesContainer.innerHTML = "";
      product.packages.forEach((pkg, idx) => {
        const pkgBtn = document.createElement("button");
        pkgBtn.type = "button";
        pkgBtn.className = `order-package-card ${idx === activeOrderPackageIndex ? "active" : ""}`;
        pkgBtn.innerHTML = `
          <span class="order-package-label">${pkg.label}</span>
          <span class="order-package-price">${pkg.price}</span>
        `;
        pkgBtn.addEventListener("click", () => {
          packagesContainer
            .querySelectorAll(".order-package-card")
            .forEach((c) => c.classList.remove("active"));
          pkgBtn.classList.add("active");
          activeOrderPackageIndex = idx;
          updateOrderModalSummary();
          updateOrderModalWhatsAppLink();
        });
        packagesContainer.appendChild(pkgBtn);
      });
    }
  } else {
    // Sembunyikan pilihan paket jika produk tidak memiliki paket
    if (packagesSection) packagesSection.style.display = "none";
    if (summaryPkgRow) summaryPkgRow.style.display = "none";
    if (packagesContainer) packagesContainer.innerHTML = "";
  }

  updateOrderModalSummary();
  updateOrderModalWhatsAppLink();

  backdrop.classList.add("active");
  backdrop.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateOrderModalSummary() {
  if (!activeOrderProduct) return;
  const hasPkg = (activeOrderProduct.hasPackages === true || (Array.isArray(activeOrderProduct.packages) && activeOrderProduct.packages.length > 0 && activeOrderProduct.packages.some(pkg => pkg.label && pkg.label.trim())));

  const summaryPkgRow = document.getElementById("orderSummaryPkgRow");
  const summaryPkg = document.getElementById("orderSummaryPkg");
  const summaryPrice = document.getElementById("orderSummaryPrice");

  if (hasPkg && Array.isArray(activeOrderProduct.packages) && activeOrderProduct.packages.length > 0) {
    if (summaryPkgRow) summaryPkgRow.style.display = "flex";
    const currentPkg = activeOrderProduct.packages[activeOrderPackageIndex] || activeOrderProduct.packages[0];
    if (summaryPkg && currentPkg) summaryPkg.textContent = currentPkg.label;
    if (summaryPrice && currentPkg) {
      const pInfo = parsePriceInfo(currentPkg.price);
      summaryPrice.textContent = pInfo.display;
    }
  } else {
    if (summaryPkgRow) summaryPkgRow.style.display = "none";
    if (summaryPrice) {
      const rawPrice = activeOrderProduct.price || (activeOrderProduct.packages && activeOrderProduct.packages[0] ? activeOrderProduct.packages[0].price : "Rp XX.XXX");
      const pInfo = parsePriceInfo(rawPrice);
      summaryPrice.textContent = pInfo.display;
    }
  }
}

function updateOrderModalWhatsAppLink() {
  if (!activeOrderProduct) return;
  const submitBtn = document.getElementById("orderModalSubmit");
  if (!submitBtn) return;

  const hasPkg = (activeOrderProduct.hasPackages === true || (Array.isArray(activeOrderProduct.packages) && activeOrderProduct.packages.length > 0 && activeOrderProduct.packages.some(pkg => pkg.label && pkg.label.trim())));
  const currentPkg = hasPkg && Array.isArray(activeOrderProduct.packages) && activeOrderProduct.packages.length > 0
    ? (activeOrderProduct.packages[activeOrderPackageIndex] || activeOrderProduct.packages[0])
    : null;
  const rawPrice = currentPkg
    ? currentPkg.price
    : (activeOrderProduct.price || (activeOrderProduct.packages && activeOrderProduct.packages[0] ? activeOrderProduct.packages[0].price : ""));
  const priceInfo = parsePriceInfo(rawPrice);

  const notesInput = document.getElementById("orderModalNotes");
  const notes = notesInput ? notesInput.value.trim() : "";

  let msg = `Halo Kak Admin Terranova Store! Mau order nih kak:\n\n`;
  msg += `Detail Pesanan:\n`;
  msg += `Produk: ${activeOrderProduct.name}\n`;
  if (hasPkg && currentPkg && currentPkg.label && currentPkg.label.trim()) {
    msg += `Paket: ${currentPkg.label}\n`;
  }
  if (priceInfo.hasRealPrice) {
    msg += `Nominal Harga: ${priceInfo.nominalOnly}\n`;
  } else {
    msg += `Nominal Harga: ${priceInfo.display}\n`;
  }
  msg += `Metode Pembayaran: ${activePaymentMethod}\n`;
  if (notes.length > 0) {
    msg += `Catatan: ${notes}\n`;
  }

  if (activePaymentMethod.toUpperCase().includes("QRIS")) {
    msg += `\nBoleh minta barcode QRIS-nya ya kak? Ditunggu kak, terima kasih!`;
  } else {
    msg += `\nBoleh minta info detail pembayarannya ya kak? Ditunggu kak, terima kasih!`;
  }

  submitBtn.href = buildWhatsAppLink(msg);
}

function closeOrderModal() {
  const backdrop = document.getElementById("orderModalBackdrop");
  if (!backdrop) return;
  backdrop.classList.remove("active");
  backdrop.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}



/* ================= SINKRONISASI 100% VIDEO PROFIL (FRAME-ACCURATE LOCKSTEP) ================= */
function initOptimizedVideoLoops() {
  const heroVideo = document.querySelector("video.hero-logo-media");
  const brandVideo = document.querySelector("video.brand-logo-media");
  const introVideo = document.querySelector("video.intro-logo-media");

  const allVideos = [heroVideo, brandVideo, introVideo].filter(Boolean);
  if (allVideos.length === 0) return;

  // Konfigurasi decoding optimal untuk seluruh video profil
  allVideos.forEach((v) => {
    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.loop = true;
    v.preload = "auto";
    v.playbackRate = 1.0;

    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.setAttribute("x5-playsinline", "");
    v.setAttribute("preload", "auto");
    v.setAttribute("autoplay", "");
    v.setAttribute("loop", "");
    v.setAttribute("disablepictureinpicture", "");
    v.setAttribute("disableremoteplayback", "");

    const applyPosterFallback = () => {
      if (v.poster) {
        v.style.backgroundImage = `url("${v.poster}")`;
        v.style.backgroundSize = "cover";
        v.style.backgroundPosition = "center";
      }
    };

    v.addEventListener("error", applyPosterFallback);
  });

  const isMobile = window.innerWidth <= 768;

  // IntersectionObserver untuk pause video saat di luar layar (hemat CPU/GPU & baterai secara drastis saat scrolling)
  if ("IntersectionObserver" in window) {
    const videoScrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target;
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroVideo) videoScrollObserver.observe(heroVideo);
    if (introVideo) videoScrollObserver.observe(introVideo);
  }

  // JIKA KEDUA VIDEO ADA (homepage index.html di layar Desktop):
  // Pasang Canvas Mirroring HANYA pada desktop (window.innerWidth > 768)
  if (!isMobile && heroVideo && brandVideo) {
    const brandWrap = brandVideo.parentElement;
    let canvas = brandWrap ? brandWrap.querySelector("canvas.brand-logo-media") : null;

    if (brandWrap && !canvas) {
      canvas = document.createElement("canvas");
      canvas.className = "brand-logo-media";
      canvas.width = 96;
      canvas.height = 96;
      canvas.setAttribute("aria-hidden", "true");

      brandVideo.style.display = "none";
      brandWrap.appendChild(canvas);
    }

    if (canvas) {
      const ctx = canvas.getContext("2d", { alpha: false });
      let isLoopRunning = false;

      function renderCanvasFrame() {
        if (!heroVideo || heroVideo.paused || heroVideo.ended) {
          isLoopRunning = false;
          return;
        }

        if (heroVideo.readyState >= 2) {
          ctx.drawImage(heroVideo, 0, 0, canvas.width, canvas.height);
        }

        if ("requestVideoFrameCallback" in heroVideo) {
          heroVideo.requestVideoFrameCallback(renderCanvasFrame);
        } else {
          requestAnimationFrame(renderCanvasFrame);
        }
      }

      function startCanvasLoop() {
        if (!isLoopRunning) {
          isLoopRunning = true;
          renderCanvasFrame();
        }
      }

      heroVideo.addEventListener("play", startCanvasLoop);
      heroVideo.addEventListener("loadeddata", () => {
        if (heroVideo.readyState >= 2) ctx.drawImage(heroVideo, 0, 0, canvas.width, canvas.height);
      });
      heroVideo.addEventListener("canplay", () => {
        if (heroVideo.readyState >= 2) ctx.drawImage(heroVideo, 0, 0, canvas.width, canvas.height);
      });
    }

    Promise.all([heroVideo.play(), brandVideo.play()]).catch(() => {});
  } else {
    // Pada mobile atau sub-halaman: putar langsung tanpa canvas mirroring overhead
    if (heroVideo) heroVideo.play().catch(() => {});
    if (brandVideo) brandVideo.play().catch(() => {});
  }

  // Handle visibility change tab browser: saat tab aktif kembali, sinkronkan instan
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      allVideos.forEach((v) => {
        if (!v.paused) v.pause();
      });
    } else {
      if (heroVideo) heroVideo.play().catch(() => {});
      if (brandVideo) brandVideo.play().catch(() => {});
    }
  });
}

/* ================= 12. SINKRONISASI REAL-TIME DARI ADMIN ================= */

/**
 * Sinkronkan produk secara real-time dari REST API backend /api/products.
 * Jika admin baru saja menambah/mengedit/menghapus produk di Admin Dashboard,
 * etalase toko otomatis menampilkan produk terbaru tanpa perlu rebuild kode!
 */
async function syncLiveProducts() {
  try {
    const res = await fetch("/api/products?t=" + Date.now(), { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    if (data.success && Array.isArray(data.products) && data.products.length > 0) {
      products = data.products.map((p) => ({
        ...p,
        icon: getAppLogo(p.name, p.iconUrl),
      }));
      renderProducts();
      renderPricelist();
      setupScrollReveal();
    }
  } catch (_) {
    // Fallback mulus ke katalog bawaan
  }
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {
  initIntro();
  initOptimizedVideoLoops();
  createGalaxyBackground();
  renderProducts();
  renderPricelist();
  initRealtimeSearch();
  setupContactLinks();
  setupSidebar();
  setupSmoothScroll();
  highlightActiveNav();
  markStaticRevealElements();
  setupScrollReveal();
  initBackToTop();
  initOrderModal();
  syncLiveProducts();
});
