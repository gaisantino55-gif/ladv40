'use client';

import { SignInButton, SignUpButton, UserButton, useAuth, useClerk } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

export default function AuthHeader() {
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-20 h-8 bg-emerald-700/5 animate-pulse rounded-full" />;
  }

  return (
    <div className="flex items-center gap-2">
      {!isSignedIn ? (
        <>
          <SignInButton mode="modal">
            <button className="rounded-full border border-emerald-300  px-4 py-1.5 text-sm font-semibold text-emerald-700  hover:bg-emerald-700/5 :bg-slate-800 transition-colors">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="rounded-full bg-emerald-700  px-4 py-1.5 text-sm font-semibold text-white hover:bg-emerald-700/90 :bg-emerald-500 transition-colors shadow-sm">
              Sign Up
            </button>
          </SignUpButton>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <button
            onClick={async () => {
              await signOut();
              window.location.href = '/';
            }}
            className="rounded-full border border-emerald-300 px-4 py-1.5 text-sm font-semibold text-emerald-700 hover:bg-emerald-700/5 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
