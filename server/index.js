import express from 'express';
import cors from 'cors';

import crypto from 'crypto';

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// Configure Express Proxy trust for production behind Nginx/Cloudflare
if (NODE_ENV === 'production' || process.env.TRUST_PROXY === 'true') {
  app.set('trust proxy', 1); // Trust first-hop reverse proxy
}

// 1. Security Headers Middleware (Defensive against Clickjacking, MIME sniffing, XSS)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:* https://citraputramandiri.co.id; object-src 'none'; base-uri 'self'; frame-ancestors 'self';"
  );
  if (NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  next();
});

// 2. Origin-Restricted CORS Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'https://citraputramandiri.co.id',
  'https://www.citraputramandiri.co.id',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('CORS policy: Access from this origin is restricted.'), false);
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key'],
    maxAge: 86400,
  })
);

// Body parser with size limits to prevent payload exhaustion attacks
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Helper to safely extract client IP considering trust proxy configuration
const getClientIp = (req) => {
  if (req.app.get('trust proxy')) {
    const xForwardedFor = req.headers['x-forwarded-for'];
    if (xForwardedFor && typeof xForwardedFor === 'string') {
      return xForwardedFor.split(',')[0].trim();
    }
  }
  return req.ip || req.socket.remoteAddress || '127.0.0.1';
};

// 3. Lightweight In-Memory IP Rate Limiter Middleware (Anti-spam / Anti-DoS)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 15; // max 15 submissions per 15 minutes

const rateLimiter = (req, res, next) => {
  const ip = getClientIp(req);
  const now = Date.now();

  const record = rateLimitMap.get(ip) || { count: 0, startTime: now };

  if (now - record.startTime > RATE_LIMIT_WINDOW_MS) {
    record.count = 1;
    record.startTime = now;
  } else {
    record.count += 1;
  }

  rateLimitMap.set(ip, record);

  // Clean old entries periodically
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      error: 'Terlalu banyak permintaan. Silakan coba kembali dalam beberapa menit.',
    });
  }

  next();
};

// 4. Input Sanitization & Validation Helpers
const sanitizeText = (input, maxLength = 200) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // Strip angle brackets to neutralize HTML/XSS injection
    .slice(0, maxLength);
};

const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.length <= 100 && emailRegex.test(email.trim());
};

// 5. In-Memory Store with Ring Buffer Cap (Max 200 records to prevent memory leak)
const MAX_STORED_RECORDS = 200;
const contactInquiries = [];
const msdsRequests = [];

const addToStore = (store, item) => {
  if (store.length >= MAX_STORED_RECORDS) {
    store.shift(); // Remove oldest entry
  }
  store.push(item);
};

// 6. Routes

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    company: 'CV. Citra Putra Mandiri',
    timestamp: new Date().toISOString(),
  });
});

// Contact Form Submission (Protected by Rate Limiter & Strict Validation)
app.post('/api/contact', rateLimiter, (req, res) => {
  const { name, company, email, phone, product, message } = req.body || {};

  const cleanName = sanitizeText(name, 100);
  const cleanCompany = sanitizeText(company, 100);
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanPhone = sanitizeText(phone, 30);
  const cleanProduct = sanitizeText(product, 100);
  const cleanMessage = sanitizeText(message, 2000);

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: 'Nama minimal 2 karakter.' });
  }

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: 'Format alamat email tidak valid.' });
  }

  if (!cleanMessage || cleanMessage.length < 5) {
    return res.status(400).json({ error: 'Pesan wajib diisi minimal 5 karakter.' });
  }

  const inquiry = {
    id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: cleanName,
    company: cleanCompany || '-',
    email: cleanEmail,
    phone: cleanPhone || '-',
    product: cleanProduct || 'Umum / Kimia Industri',
    message: cleanMessage,
    timestamp: new Date().toISOString(),
  };

  addToStore(contactInquiries, inquiry);

  return res.status(201).json({
    success: true,
    message: 'Inkuiri Anda berhasil diterima. Tim teknis CV. Citra Putra Mandiri akan segera menghubungi Anda.',
    inquiryId: inquiry.id,
  });
});

// MSDS/TDS Request Submission (Protected by Rate Limiter & Validation)
app.post('/api/resources/request-msds', rateLimiter, (req, res) => {
  const { name, company, email, phone, productCode, productName, notes } = req.body || {};

  const cleanName = sanitizeText(name, 100);
  const cleanCompany = sanitizeText(company, 100);
  const cleanEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const cleanPhone = sanitizeText(phone, 30);
  const cleanCode = sanitizeText(productCode, 50);
  const cleanProductName = sanitizeText(productName, 100);
  const cleanNotes = sanitizeText(notes, 1000);

  if (!cleanName || cleanName.length < 2) {
    return res.status(400).json({ error: 'Nama pemohon minimal 2 karakter.' });
  }

  if (!isValidEmail(cleanEmail)) {
    return res.status(400).json({ error: 'Format alamat email tidak valid.' });
  }

  const requestItem = {
    id: `MSDS-REQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: cleanName,
    company: cleanCompany || '-',
    email: cleanEmail,
    phone: cleanPhone || '-',
    productCode: cleanCode || 'UMUM',
    productName: cleanProductName || 'Dokumen Resmi MSDS/TDS',
    notes: cleanNotes || '-',
    timestamp: new Date().toISOString(),
  };

  addToStore(msdsRequests, requestItem);

  return res.status(201).json({
    success: true,
    message: 'Permintaan dokumen MSDS/TDS berhasil diterima.',
    requestId: requestItem.id,
  });
});

// 7. Protected Admin Data Endpoints (Guards against Information Disclosure / Scraping)
const adminAuth = (req, res, next) => {
  const userKey = req.headers['x-admin-key'];

  if (!ADMIN_API_KEY || typeof userKey !== 'string') {
    return res.status(403).json({ error: 'Akses ditolak. Kredensial tidak valid.' });
  }

  // Constant-time comparison to prevent timing attacks
  const userKeyBuffer = Buffer.from(userKey);
  const adminKeyBuffer = Buffer.from(ADMIN_API_KEY);

  if (
    userKeyBuffer.length !== adminKeyBuffer.length ||
    !crypto.timingSafeEqual(userKeyBuffer, adminKeyBuffer)
  ) {
    return res.status(403).json({ error: 'Akses ditolak. Kredensial tidak valid.' });
  }

  next();
};

app.get('/api/contact', adminAuth, (req, res) => {
  res.json({ total: contactInquiries.length, inquiries: contactInquiries });
});

app.get('/api/resources/requests', adminAuth, (req, res) => {
  res.json({ total: msdsRequests.length, requests: msdsRequests });
});

// 8. Centralized Safe Error Handler (Never expose stack traces in responses)
app.use((err, req, res, next) => {
  console.error('[SERVER_ERROR]', err.message);
  res.status(500).json({
    error: 'Terjadi kendala pada server. Silakan coba beberapa saat lagi.',
  });
});

// 9. 404 Handler for undefined API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'Endpoint tidak ditemukan.' });
});

app.listen(PORT, () => {
  console.log(`🔒 Server backend Express CV. Citra Putra Mandiri berjalan secara aman di port ${PORT}`);
});

