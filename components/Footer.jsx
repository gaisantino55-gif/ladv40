import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-emerald-300 py-16 mt-8">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-extrabold text-white mb-3 tracking-tight">
              <span className="text-emerald-500">GAAB</span> Solutions
            </h3>
            <p className="text-sm leading-7 text-emerald-500">
              Premium IT infrastructure and precision engineering for global enterprises.
            </p>
            <div className="flex gap-3 mt-5">
              {['𝕏', 'in', 'f'].map((s, i) => (
                <span
                  key={i}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-700-dark text-emerald-300 text-xs font-bold hover:bg-emerald-700/90 hover:text-white cursor-pointer transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-2">
              <p className="text-sm text-emerald-500 leading-7">📍 Jamia Plaza, Ground Floor – next to Jamia Mosque, Nairobi CBD</p>
              <p className="text-sm text-emerald-500 leading-7">📞 +254 704 434 364</p>
              <p className="text-sm text-emerald-500 leading-7">✉️ abdirizakarale3@gmail.com</p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-emerald-500">
              {[
                { label: 'Products', href: '/products' },
                { label: 'Cart', href: '/cart' },
                { label: 'Admin Panel', href: '/admin' },
                { label: 'Delivery Policy', href: '/delivery' },
                { label: 'Returns & Refunds', href: '/returns' },
                { label: 'Warranty Policy', href: '/warranty' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms & Conditions', href: '/terms' },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="block hover:text-white hover:translate-x-1 transition-all whitespace-nowrap"
                >
                  <span className="text-blue-600 mr-1.5">→</span>{l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-700-dark mt-12 pt-6 text-center text-sm text-blue-600">
          © 2024 GAAB Solutions Limited · Precision Engineering &amp; Global IT Solutions.
        </div>
      </div>
    </footer>
  );
}
