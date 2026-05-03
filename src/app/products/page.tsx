// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts } from '@/lib/actions/product.serve';
import ProductCard from '@/src/components/ProductCard';
import ProductGrid from '@/src/components/ProductGrid';

export default function ProductPage() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('q') || '';
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const data = await getProducts({ search: searchQuery });
            setProducts(data || []);
            console.log(data,"data");
            setLoading(false);
        };
        loadProducts();
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <div className="border-b border-black/10 dark:border-white/10">
                <div className="ma mx-auto px-4 py-12 md:py-16">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black dark:text-white mb-3">
                        {searchQuery ? `Search results for "${searchQuery}"` : 'Products'}
                    </h1>
                    <p className="text-black/60 dark:text-white/60 text-base max-w-md">
                        {products.length} {products.length === 1 ? 'item' : 'items'}
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className=" mx-auto px-4 py-8">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-square border border-black/10 dark:border-white/10 animate-pulse bg-black/5 dark:bg-white/5" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-black/60 dark:text-white/60 text-lg">
                            No products found
                        </p>
                        {searchQuery && (
                            <p className="text-black/40 dark:text-white/40 text-sm mt-2">
                                Try searching for something else
                            </p>
                        )}
                    </div>
                ) : (
                    <ProductGrid products={products} />
                )}
            </div>
        </div>
    );
}