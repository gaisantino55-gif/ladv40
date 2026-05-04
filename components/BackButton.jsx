'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200  text-slate-600  font-bold text-sm hover:bg-slate-50 :bg-slate-800 transition-all active:scale-95 group mb-6"
    >
      <span className="group-hover:-translate-x-1 transition-transform">←</span>
      Back
    </button>
  );
}
