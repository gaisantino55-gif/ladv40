'use client';

import { useState } from 'react';
import useCart from '../../hooks/useCart';
import { formatCurrency } from '../../lib/utils';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState(''); // 'success' | 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus('');
    setStatusType('');

    const formData = new FormData(event.currentTarget);
    const orderPayload = {
      fullName:        formData.get('fullName') || '',
      email:           formData.get('email') || '',
      phone:           formData.get('phone') || '',
      shippingAddress: formData.get('shippingAddress') || '',
      city:            formData.get('city') || '',
      country:         formData.get('country') || '',
      paymentMethod:   formData.get('paymentMethod') || 'M-Pesa',
      // Appwrite requires array fields to be stored as JSON string if not a native list attr
      items: JSON.stringify(
        cart.map((item) => ({
          id:       item.id,
          name:     item.name,
          quantity: item.quantity,
          price:    item.price,
        }))
      ),
      total:     cartTotal,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('/api/appwrite/orders', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.error || 'Failed to save order.');
      }

      clearCart();
      setStatus('✅ Order placed successfully! We will contact you shortly.');
      setStatusType('success');
      event.currentTarget.reset();
    } catch (error) {
      setStatus('❌ ' + (error.message || 'Something went wrong. Please try again.'));
      setStatusType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    'mt-2 w-full rounded-2xl border border-blue-200 bg-emerald-700/5/60 px-4 py-3 text-emerald-700-dark outline-none focus:border-emerald-500 focus:ring-2 focus:ring-blue-200 transition';

  const labelClass = 'block text-sm font-semibold text-emerald-700-dark';

  return (
    <section className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">
      <div className="grid gap-10 lg:grid-cols-[0.65fr_0.35fr]">

        {/* ── Form panel ── */}
        <div className="rounded-3xl border border-emerald-700/10 bg-white/80 backdrop-blur-sm p-10 shadow-sm">
          <h1 className="text-4xl font-extrabold text-emerald-700-dark mb-2">Checkout</h1>
          <p className="text-emerald-700/70 mb-10">
            Complete your purchase by filling in your shipping details below.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                Full name
                <input name="fullName" required className={inputClass} type="text" placeholder="Jane Doe" />
              </label>
              <label className={labelClass}>
                Email address
                <input name="email" required className={inputClass} type="email" placeholder="jane@example.com" />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                Phone
                <input name="phone" className={inputClass} type="tel" placeholder="+254 7xx xxx xxx" />
              </label>
              <label className={labelClass}>
                Shipping address
                <input name="shippingAddress" required className={inputClass} type="text" placeholder="123 Main St" />
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className={labelClass}>
                City
                <input name="city" required className={inputClass} type="text" placeholder="Nairobi" />
              </label>
              <label className={labelClass}>
                Country
                <input name="country" required className={inputClass} type="text" placeholder="Kenya" />
              </label>
            </div>

            <div className="pt-4 border-t border-emerald-700/10">
              <span className={`${labelClass} mb-3`}>Payment Method</span>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex items-center gap-3 p-4 rounded-2xl border border-blue-200 bg-white hover:border-emerald-500 cursor-pointer transition-colors shadow-sm">
                  <input type="radio" name="paymentMethod" value="M-Pesa" defaultChecked className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-bold text-emerald-900 flex items-center gap-2">
                    <span className="text-xl">📱</span> M-Pesa
                  </span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-2xl border border-blue-200 bg-white hover:border-emerald-500 cursor-pointer transition-colors shadow-sm">
                  <input type="radio" name="paymentMethod" value="Card" className="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                  <span className="font-bold text-emerald-900 flex items-center gap-2">
                    <span className="text-xl">💳</span> Credit / Debit Card
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || cart.length === 0}
              className="w-full rounded-2xl bg-emerald-700 px-6 py-4 text-white font-bold text-base hover:bg-emerald-700/90 active:scale-[0.98] transition-all disabled:cursor-not-allowed disabled:opacity-50 shadow-md shadow-blue-200"
            >
              {isSubmitting ? '⏳ Placing order...' : '✅ Place Order'}
            </button>

            {cart.length === 0 && (
              <p className="text-center text-sm text-emerald-500">
                Your cart is empty. <a href="/products" className="underline font-semibold">Browse products</a> first.
              </p>
            )}

            {status && (
              <div
                className={`rounded-2xl px-5 py-4 text-sm font-medium ${
                  statusType === 'success'
                    ? 'bg-emerald-700/5 text-emerald-700-dark border border-blue-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                {status}
              </div>
            )}
          </form>
        </div>

        {/* ── Order summary ── */}
        <aside className="rounded-3xl border border-emerald-700/10 bg-emerald-700/5/70 backdrop-blur-sm p-8 shadow-sm h-fit sticky top-24">
          <h2 className="text-xl font-extrabold text-emerald-700-dark mb-6">Order Summary</h2>

          <div className="space-y-4">
            {cart.length === 0 ? (
              <p className="text-blue-600 text-sm">No items in cart yet.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 border-b border-blue-200 pb-4"
                >
                  <div>
                    <p className="font-bold text-emerald-700-dark text-sm">{item.name}</p>
                    <p className="text-xs text-emerald-500">Qty {item.quantity}</p>
                  </div>
                  <span className="font-bold text-emerald-700-dark">
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 border-t border-emerald-300 pt-6 flex items-center justify-between">
            <span className="text-lg font-bold text-emerald-700-dark">Total</span>
            <span className="text-2xl font-extrabold text-emerald-700">{formatCurrency(cartTotal)}</span>
          </div>

          <div className="mt-6 rounded-2xl bg-emerald-700/10 px-4 py-3 text-xs text-emerald-700 leading-5">
            🔒 Secure checkout · Orders saved to Appwrite · M-Pesa payment integration available
          </div>
        </aside>

      </div>
    </section>
  );
}
