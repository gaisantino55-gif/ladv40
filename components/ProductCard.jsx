'use client';

import Link from 'next/link';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../lib/utils';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="group bg-white backdrop-blur-sm border border-emerald-700/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col h-full">
      <Link href={`/products/${product.id}`} className="absolute inset-0 z-0" />
      
      {/* Discount badge */}
      {product.discount && (
        <div className="absolute top-4 right-4 z-10 bg-orange-600 text-white text-[11px] font-black px-2.5 py-1 rounded-lg shadow-lg animate-pulse">
          -{product.discount}%
        </div>
      )}

      {/* Image */}
      <div className="aspect-square bg-emerald-700/5 overflow-hidden relative">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={product.image}
          alt={product.name}
        />
        {/* Category badge */}
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 rounded-full bg-emerald-700/90 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 sm:px-3 sm:py-1 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Body */}
      <div className="p-3 sm:p-6 flex flex-col gap-3 sm:gap-4 flex-1">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
            <h3 className="text-sm sm:text-lg font-bold text-emerald-700-dark leading-snug line-clamp-1 sm:line-clamp-none">{product.name}</h3>
            {product.in_stock === false ? (
              <span className="text-[9px] sm:text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-100 self-start sm:self-auto">
                Out of Stock
              </span>
            ) : (
              <span className="text-[9px] sm:text-[10px] font-bold text-blue-600 bg-emerald-700/5 px-2 py-0.5 rounded-full border border-emerald-700/10 self-start sm:self-auto">
                In Stock
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-emerald-700/70 mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="mt-auto flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-extrabold text-emerald-700-dark">
              {formatCurrency(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-emerald-500 line-through decoration-emerald-300/50 font-medium">
                {formatCurrency(product.originalPrice)}
              </span>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-auto">
            <button
              type="button"
              disabled={product.in_stock === false}
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="relative z-10 flex-1 rounded-xl sm:rounded-full bg-emerald-700 text-white px-3 py-2 sm:px-4 sm:py-2.5 text-xs sm:text-sm font-bold hover:bg-emerald-700/90 active:scale-95 transition-all shadow-md shadow-blue-900/5 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-400 flex items-center justify-center gap-1 sm:gap-2"
            >
              {product.in_stock === false ? 'Sold Out' : (
                <>
                  <span className="text-sm sm:text-base leading-none">🛒</span>
                  <span className="hidden sm:inline">Add to Cart</span>
                  <span className="sm:hidden">Add</span>
                </>
              )}
            </button>
            <div className="relative z-10 hidden sm:flex w-10 h-10 sm:w-12 sm:h-10 items-center justify-center rounded-full border border-emerald-300 text-emerald-700 hover:bg-emerald-700/5 transition-colors shadow-sm pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
