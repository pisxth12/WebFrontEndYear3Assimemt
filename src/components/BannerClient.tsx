'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

interface BannerItem {
    title: string;
    subtitle?: string | null;
    button_text?: string | null;
    image_url?: string;
    url?: string;
}

interface BannerClientProps {
    banners: BannerItem[];
}

export default function BannerClient({ banners }: BannerClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const next = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }, [banners.length]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || banners.length <= 1) return;

        let cooldown = false;

        const onWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        if (cooldown) return;
        cooldown = true;
        setTimeout(() => (cooldown = false), 600);

        if (e.deltaX > 0) {
            next();
        } else if (e.deltaX < 0) {
            prev();
        }
    }

        };

        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [next, prev, banners.length]);

    if (banners.length === 0) return null;

    const currentBanner = banners[currentIndex];

    return (
        <div
            ref={containerRef}
            className="relative group mb-8"
            style={{ height: '420px' }}
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                style={
                    currentBanner.image_url
                        ? { backgroundImage: `url(${currentBanner.image_url})` }
                        : { background: 'linear-gradient(135deg, #1e293b, #0f172a)' }
                }
            >
                <div className="absolute inset-0 bg-black/50 dark:bg-black/60" />
            </div>

            {/* Content — bottom left */}
            <div className="relative z-10 flex flex-col items-start justify-end h-full text-left px-10 pb-12">
                <h1
                    className="text-3xl md:text-5xl font-bold mb-2 text-white drop-shadow-lg"
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.02em' }}
                >
                    {currentBanner.title}
                </h1>
                {currentBanner.subtitle && (
                    <p
                        className="text-sm md:text-base mb-6 text-gray-300 dark:text-gray-400 max-w-md leading-relaxed"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {currentBanner.subtitle}
                    </p>
                )}
                {currentBanner.button_text && (
                    <a
                        href={currentBanner.url || '/'}
                        className="group/btn relative inline-flex items-center gap-3 overflow-hidden
                            border border-white/80 hover:border-white text-white text-sm uppercase
                            px-7 py-3 transition-all duration-300"
                        style={{ fontFamily: "'Georgia', serif", letterSpacing: '0.15em' }}
                    >
                        {/* Slide-in fill on hover */}
                        <span className="absolute inset-0 bg-white -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-gray-900">
                            {currentBanner.button_text}
                        </span>
                        <svg
                            className="relative z-10 w-4 h-4 transition-all duration-300 group-hover/btn:text-gray-900 group-hover/btn:translate-x-1"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                )}
            </div>

            {/* Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-20
                            bg-black/40 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20
                            text-white w-10 h-10 rounded-full flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={next}
                        aria-label="Next"
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-20
                            bg-black/40 hover:bg-black/70 dark:bg-white/10 dark:hover:bg-white/20
                            text-white w-10 h-10 rounded-full flex items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dots */}
            {banners.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            aria-label={`Go to banner ${i + 1}`}
                            className={`w-2 h-2 transition-all duration-300 ${
                                i === currentIndex ? 'bg-white w-4' : 'bg-white/40 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}