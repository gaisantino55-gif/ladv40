import { NextResponse } from 'next/server';
import fs   from 'fs';
import path from 'path';

const ADMIN_PASSWORD = 'shop01010';
const DB_PATH        = path.join(process.cwd(), 'data', 'products.json');

function readDB() {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function checkAuth(request) {
  const pwd = request.headers.get('x-admin-password');
  return pwd === ADMIN_PASSWORD;
}

// GET /api/admin/products — list all
export async function GET(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(readDB());
}

// POST /api/admin/products — create product
export async function POST(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { name, price, category, image, description, in_stock } = body;

  if (!name || !price || !category) {
    return NextResponse.json({ error: 'name, price, and category are required.' }, { status: 400 });
  }

  const products = readDB();
  const newProduct = {
    id:          slugify(name) + '-' + Date.now(),
    name:        String(name),
    price:       Number(price),
    category:    String(category),
    image:       image || '',
    description: description || '',
    in_stock:    Boolean(in_stock ?? true),
  };

  products.push(newProduct);
  writeDB(products);

  return NextResponse.json(newProduct, { status: 201 });
}

// PUT /api/admin/products — update product
export async function PUT(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: 'id is required.' }, { status: 400 });
  }

  const products = readDB();
  const idx = products.findIndex((p) => p.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  products[idx] = {
    ...products[idx],
    ...updates,
    id, // never change id
    price:    Number(updates.price ?? products[idx].price),
    in_stock: Boolean(updates.in_stock ?? products[idx].in_stock),
  };

  writeDB(products);
  return NextResponse.json(products[idx]);
}

// DELETE /api/admin/products?id=xxx — delete product
export async function DELETE(request) {
  if (!checkAuth(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'id query param required.' }, { status: 400 });
  }

  let products = readDB();
  const before  = products.length;
  products      = products.filter((p) => p.id !== id);

  if (products.length === before) {
    return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
  }

  writeDB(products);
  return NextResponse.json({ success: true });
}
