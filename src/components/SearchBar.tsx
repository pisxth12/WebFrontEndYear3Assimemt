// SearchBar.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchBar() {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-focus when mobile search opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Handle escape key to close mobile search
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
                setSearch('');
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    // Prevent body scroll when mobile search is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            router.push(`/products?q=${encodeURIComponent(search.trim())}`);
            setIsOpen(false);
            setSearch('');
        }
    };

    const handleClear = () => {
        setSearch('');
        inputRef.current?.focus();
    };

    return (
        <>
            {/* Mobile: Search Icon Button */}
            <div className="md:hidden">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity duration-200 text-black dark:text-white"
                    aria-label="Open search"
                >
                    <Search size={18} strokeWidth={1.5} />
                </button>
            </div>

            {/* Desktop: Full Search Bar */}
            <div className="hidden md:block w-full">
                <form onSubmit={handleSubmit} className="w-full group">
                    <div className="relative">
                        <Search 
                            size={16} 
                            className="absolute left-0 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 group-focus-within:text-black dark:group-focus-within:text-white transition-colors duration-200" 
                            strokeWidth={1.5}
                        />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-6 pr-8 py-2 bg-transparent border-b border-black/20 dark:border-white/20 focus:border-black dark:focus:border-white outline-none transition-all duration-200 text-sm text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                            aria-label="Search products"
                        />
                        {search && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="absolute right-0 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors duration-200"
                                aria-label="Clear search"
                            >
                                <X size={14} strokeWidth={1.5} />
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-50 md:hidden"
                    style={{ animation: 'fadeIn 0.2s ease-out' }}
                >
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/50"
                        onClick={() => {
                            setIsOpen(false);
                            setSearch('');
                        }}
                    />
                    
                    {/* Search Panel */}
                    <div 
                        className="relative bg-white dark:bg-black border-b border-black/10 dark:border-white/10"
                        style={{ animation: 'slideDown 0.25s ease-out' }}
                    >
                        <form onSubmit={handleSubmit} className="flex items-center px-4 py-3 gap-3">
                            <button 
                                type="submit" 
                                className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200"
                                aria-label="Submit search"
                            >
                                <Search size={20} strokeWidth={1.5} />
                            </button>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 py-2 bg-transparent outline-none text-base text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40"
                                aria-label="Search products"
                                autoFocus
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors duration-200"
                                    aria-label="Clear search"
                                >
                                    <X size={18} strokeWidth={1.5} />
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setIsOpen(false);
                                    setSearch('');
                                }}
                                className="text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors duration-200"
                            >
                                Cancel
                            </button>
                        </form>
                        
                        {/* Optional: Recent searches or suggestions */}
                        {!search && (
                            <div className="px-4 py-6 text-center">
                                <p className="text-sm text-black/40 dark:text-white/40">
                                    Try searching for "shirt", "jacket", or "accessories"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideDown {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(0); }
                }
            `}</style>
        </>
    );
}