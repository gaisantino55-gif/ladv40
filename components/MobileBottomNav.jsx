'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useCart from '../hooks/useCart';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navItems = [
    { label: 'Home', icon: 'home', href: '/' },
    { label: 'Categories', icon: 'grid_view', href: '/products' },
    { label: 'Cart', icon: 'shopping_basket', href: '/cart', badge: cartCount },
    { label: 'Account', icon: 'person', href: '/account' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-[env(safe-area-inset-bottom)]">
      <nav className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          // Simplistic active check
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 relative transition-colors ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-sm ring-1 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
