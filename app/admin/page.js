'use client';

import { useState, useEffect, useRef } from 'react';

const PASSWORD = 'shop01010';

const EMPTY_FORM = {
  name: '', price: '', category: '', image: '', description: '', in_stock: true,
};

// ─── helpers ───────────────────────────────────────────────────────────────
function api(method, path, body, password) {
  const opts = {
    method,
    headers: { 'x-admin-password': password, 'Content-Type': 'application/json' },
  };
  if (body) opts.body = JSON.stringify(body);
  return fetch(path, opts).then((r) => r.json());
}

async function uploadImage(file, password) {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/admin/upload', {
    method: 'POST',
    headers: { 'x-admin-password': password },
    body: fd,
  });
  return res.json();
}

// ─── Main component ────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed,       setAuthed]       = useState(false);
  const [pwdInput,     setPwdInput]     = useState('');
  const [pwdError,     setPwdError]     = useState('');
  const [products,     setProducts]     = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [toast,        setToast]        = useState(null);       // { msg, type }
  const [editingId,    setEditingId]    = useState(null);       // null = add mode
  const [form,         setForm]         = useState(EMPTY_FORM);
  const [imageFile,    setImageFile]    = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading,    setUploading]    = useState(false);
  const [deleteId,     setDeleteId]     = useState(null);       // confirm modal
  const [deletedIds,   setDeletedIds]   = useState([]);         // track deleted items
  const [searchQ,      setSearchQ]      = useState('');
  const fileRef = useRef();

  // ── toast helper
  function showToast(msg, type = 'success') {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }

  // ── fetch products
  async function loadProducts() {
    setLoading(true);
    const data = await api('GET', '/api/admin/products', null, PASSWORD);
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  // ── login
  function handleLogin(e) {
    e.preventDefault();
    if (pwdInput === PASSWORD) {
      setAuthed(true);
      loadProducts();
    } else {
      setPwdError('Wrong password. Try again.');
    }
  }

  // ── form change
  function setField(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  // ── image file pick
  function handleFilePick(e) {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  // ── open edit
  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name:        product.name,
      price:       product.price,
      category:    product.category,
      image:       product.image,
      description: product.description,
      in_stock:    product.in_stock ?? true,
    });
    setImagePreview(product.image || '');
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── cancel edit
  function cancelEdit() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImagePreview('');
    setImageFile(null);
  }

  // ── submit form (add or edit)
  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    let imageUrl = form.image;

    // Upload new image if selected
    if (imageFile) {
      const result = await uploadImage(imageFile, PASSWORD);
      if (result.url) {
        imageUrl = result.url;
      } else {
        showToast('Image upload failed: ' + (result.error || 'unknown'), 'error');
        setUploading(false);
        return;
      }
    }

    const payload = { ...form, image: imageUrl, price: Number(form.price) };

    if (editingId) {
      const res = await api('PUT', '/api/admin/products', { id: editingId, ...payload }, PASSWORD);
      if (res.error) { showToast(res.error, 'error'); }
      else { showToast('Product updated ✅'); cancelEdit(); loadProducts(); }
    } else {
      const res = await api('POST', '/api/admin/products', payload, PASSWORD);
      if (res.error) { showToast(res.error, 'error'); }
      else { showToast('Product added ✅'); cancelEdit(); loadProducts(); }
    }

    setUploading(false);
  }

  // ── delete
  async function confirmDelete() {
    const currentDeleteId = deleteId;
    const res = await api('DELETE', `/api/admin/products?id=${currentDeleteId}`, null, PASSWORD);
    setDeleteId(null);
    if (res.error) {
      showToast(res.error, 'error');
    } else {
      showToast('Product deleted 🗑️');
      setDeletedIds((prev) => [...prev, currentDeleteId]);
    }
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQ.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQ.toLowerCase())
  );

  // ─── Login screen ─────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#022c22,#064e3b)' }}>
        <div className="w-full max-w-sm mx-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-extrabold text-white">Admin Access</h1>
            <p className="text-emerald-300 text-sm mt-1">GAAB Solutions — Product Manager</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={pwdInput}
              onChange={(e) => { setPwdInput(e.target.value); setPwdError(''); }}
              className="w-full rounded-2xl border border-emerald-500/30 bg-white/10 px-5 py-3 text-white placeholder-emerald-300/60 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
              autoFocus
            />
            {pwdError && <p className="text-red-400 text-sm font-medium">{pwdError}</p>}
            <button
              type="submit"
              className="w-full rounded-2xl bg-emerald-500 py-3 text-white font-bold hover:bg-emerald-500 transition-colors shadow-lg"
            >
              Unlock Dashboard →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ─── Admin dashboard ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg,#ecfdf5 0%,#d1fae5 60%,#f0fdf4 100%)' }}>

      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-2xl px-5 py-3 text-sm font-semibold shadow-xl transition-all ${
          toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
        }`}>
          {toast.msg}
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="rounded-3xl bg-white p-8 shadow-2xl max-w-sm w-full mx-4 border border-red-100">
            <div className="text-4xl text-center mb-4">⚠️</div>
            <h2 className="text-xl font-extrabold text-gray-900 text-center mb-2">Delete Product?</h2>
            <p className="text-gray-500 text-center text-sm mb-8">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 rounded-2xl border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDelete} className="flex-1 rounded-2xl bg-red-600 py-3 font-bold text-white hover:bg-red-500">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-blue-200/60 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-emerald-700-dark">
              🛠️ <span className="text-blue-600">GAAB</span> Admin Panel
            </h1>
            <p className="text-xs text-blue-600 mt-0.5">Product Manager</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-emerald-700 font-semibold bg-emerald-700/10 px-3 py-1 rounded-full">
              {products.length} products
            </span>
            <a href="/" className="rounded-full border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-700/5 transition-colors">
              ← Store
            </a>
            <button
              onClick={() => { setAuthed(false); setPwdInput(''); }}
              className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-200 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1280px] mx-auto px-6 py-10 grid gap-10 lg:grid-cols-[420px_1fr]">

        {/* ── Left: Add / Edit form ─────────────────────────────────── */}
        <div className="rounded-3xl border border-emerald-700/10 bg-white/80 backdrop-blur-sm p-8 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-extrabold text-emerald-700-dark mb-6">
            {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <label className="block">
              <span className="text-sm font-bold text-emerald-700-dark">Product Name *</span>
              <input
                required
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
                placeholder="e.g. Enterprise Laptop Pro"
                className="mt-1.5 w-full rounded-2xl border border-blue-200 bg-emerald-700/5/60 px-4 py-2.5 text-emerald-700-dark outline-none focus:border-emerald-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>

            {/* Price + Category */}
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm font-bold text-emerald-700-dark">Price (USD) *</span>
                <input
                  required
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setField('price', e.target.value)}
                  placeholder="299"
                  className="mt-1.5 w-full rounded-2xl border border-blue-200 bg-emerald-700/5/60 px-4 py-2.5 text-emerald-700-dark outline-none focus:border-emerald-500 focus:ring-2 focus:ring-blue-200"
                />
              </label>
              <label className="block">
                <span className="text-sm font-bold text-emerald-700-dark">Category *</span>
                <input
                  required
                  value={form.category}
                  onChange={(e) => setField('category', e.target.value)}
                  placeholder="Hardware"
                  className="mt-1.5 w-full rounded-2xl border border-blue-200 bg-emerald-700/5/60 px-4 py-2.5 text-emerald-700-dark outline-none focus:border-emerald-500 focus:ring-2 focus:ring-blue-200"
                />
              </label>
            </div>

            {/* Description */}
            <label className="block">
              <span className="text-sm font-bold text-emerald-700-dark">Description</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setField('description', e.target.value)}
                placeholder="Short product description..."
                className="mt-1.5 w-full resize-none rounded-2xl border border-blue-200 bg-emerald-700/5/60 px-4 py-2.5 text-emerald-700-dark outline-none focus:border-emerald-500 focus:ring-2 focus:ring-blue-200"
              />
            </label>

            {/* In Stock toggle */}
            <div className="flex items-center justify-between rounded-2xl border border-blue-200 bg-emerald-700/5/60 px-4 py-3">
              <span className="text-sm font-bold text-emerald-700-dark">In Stock</span>
              <button
                type="button"
                onClick={() => setField('in_stock', !form.in_stock)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                  form.in_stock ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  form.in_stock ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Image upload */}
            <div>
              <span className="text-sm font-bold text-emerald-700-dark block mb-1.5">Product Image</span>

              {/* Preview */}
              {imagePreview && (
                <div className="mb-3 rounded-2xl overflow-hidden border border-blue-200 aspect-video bg-emerald-700/5 relative">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(''); setImageFile(null); setField('image', ''); if (fileRef.current) fileRef.current.value = ''; }}
                    className="absolute top-2 right-2 rounded-full bg-red-600 text-white w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-red-500"
                  >✕</button>
                </div>
              )}

              {/* Upload button */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex-1 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-700/5 py-3 text-sm font-semibold text-emerald-700 hover:border-emerald-500 hover:bg-emerald-700/10 transition-colors"
                >
                  📁 {imageFile ? imageFile.name : 'Choose image file'}
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFilePick} />
              </div>

              {/* OR URL */}
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs text-emerald-500 font-medium">or paste URL:</span>
                <input
                  type="url"
                  value={imageFile ? '' : form.image}
                  onChange={(e) => { setField('image', e.target.value); setImagePreview(e.target.value); setImageFile(null); }}
                  placeholder="https://..."
                  className="flex-1 rounded-xl border border-blue-200 bg-emerald-700/5/60 px-3 py-1.5 text-xs text-emerald-700-dark outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 rounded-2xl bg-emerald-700 py-3 text-white font-bold hover:bg-emerald-700/90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md shadow-blue-200"
              >
                {uploading ? '⏳ Saving...' : editingId ? '💾 Save Changes' : '➕ Add Product'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="rounded-2xl border border-blue-200 bg-emerald-700/5 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-700/10"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* ── Right: Product table ───────────────────────────────────── */}
        <div>
          {/* Search + refresh */}
          <div className="flex items-center gap-3 mb-6">
            <input
              type="search"
              placeholder="Search by name or category…"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              className="flex-1 rounded-2xl border border-blue-200 bg-white/80 px-5 py-3 text-emerald-700-dark outline-none focus:border-emerald-500 focus:ring-2 focus:ring-blue-200 shadow-sm"
            />
            <button
              onClick={loadProducts}
              className="rounded-2xl border border-blue-200 bg-white/80 px-5 py-3 font-semibold text-emerald-700 hover:bg-emerald-700/5 shadow-sm transition-colors"
            >
              🔄
            </button>
          </div>

          {loading ? (
            <div className="text-center py-20 text-blue-600 font-semibold animate-pulse">Loading products…</div>
          ) : filtered.length === 0 ? (
            <div className="rounded-3xl border border-emerald-700/10 bg-white/80 p-16 text-center shadow-sm">
              <div className="text-5xl mb-4">📦</div>
              <p className="text-emerald-700 font-semibold">No products found.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((p) => {
                const isDeleted = deletedIds.includes(p.id);
                return (
                <div
                  key={p.id}
                  className={`rounded-3xl border backdrop-blur-sm p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 transition-all ${
                    isDeleted ? 'bg-red-50/80 border-red-200 opacity-60 pointer-events-none' :
                    editingId === p.id ? 'bg-white/80 border-emerald-500 ring-2 ring-blue-200' : 'bg-white/80 border-emerald-700/10 hover:shadow-md'
                  }`}
                >
                  {/* Image */}
                  <div className="relative w-full sm:w-24 h-24 rounded-2xl overflow-hidden bg-emerald-700/5 flex-shrink-0 border border-emerald-700/10">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className={`w-full h-full object-cover ${isDeleted ? 'grayscale' : ''}`} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🖼️</div>
                    )}
                    {isDeleted && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[1px]">
                        <span className="text-white font-black text-xs uppercase tracking-widest rotate-[-12deg] border-2 border-white px-2 py-1 rounded shadow-lg">Deleted</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`font-extrabold text-base truncate ${isDeleted ? 'text-red-800 line-through' : 'text-emerald-700-dark'}`}>{p.name}</h3>
                      <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide ${isDeleted ? 'bg-red-200 text-red-800' : 'bg-emerald-700/10 text-emerald-700'}`}>
                        {p.category}
                      </span>
                      <span className={`rounded-full text-[10px] font-bold px-2 py-0.5 ${
                        p.in_stock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
                      }`}>
                        {p.in_stock ? '✅ In Stock' : '❌ Out of Stock'}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 line-clamp-1 ${isDeleted ? 'text-red-700/70 line-through' : 'text-blue-600/80'}`}>{p.description || '—'}</p>
                    <p className={`text-lg font-extrabold mt-1 ${isDeleted ? 'text-red-800/80' : 'text-emerald-700'}`}>
                      ${Number(p.price).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => startEdit(p)}
                      className="rounded-2xl bg-emerald-700/10 px-4 py-2 text-sm font-bold text-emerald-700-dark hover:bg-blue-200 transition-colors"
                      disabled={isDeleted}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(p.id)}
                      className="rounded-2xl bg-red-100 px-4 py-2 text-sm font-bold text-red-700 hover:bg-red-200 transition-colors"
                      disabled={isDeleted}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              )})}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
