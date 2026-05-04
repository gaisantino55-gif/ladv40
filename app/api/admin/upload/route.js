import { NextResponse } from 'next/server';
import fs   from 'fs';
import path from 'path';

const ADMIN_PASSWORD = 'shop01010';
const UPLOAD_DIR     = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request) {
  const pwd = request.headers.get('x-admin-password');
  if (pwd !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Ensure uploads directory exists
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }

  const formData = await request.formData();
  const file     = formData.get('file');

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  }

  const ext      = file.name.split('.').pop().toLowerCase();
  const allowed  = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
  if (!allowed.includes(ext)) {
    return NextResponse.json({ error: 'Only jpg, jpeg, png, webp, gif allowed.' }, { status: 400 });
  }

  const fileName = `product-${Date.now()}.${ext}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const buffer   = Buffer.from(await file.arrayBuffer());

  fs.writeFileSync(filePath, buffer);

  const publicUrl = `/uploads/${fileName}`;
  return NextResponse.json({ url: publicUrl }, { status: 201 });
}
