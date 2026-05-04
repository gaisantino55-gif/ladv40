// Products data — now reads from products.json so admin edits persist at runtime.
// Falls back to static list if JSON is unavailable (e.g. during build).
let _cache = null;

export function getProducts() {
  if (typeof window !== 'undefined') {
    // Client side: return last known cache or empty
    return _cache || [];
  }
  // Server side: read from JSON
  try {
    const fs   = require('fs');
    const path = require('path');
    const file = path.join(process.cwd(), 'data', 'products.json');
    const raw  = fs.readFileSync(file, 'utf-8');
    _cache = JSON.parse(raw);
    return _cache;
  } catch {
    return [];
  }
}

// Keep the named export for backward-compat with existing imports
// (populated once on first import via static list until API replaces it)
export const products = [
  {
    "id": "hp-victus-15-i7",
    "name": "HP Victus Gaming 15 Laptop (Intel Core i7, 16GB RAM)",
    "price": 165000,
    "originalPrice": 183000,
    "discount": 10,
    "category": "Laptops",
    "image": "/products/buixotfuifiadvd7v9au.webp",
    "description": "High-performance gaming laptop with Intel Core i7, 16GB RAM, and NVIDIA dedicated graphics.",
    "in_stock": true
  },
  {
    "id": "epson-m2140",
    "name": "Epson EcoTank M2140 A4 Duplex All-in-One Ink Tank Printer",
    "price": 45000,
    "category": "Printers",
    "image": "/products/rksti2wpzz93idhosgew (1).webp",
    "description": "3-in-1 Monochrome ink tank printer with automatic duplex printing and Ethernet connectivity.",
    "in_stock": true
  },
  {
    "id": "msi-rtx-5080",
    "name": "MSI GeForce RTX 5080 Gaming Trio 16GB GDDR7",
    "price": 175000,
    "originalPrice": 185000,
    "discount": 5,
    "category": "Hardware",
    "image": "/products/vhsinf6q32brpp9m7gni.webp",
    "description": "Next-gen NVIDIA RTX 5080 GPU with 16GB GDDR7 VRAM and triple-fan cooling.",
    "in_stock": true
  }
];
