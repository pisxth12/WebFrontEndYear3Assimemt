'use client';

import Link from 'next/link';
import SearchBar from './SearchBar';
import { ShoppingCart, Menu, X, Home, Package, Phone, Box } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderClientProps {
    siteName: string;
    count: number;
}

const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Products', icon: Package },
    { href: '/orders', label: 'Order', icon: Box },
    { href: '/contact', label: 'Contact', icon: Phone },
];

export default function HeaderClient({ siteName, count }: HeaderClientProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [sidebarOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSidebarOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            <header className="bg-white dark:bg-black border-b border-black/10 dark:border-white/10 px-4 py-3 sticky top-0 z-40 transition-colors duration-200">
                <nav className="flex items-center justify-between px-2 sm:px-5 mx-auto gap-4">

                    {/* Left: Hamburger (mobile) + Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="sm:hidden p-1.5 -ml-1 text-black dark:text-white hover:opacity-60 transition-opacity"
                            aria-label="Open menu"
                        >
                            <Menu size={20} strokeWidth={1.5} />
                        </button>

                        <Link
                            href="/"
                            className="text-lg font-medium tracking-tight uppercase hover:opacity-70 transition-opacity duration-200 text-black dark:text-white"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            {siteName}
                        </Link>
                    </div>

                    {/* Center: Search — desktop */}
                    <div className="hidden md:block flex-1 max-w-md mx-8">
                        <SearchBar />
                    </div>

                    {/* Right: Nav + Cart */}
                    <div className="flex items-center gap-5 text-sm">
                        {navLinks.map(({ href, label }) => (
                            <Link
                                key={href}
                                href={href}
                                className="hidden sm:block hover:opacity-70 transition-opacity duration-200 text-black/80 dark:text-white/80"
                            >
                                {label}
                            </Link>
                        ))}

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="flex items-center gap-1.5 hover:opacity-70 transition-opacity duration-200 text-black dark:text-white relative"
                            aria-label={`Shopping cart with ${count} items`}
                        >
                            <ShoppingCart size={18} strokeWidth={1.5} />
                            <span className="absolute -top-2 -right-3 bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                {count > 99 ? '99+' : count}
                            </span>
                        </Link>

                        {/* Mobile search */}
                        <div className="block md:hidden">
                            <SearchBar />
                        </div>
                    </div>
                </nav>
            </header>

            {/* ── Sidebar overlay ── */}
            {/* Backdrop */}
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity duration-300 sm:hidden
                    ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Drawer */}
            <aside
                className={`fixed top-0 left-0 h-full w-72 z-50 
                    bg-white dark:bg-black 
                    border-r border-black/10 dark:border-white/10
                    flex flex-col
                    transition-transform duration-300 ease-in-out sm:hidden
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 dark:border-white/10">
                    <Link
                        href="/"
                        onClick={() => setSidebarOpen(false)}
                        className="text-base font-medium tracking-tight uppercase text-black dark:text-white"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {siteName}
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1.5 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors"
                        aria-label="Close menu"
                    >
                        <X size={18} strokeWidth={1.5} />
                    </button>
                </div>

               

                {/* Nav links */}
                <nav className="flex flex-col px-3 py-4 gap-1 flex-1">
                    {navLinks.map(({ href, label, icon: Icon }, i) => (
                        <Link
                            key={href}
                            href={href}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-3 px-3 py-3 text-sm text-black/80 dark:text-white/80
                                hover:bg-black/5 dark:hover:bg-white/5
                                hover:text-black dark:hover:text-white
                                transition-colors duration-150"
                            style={{
                                animationDelay: `${i * 50}ms`,
                            }}
                        >
                            <Icon size={16} strokeWidth={1.5} className="shrink-0 opacity-60" />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Sidebar footer — cart */}
                <div className="px-6 py-5 border-t border-black/10 dark:border-white/10">
                    <Link
                        href="/cart"
                        onClick={() => setSidebarOpen(false)}
                        className="flex items-center justify-between w-full
                            text-sm text-black dark:text-white
                            hover:opacity-70 transition-opacity"
                    >
                        <div className="flex items-center gap-2">
                            <ShoppingCart size={16} strokeWidth={1.5} />
                            <span>Cart</span>
                        </div>
                        <span className="bg-black dark:bg-white text-white dark:text-black text-xs font-medium rounded-full min-w-[20px] h-5 flex items-center justify-center px-1.5">
                            {count > 99 ? '99+' : count}
                        </span>
                    </Link>
                </div>
            </aside>
        </>
    );
}