import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Cloud Run injects PORT (typically 8080 in production, or 3000 in dev/local).
// Listening on process.env.PORT is required for Cloud Run health checks.
const PORT = Number(process.env.PORT) || 3000;

// Middleware Body Parser (support base64 image upload)
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Paths
const DATA_DIR = path.join(__dirname, 'data');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const CONFIG_FILE = path.join(DATA_DIR, 'admin-config.json');
const UPLOAD_DIR = path.join(__dirname, 'assets', 'images', 'custom');

// Ensure directories exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Active Admin Tokens in Memory
const activeAdminTokens = new Set();

// Read Products helper
function getProducts() {
  try {
    if (fs.existsSync(PRODUCTS_FILE)) {
      const raw = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading products.json:', err);
  }
  return [];
}

// Save Products helper
function saveProducts(products) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

// Read Admin Config helper
function getAdminConfig() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
    }
  } catch (err) {
    console.error('Error reading admin-config.json:', err);
  }
  return { pin: '317444' };
}

// Auth Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (token && activeAdminTokens.has(token)) {
    next();
    return;
  }
  res.status(401).json({ success: false, message: 'Akses ditolak. Sesi admin tidak valid atau telah berakhir.' });
}

// ==================== PUBLIC API ROUTES ====================

// Health check endpoint for Cloud Run
app.get('/health', (_req, res) => {
  res.status(200).send('OK');
});

// GET /api/products - Dapatkan seluruh produk aktif (atau semua jika query all=true)
app.get('/api/products', (req, res) => {
  try {
    const all = req.query.all === 'true';
    const products = getProducts();
    if (all) {
      res.json({ success: true, count: products.length, products });
    } else {
      const activeOnly = products.filter((p) => p.active !== false);
      res.json({ success: true, count: activeOnly.length, products: activeOnly });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal memuat produk', error: String(error) });
  }
});

// GET /api/icons - Dapatkan daftar preset ikon aplikasi bawaan
app.get('/api/icons', (_req, res) => {
  try {
    const appsDir = path.join(__dirname, 'assets', 'images', 'apps');
    let icons = [];
    if (fs.existsSync(appsDir)) {
      const files = fs.readdirSync(appsDir);
      icons = files
        .filter(f => f.endsWith('.webp') || f.endsWith('.png') || f.endsWith('.svg'))
        .map(f => ({
          filename: f,
          path: `assets/images/apps/${f}`,
          name: f.replace(/\.(webp|png|svg)$/i, '').replace(/-/g, ' ').toUpperCase()
        }));
    }
    res.json({ success: true, icons });
  } catch (error) {
    res.status(500).json({ success: false, icons: [] });
  }
});

// ==================== ADMIN API ROUTES ====================

// POST /api/admin/login - Verifikasi PIN admin & buat token
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  const config = getAdminConfig();

  if (!pin) {
    res.status(400).json({ success: false, message: 'PIN admin wajib diisi' });
    return;
  }

  // Verifikasi PIN Permanen (317444)
  if (pin.trim() === '317444' || pin.trim() === config.pin.trim()) {
    const token = crypto.randomBytes(32).toString('hex');
    activeAdminTokens.add(token);
    res.json({
      success: true,
      token,
      message: 'Login berhasil! Selamat datang di Portal Admin Terranova Store.'
    });
    return;
  }

  res.status(401).json({ success: false, message: 'PIN admin salah. Silakan coba lagi.' });
});

// POST /api/admin/logout - Hapus token sesi
app.post('/api/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) activeAdminTokens.delete(token);
  res.json({ success: true, message: 'Logout berhasil' });
});

// POST /api/admin/change-pin - PIN ditetapkan permanen
app.post('/api/admin/change-pin', requireAdmin, (_req, res) => {
  res.status(403).json({ success: false, message: 'PIN admin telah ditetapkan secara permanen (317444) dan tidak dapat diubah.' });
});

// POST /api/admin/upload-icon - Upload gambar ikon aplikasi baru (Base64)
app.post('/api/admin/upload-icon', requireAdmin, (req, res) => {
  try {
    const { base64Data, filename, appName } = req.body;
    if (!base64Data) {
      res.status(400).json({ success: false, message: 'Data gambar tidak ditemukan' });
      return;
    }

    // Ekstrak format dan data base64
    const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ success: false, message: 'Format base64 tidak valid' });
      return;
    }

    const ext = matches[1].includes('png') ? 'png' : matches[1].includes('webp') ? 'webp' : 'jpg';
    const buffer = Buffer.from(matches[2], 'base64');

    // Buat nama file yang aman
    const cleanName = (appName || filename || 'custom-app')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-');
    const finalFilename = `${cleanName}-${Date.now()}.${ext}`;
    const targetPath = path.join(UPLOAD_DIR, finalFilename);

    fs.writeFileSync(targetPath, buffer);
    const publicUrl = `assets/images/custom/${finalFilename}`;

    res.json({
      success: true,
      message: 'Ikon berhasil diunggah',
      iconUrl: publicUrl
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengunggah ikon', error: String(error) });
  }
});

// POST /api/admin/products - Tambah produk baru
app.post('/api/admin/products', requireAdmin, (req, res) => {
  try {
    const { name, category, description, badge, iconUrl, packages, active } = req.body;

    if (!name || !name.trim()) {
      res.status(400).json({ success: false, message: 'Nama produk wajib diisi' });
      return;
    }
    if (!category || !['streaming', 'editing', 'listening', 'study', 'lainnya', 'topup'].includes(category)) {
      res.status(400).json({ success: false, message: 'Kategori produk tidak valid' });
      return;
    }

    const validPackages = Array.isArray(packages) && packages.length > 0
      ? packages.map((pkg) => ({
          label: (pkg.label || '1 Bulan').trim(),
          price: (pkg.price || 'Rp XX.XXX').trim()
        }))
      : [{ label: '1 Bulan', price: 'Rp XX.XXX' }];

    // Buat unique ID berdasarkan nama
    const baseId = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const id = `${baseId}-${Date.now().toString(36)}`;

    const newProduct = {
      id,
      name: name.trim(),
      category,
      description: (description || '').trim(),
      badge: (badge || '').trim(),
      iconUrl: (iconUrl || 'assets/images/apps/netflix.webp').trim(),
      packages: validPackages,
      active: active !== false,
      createdAt: new Date().toISOString()
    };

    const products = getProducts();
    // Tambahkan produk baru ke awal list (agar langsung terlihat di atas)
    products.unshift(newProduct);
    saveProducts(products);

    res.status(201).json({
      success: true,
      message: `Produk "${name}" berhasil ditambahkan ke katalog ${category.toUpperCase()}!`,
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menambah produk', error: String(error) });
  }
});

// PUT /api/admin/products/:id - Edit produk yang ada
app.put('/api/admin/products/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, badge, iconUrl, packages, active } = req.body;

    const products = getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
      return;
    }

    const current = products[index];

    const validPackages = Array.isArray(packages) && packages.length > 0
      ? packages.map((pkg) => ({
          label: (pkg.label || '1 Bulan').trim(),
          price: (pkg.price || 'Rp XX.XXX').trim()
        }))
      : current.packages;

    const updated = {
      ...current,
      name: name !== undefined ? name.trim() : current.name,
      category: category !== undefined ? category : current.category,
      description: description !== undefined ? description.trim() : current.description,
      badge: badge !== undefined ? badge.trim() : current.badge,
      iconUrl: iconUrl !== undefined ? iconUrl.trim() : current.iconUrl,
      packages: validPackages,
      active: active !== undefined ? active : current.active,
      updatedAt: new Date().toISOString()
    };

    products[index] = updated;
    saveProducts(products);

    res.json({
      success: true,
      message: `Produk "${updated.name}" berhasil diperbarui!`,
      product: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal memperbarui produk', error: String(error) });
  }
});

// PATCH /api/admin/products/:id/toggle - Toggle status aktif produk
app.patch('/api/admin/products/:id/toggle', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const products = getProducts();
    const product = products.find((p) => p.id === id);

    if (!product) {
      res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
      return;
    }

    product.active = !product.active;
    product.updatedAt = new Date().toISOString();
    saveProducts(products);

    res.json({
      success: true,
      message: `Status produk "${product.name}" diubah menjadi ${product.active ? 'Aktif' : 'Nonaktif'}`,
      active: product.active
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal mengubah status produk', error: String(error) });
  }
});

// DELETE /api/admin/products/:id - Hapus produk
app.delete('/api/admin/products/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const products = getProducts();
    const index = products.findIndex((p) => p.id === id);

    if (index === -1) {
      res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
      return;
    }

    const deleted = products.splice(index, 1)[0];
    saveProducts(products);

    res.json({
      success: true,
      message: `Produk "${deleted.name}" berhasil dihapus dari katalog!`,
      deletedId: id
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Gagal menghapus produk', error: String(error) });
  }
});

// ==================== STATIC & ROUTE HANDLING ====================

// Static files (dengan ekstensi html)
app.use(express.static(__dirname, {
  extensions: ['html']
}));

// Route eksplisit untuk admin
app.get('/admin', (_req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Fallback untuk SPA routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Primary Server Listener on PORT (e.g. 8080 in Cloud Run production, 3000 in dev)
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Terranova Store server running on http://0.0.0.0:${PORT}`);
});

// If PORT is not 3000 (e.g. PORT=8080 on Cloud Run production), also bind to 3000 as secondary
// so internal proxies or dev bridges can reach it regardless of environment.
if (PORT !== 3000) {
  try {
    const auxServer = app.listen(3000, '0.0.0.0', () => {
      console.log('Terranova Store auxiliary listener running on http://0.0.0.0:3000');
    });
    auxServer.on('error', (err) => {
      // EADDRINUSE is expected if port 3000 is used by another service; ignore safely
      console.log('Auxiliary port 3000 status:', err.code);
    });
  } catch (_) {}
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
