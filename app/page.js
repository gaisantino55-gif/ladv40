import ProductGrid from '../components/ProductGrid';
import { getProducts } from '../data/products';

export default function Home() {
  const products = getProducts();
  const featured = products.slice(0, 4);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 60%, #065f46 100%)' }}>
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #34d399, transparent 70%)' }} />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-15" style={{ background: 'radial-gradient(circle, #6ee7b7, transparent 70%)' }} />

        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/Everything for Everyone.png"
            alt="GAAB Solutions Workspace"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-32">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="mb-8 w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-400 bg-white shadow-[0_0_20px_rgba(52,211,153,0.3)] flex items-center justify-center">
              <img src="/images/logo.png" alt="GAAB Logo" className="w-full h-full object-contain p-2" />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-emerald-300 mb-8">
              🟢 Enterprise IT &amp; Electronics
            </span>
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-6">
              Quality hardware for{' '}
              <span className="text-emerald-500">modern businesses.</span>
            </h1>
            <p className="max-w-2xl text-lg text-blue-200/80 mb-10">
              GAAB Solutions delivers industry-grade equipment, infrastructure, and service
              packages designed to keep your enterprise running at peak performance.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-blue-900/40"
              >
                Browse Products →
              </a>
              <a
                href="/checkout"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white hover:bg-white/20 transition-colors"
              >
                Start Checkout
              </a>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="relative -mb-1 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 56L1440 0V56H0Z" fill="#f0fdf4" />
          </svg>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-emerald-700 text-white py-6">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold">
          {[
            { label: 'Products Available', value: `${products.length}+` },
            { label: 'Countries Served', value: '12+' },
            { label: 'Enterprise Clients', value: '500+' },
            { label: 'Years of Experience', value: '10+' },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-2xl font-extrabold text-blue-200">{s.value}</span>
              <span className="text-emerald-700/10/70">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Top Picks (Orange Style) ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="bg-orange-600 rounded-t-xl px-6 py-3">
          <h2 className="text-xl font-bold text-white tracking-tight">Top Picks</h2>
        </div>
        <div className="bg-white border-x border-b border-orange-100 p-6 rounded-b-xl shadow-xl shadow-orange-900/5">
          <ProductGrid products={products.filter(p => p.discount).slice(0, 6)} />
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-500 mb-3 font-bold">
              Featured hardware
            </p>
            <h2 className="text-4xl font-extrabold text-blue-950">Highlighted Products</h2>
          </div>
          <a
            href="/products"
            className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:text-emerald-500 hover:underline transition-colors"
          >
            View all catalog →
          </a>
        </div>

        <ProductGrid products={featured} />
      </section>
    </main>
  );
}
