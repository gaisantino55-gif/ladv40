'use client';

import useCart from '../hooks/useCart';
import { formatCurrency } from '../lib/utils';
import { useState } from 'react';
import BackButton from './BackButton';
import ProductGrid from './ProductGrid';

export default function ProductDetailView({ product, relatedProducts }) {
  const { addToCart } = useCart();
  const [selectedLocation, setSelectedLocation] = useState('Nairobi');
  const [activeImage, setActiveImage] = useState(product.image);

  const gallery = product.images || [product.image];

  return (
    <div className="max-w-[1280px] mx-auto">
      <BackButton />
      <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-start">
      
      {/* Main Content (Image + Info) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row gap-8">
        
        {/* Left: Image Gallery */}
        <div className="w-full md:w-[450px] shrink-0">
          <div className="aspect-square rounded-2xl border border-slate-100 overflow-hidden bg-slate-50 relative group shadow-inner">
            <img src={activeImage} alt={product.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-md cursor-pointer hover:bg-white transition-all hover:scale-110 active:scale-90">
              <span className="text-emerald-500 text-xl">♡</span>
            </div>
          </div>
          
          {/* Thumbnails Under Main Image */}
          <div className="flex flex-wrap gap-3 mt-4">
            {gallery.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 rounded-xl border-2 transition-all overflow-hidden bg-slate-50 ${img === activeImage ? 'border-emerald-500 ring-4 ring-emerald-500/10 shadow-sm' : 'border-slate-100 hover:border-emerald-200'}`}
              >
                <img src={img} className={`w-full h-full object-cover p-1 ${img !== activeImage ? 'opacity-60 grayscale-[20%] hover:opacity-100 hover:grayscale-0' : ''}`} />
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-50">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Share this product</p>
            <div className="flex gap-3">
              {['Facebook', 'X', 'WhatsApp'].map(s => (
                <button key={s} className="px-4 py-2 rounded-lg border border-slate-100 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-200 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-900 text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Premium Selection</span>
              {product.in_stock && <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">● In Stock</span>}
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>
            <div className="text-xs text-slate-500 font-medium">
              Category: <span className="text-emerald-600 font-bold hover:underline cursor-pointer uppercase tracking-tight">{product.category}</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-slate-900">{formatCurrency(product.price)}</span>
              {product.originalPrice && (
                <span className="text-lg text-slate-400 line-through font-medium">{formatCurrency(product.originalPrice)}</span>
              )}
            </div>
            {product.discount && (
              <div className="inline-flex items-center gap-2 mt-2 bg-emerald-100 px-2 py-1 rounded">
                <span className="text-xs font-black text-emerald-700">SAVE {product.discount}%</span>
              </div>
            )}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex text-amber-400">★★★★★</div>
              <span className="text-[11px] font-bold text-slate-500">(1.2k Reviews)</span>
            </div>
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  Color: <span className="text-emerald-600">{product.colors.find(c => c.image === activeImage)?.name || product.colors[0].name}</span>
                </p>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(c.image)}
                    className={`group relative w-14 h-14 rounded-full border-2 transition-all p-0.5 overflow-hidden ${activeImage === c.image ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-slate-200 hover:border-emerald-300'}`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                      <img src={c.image} className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              onClick={() => addToCart(product)}
              disabled={!product.in_stock}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-900/20 transition-all hover:-translate-y-1 active:scale-95 active:translate-y-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {product.in_stock ? 'Add to cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar (Delivery & Returns) */}
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-50">
            <h3 className="text-xs font-bold text-slate-700 uppercase">Delivery & Returns</h3>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 text-[11px] font-bold text-emerald-600 border-b border-emerald-50 pb-2">
              <span>🚀</span> GAAB EXPRESS
            </div>
            
            <div className="space-y-3">
              <p className="text-[11px] font-bold text-slate-700">Choose your location</p>
              <select 
                value={selectedLocation} 
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded border-slate-200 text-sm focus:ring-orange-500 focus:border-orange-500 py-2"
              >
                <option>Nairobi</option>
                <option>Mombasa</option>
                <option>Kisumu</option>
                <option>Nakuru</option>
              </select>
              <select className="w-full rounded border-slate-200 text-sm focus:ring-orange-500 focus:border-orange-500 py-2">
                <option>CBD - UON/Globe/Koja/River</option>
                <option>Westlands</option>
                <option>Kilimani</option>
              </select>
            </div>

            <div className="space-y-5 pt-4">
              {[
                { icon: '🚚', title: 'Instant Delivery', fee: 'KSh 400', desc: 'Ready for delivery on 04 May if you place your order within the next 2hrs' },
                { icon: '🏪', title: 'Pickup Station', fee: 'KSh 70', desc: 'Ready for pickup on 05 May if you place your order within the next 3hrs' },
                { icon: '📦', title: 'Door Delivery', fee: 'KSh 160', desc: 'Ready for delivery on 05 May if you place your order within the next 3hrs' }
              ].map(item => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg border border-slate-100 flex items-center justify-center text-xl shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[11px] font-bold text-slate-800">{item.title}</h4>
                      <span className="text-[10px] text-emerald-500 hover:underline cursor-pointer">Details</span>
                    </div>
                    <p className="text-[10px] text-slate-900  font-bold mt-0.5">Delivery Fees {item.fee}</p>
                    <p className="text-[9px] text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      </div>

      {/* Full width bottom sections */}
      <div className="mt-12 space-y-12">
        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">Related Products</h2>
            </div>
            <ProductGrid products={relatedProducts} />
          </section>
        )}

        {/* Product Details Accordion */}
        <section>
          <details className="group bg-white rounded-xl shadow-sm border border-slate-100 p-6 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex items-center justify-between cursor-pointer list-none select-none">
              <h2 className="text-xl font-bold text-slate-900">Product Details</h2>
              <span className="transition-transform group-open:rotate-180 text-emerald-600 font-bold text-xl">▼</span>
            </summary>
            <div className="mt-6 pt-6 border-t border-slate-100 text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
              {product.description || "Detailed specifications and description for this product are not currently available."}
            </div>
          </details>
        </section>
      </div>

    </div>
  );
}
