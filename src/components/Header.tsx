// Header.tsx
import Link from 'next/link';
import SearchBar from './SearchBar';
import { ShoppingCart } from 'lucide-react';
import { getSettings } from '@/lib/actions/settings.server';
import { getCartCount } from '@/lib/actions/cart.server';

export const dynamic = 'force-dynamic';
export default async function Header() {
    const count = await getCartCount();
    const settings = await getSettings();

    console.log("Count",count)

    return (
        <header className="bg-white dark:bg-black border-b border-black/10 dark:border-white/10 px-4 py-3 sticky top-0 z-40 transition-colors duration-200">
            <nav className="flex items-center justify-between max-w-7xl mx-auto gap-4">
                
                {/* Left: Logo */}
                <Link 
                    href="/" 
                    className="text-lg font-medium tracking-tight uppercase  hover:opacity-70 transition-opacity duration-200 text-black dark:text-white"
                >
                    {settings.site_name || 'Mongkol Store'}
                </Link>

                {/* Center: Search - Desktop only */}
                <div className="hidden md:block flex-1 max-w-md mx-8">
                    <SearchBar />
                </div>

                {/* Right: Nav Links */}
                <div className="flex items-center gap-5 text-sm">
                    <Link 
                        href="/" 
                        className="hidden sm:block hover:opacity-70 transition-opacity duration-200 text-black/80 dark:text-white/80"
                    >
                        Home
                    </Link>
                    <Link 
                        href="/products" 
                        className="hidden sm:block hover:opacity-70 transition-opacity duration-200 text-black/80 dark:text-white/80"
                    >
                        Products
                    </Link>
                    <Link 
                        href="/contact" 
                        className="hidden sm:block hover:opacity-70 transition-opacity duration-200 text-black/80 dark:text-white/80"
                    >
                        Contact
                    </Link>
                    
                    {/* Cart with count */}
                    <Link 
                        href="/cart" 
                        className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-200 text-black dark:text-white relative"
                        aria-label={`Shopping cart with ${count} items`}
                    >
                        <ShoppingCart size={18} strokeWidth={1.5} />
                        {/* {count > 0 && ( */}
                            <span className="absolute -top-2 -right-3 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                {count > 99 ? '99+' : count}
                            </span>
                        {/* )} */}
                    </Link>

                    {/* Mobile Search trigger */}
                    <div className="block md:hidden">
                        <SearchBar />
                    </div>
                </div>
            </nav>
        </header>
    );
}