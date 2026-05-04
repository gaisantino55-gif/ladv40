'use client';

import { useState } from 'react';
import AuthHeader from './AuthHeader';

export default function ResponsiveNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center h-16 px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-outline-variant text-emerald-700-dark"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="text-xl font-bold tracking-tight text-emerald-700-dark font-headline-md">GAAB Solutions</div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a className="text-emerald-700 border-b-2 border-emerald-700 pb-1 font-semibold font-label-lg transition-all" href="#">
            Home
          </a>
          <a className="text-slate-600 font-medium font-label-lg hover:text-emerald-700-dark transition-colors duration-200" href="#">
            Products
          </a>
          <a className="text-slate-600 font-medium font-label-lg hover:text-emerald-700-dark transition-colors duration-200" href="#">
            IT Services
          </a>
          <a className="text-slate-600 font-medium font-label-lg hover:text-emerald-700-dark transition-colors duration-200" href="#">
            About
          </a>
          <a className="text-slate-600 font-medium font-label-lg hover:text-emerald-700-dark transition-colors duration-200" href="#">
            Contact
          </a>
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              className="pl-10 pr-4 py-2 border border-outline-variant rounded-lg text-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface"
              placeholder="Search services..."
              type="text"
            />
          </div>
          <button className="bg-emerald-700 text-on-primary px-6 py-2 rounded-lg font-label-lg active:scale-95 transition-all">
            Request Quote
          </button>
          <AuthHeader />
        </div>

        <div className="lg:hidden hidden md:flex items-center space-x-4">
          <button className="bg-emerald-700 text-on-primary px-5 py-2 rounded-lg font-label-lg active:scale-95 transition-all">
            Quote
          </button>
        </div>
      </div>

      <div className={`md:hidden ${open ? 'block' : 'hidden'} bg-white border-t border-gray-200 shadow-sm`}> 
        <div className="px-6 py-5 space-y-4">
          <a className="block text-slate-700 font-medium" href="#">
            Home
          </a>
          <a className="block text-slate-700 font-medium" href="#">
            Products
          </a>
          <a className="block text-slate-700 font-medium" href="#">
            IT Services
          </a>
          <a className="block text-slate-700 font-medium" href="#">
            About
          </a>
          <a className="block text-slate-700 font-medium" href="#">
            Contact
          </a>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
            <input
              className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-lg text-body-sm focus:ring-2 focus:ring-secondary focus:border-transparent bg-surface"
              placeholder="Search services..."
              type="text"
            />
          </div>
          <div className="flex flex-col gap-3">
            <button className="bg-emerald-700 text-on-primary px-6 py-3 rounded-lg font-label-lg w-full active:scale-95 transition-all">
              Request Quote
            </button>
            <AuthHeader />
          </div>
        </div>
      </div>
    </nav>
  );
}
