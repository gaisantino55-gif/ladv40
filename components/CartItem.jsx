'use client';

import useCart from '../hooks/useCart';
import { formatCurrency } from '../lib/utils';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-emerald-700/10 bg-white/80 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <img
          className="w-24 h-24 object-cover rounded-2xl border border-emerald-700/10"
          src={item.image}
          alt={item.name}
        />
        <div className="flex-1">
          <h3 className="font-bold text-emerald-700-dark">{item.name}</h3>
          <p className="text-sm text-blue-600 mt-0.5">{formatCurrency(item.price)} each</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Quantity controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="h-9 w-9 rounded-full border border-emerald-300 text-emerald-700 font-bold hover:bg-emerald-700/5 active:scale-90 transition-all"
          >
            −
          </button>
          <span className="min-w-[36px] text-center font-bold text-emerald-700-dark">{item.quantity}</span>
          <button
            type="button"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="h-9 w-9 rounded-full border border-emerald-300 text-emerald-700 font-bold hover:bg-emerald-700/5 active:scale-90 transition-all"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-bold text-emerald-700-dark">
            {formatCurrency(item.price * item.quantity)}
          </span>
          <button
            type="button"
            onClick={() => removeFromCart(item.id)}
            className="text-sm text-red-500 hover:text-red-700 font-semibold transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
