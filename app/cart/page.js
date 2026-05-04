'use client';

import Link from 'next/link';
import CartItem from '../../components/CartItem';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../lib/utils';

export default function CartPage() {
  const { cart, cartTotal, clearCart } = useCart();

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-emerald-700-dark mb-2">🛒 Shopping Cart</h1>
        <p className="text-emerald-700/70">
          {cart.length === 0
            ? 'Your cart is empty.'
            : `${cart.length} item${cart.length > 1 ? 's' : ''} in your cart.`}
        </p>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-3xl border border-emerald-700/10 bg-white/80 backdrop-blur-sm p-16 text-center shadow-sm">
          <div className="text-6xl mb-4">🛍️</div>
          <p className="text-emerald-700 text-lg font-semibold mb-6">Your cart is empty.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-700 px-8 py-3 text-white font-bold hover:bg-emerald-700/90 transition-colors shadow"
          >
            Browse Products →
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Cart items */}
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Summary panel */}
          <aside className="rounded-3xl border border-emerald-700/10 bg-white/80 backdrop-blur-sm p-8 shadow-sm h-fit sticky top-24">
            <h2 className="text-xl font-extrabold text-emerald-700-dark mb-2">Order Summary</h2>
            <p className="text-blue-600 text-sm mb-6">
              {cart.length} item{cart.length > 1 ? 's' : ''}
            </p>

            <div className="border-t border-emerald-700/10 pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-emerald-700-dark font-semibold">Total</span>
                <span className="text-3xl font-extrabold text-emerald-700">
                  {formatCurrency(cartTotal)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full text-center rounded-2xl bg-emerald-700 px-6 py-4 text-white font-bold hover:bg-emerald-700/90 active:scale-[0.98] transition-all shadow-md shadow-blue-200 mb-3"
            >
              ✅ Checkout Now
            </Link>

            <button
              type="button"
              onClick={clearCart}
              className="w-full rounded-2xl border border-blue-200 bg-emerald-700/5 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-700/10 transition-colors"
            >
              Clear Cart
            </button>

            <p className="mt-5 text-center text-xs text-emerald-500">
              🔒 Secure order · M-Pesa &amp; card payment available
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
