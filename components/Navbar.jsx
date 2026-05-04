'use client';

import Link from 'next/link';
import useCart from '../hooks/useCart';
import AuthHeader from './AuthHeader';

export default function Navbar() {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200/60 bg-white/80 backdrop-blur-md shadow-sm transition-colors">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-4 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-colors group"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400 bg-white shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
            <img src="/images/logo.png" alt="GAAB Logo" className="w-full h-full object-contain p-1" />
          </div>
          <div className="text-2xl font-extrabold tracking-tight hidden sm:block">
            <span className="text-emerald-500">GAAB</span> <span className="text-emerald-900">Solutions</span>
          </div>
        </Link>

        {/* Nav links / Search */}
        <div className="flex-1 max-w-md hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-6 text-sm font-semibold mr-4">
            <Link
              href="/"
              className="text-emerald-700 hover:text-emerald-500 transition-colors relative group whitespace-nowrap"
            >
              Home
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 rounded-full transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/products"
              className="text-emerald-700 hover:text-emerald-500 transition-colors relative group whitespace-nowrap"
            >
              Products
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 rounded-full transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="text-emerald-700 hover:text-emerald-500 transition-colors relative group whitespace-nowrap"
            >
              Contact
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 rounded-full transition-all group-hover:w-full" />
            </Link>
            <Link
              href="/account"
              className="text-emerald-700 hover:text-emerald-500 transition-colors relative group whitespace-nowrap"
            >
              My Account
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-emerald-500 rounded-full transition-all group-hover:w-full" />
            </Link>
          </nav>

          <form action="/products" className="relative w-full group">
            <input
              type="text"
              name="search"
              placeholder="Search products..."
              className="w-full rounded-full border border-emerald-200 bg-emerald-50/50 px-5 py-2.5 pl-12 text-sm text-emerald-900 placeholder-emerald-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-inner"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 group-focus-within:text-emerald-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative inline-flex items-center justify-center rounded-full bg-emerald-700 px-6 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-900/10 active:scale-95"
          >
            <span className="mr-2">🛒</span> Cart
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white shadow-md ring-2 ring-white animate-bounce-short">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="h-8 w-px bg-emerald-100 hidden sm:block mx-1" />

          <AuthHeader />
        </div>
      </div>
    </header>
  );
}
