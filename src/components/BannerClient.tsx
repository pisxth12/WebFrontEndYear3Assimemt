'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

    if (banners.length === 1) {
        const banner = banners[0];
        return (
            <div 
                className="relative h-96 bg-cover bg-center rounded-lg mb-8"
                style={banner.image_url ? { backgroundImage: `url(${banner.image_url})` } : { backgroundColor: '#1f2937' }}
            >
                {banner.image_url && <div className="absolute inset-0 bg-black/50 rounded-lg"></div>}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">{banner.title}</h1>
                    {banner.subtitle && <p className="text-lg md:text-xl mb-4 text-gray-200">{banner.subtitle}</p>}
                    {banner.button_text && (
                        <button 
                            onClick={() => window.location.href = banner.url || '/'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            {banner.button_text}
                        </button>
                    )}
                </div>
            </div>
        );
    }

    const currentBanner = banners[currentIndex];

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    return (
        <div className="relative group mb-8">
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
                <ChevronLeft />
            </button>

            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full opacity-0 group-hover:opacity-100 transition"
            >
                <ChevronRight />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {banners.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2 h-2 rounded-full transition ${
                            i === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>

            <div 
                className="h-96 rounded-lg overflow-hidden relative bg-cover bg-center transition-all duration-500"
                style={currentBanner.image_url ? { backgroundImage: `url(${currentBanner.image_url})` } : { backgroundColor: '#1f2937' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">{currentBanner.title}</h1>
                    {currentBanner.subtitle && (
                        <p className="text-lg md:text-xl mb-4 text-gray-200">{currentBanner.subtitle}</p>
                    )}
                    {currentBanner.button_text && (
                        <button 
                            onClick={() => window.location.href = currentBanner.url || '/'}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                        >
                            {currentBanner.button_text}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}