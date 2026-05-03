// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getProducts } from '@/lib/actions/product.serve';
import ProductGrid from '@/src/components/ProductGrid';
import FilterModal from '@/src/components/FilterModal';
import { getBrands } from '@/lib/actions/brand.serve';
import { getCategories } from '@/lib/actions/category.serve';
import { Filter } from 'lucide-react';
import { Brand, Category } from '@/types';

export default function ProductPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const searchQuery = searchParams.get('q') || '';
    const categoryFromUrl = searchParams.get('category');
    const brandFromUrl = searchParams.get('brand');
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilter, setShowFilter] = useState(false);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | string>(categoryFromUrl || '');
    const [selectedBrand, setSelectedBrand] = useState<number | string>(brandFromUrl || '');

    // Update URL when filters change
    const updateUrlFilters = (category: number | string, brand: number | string) => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (category) params.set('category', String(category));
        if (brand) params.set('brand', String(brand));
        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    const handleCategoryChange = (value: number | string) => {
        setSelectedCategory(value);
        updateUrlFilters(value, selectedBrand);
    };

    const handleBrandChange = (value: number | string) => {
        setSelectedBrand(value);
        updateUrlFilters(selectedCategory, value);
    };

    const clearFilters = () => {
        setSelectedCategory('');
        setSelectedBrand('');
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        router.push(`/products?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [productsData, brandsData, categoriesData] = await Promise.all([
                getProducts({ 
                    search: searchQuery,
                    category_id: selectedCategory ? Number(selectedCategory) : undefined,
                    brand_id: selectedBrand ? Number(selectedBrand) : undefined
                }),
                getBrands(),
                getCategories()
            ]);
            setProducts(productsData || []);
            setBrands(brandsData || []);
            setCategories(categoriesData || []);
            setLoading(false);
        };
        loadData();
    }, [searchQuery, selectedCategory, selectedBrand]);

    const hasFilters = selectedCategory || selectedBrand;

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Hero Section */}
            <div className="border-b border-black/10 dark:border-white/10">
                <div className=" mx-auto px-4 py-12 md:py-16">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight text-black dark:text-white mb-3">
                                {searchQuery ? `Search results for "${searchQuery}"` : 'Products'}
                            </h1>
                            <p className="text-black/60 dark:text-white/60 text-base">
                                {products.length} {products.length === 1 ? 'item' : 'items'}
                            </p>
                            {hasFilters && (
                                <div className="flex gap-2 mt-3">
                                    {selectedCategory && (
                                        <span className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 rounded">
                                            Category: {categories.find(c => c.id == selectedCategory)?.name}
                                        </span>
                                    )}
                                    {selectedBrand && (
                                        <span className="text-xs px-2 py-1 bg-black/5 dark:bg-white/5 rounded">
                                            Brand: {brands.find(b => b.id == selectedBrand)?.name}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        
                        <button 
                            onClick={() => setShowFilter(true)}
                            className="flex items-center gap-2 px-4 py-2 border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition"
                        >
                            <Filter size={16} />
                            Filter
                            {hasFilters && (
                                <span className="w-2 h-2 bg-black dark:bg-white rounded-full"></span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <div className=" mx-auto px-4 py-8">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-square border border-black/10 dark:border-white/10 animate-pulse bg-black/5 dark:bg-white/5" />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-16">
                        <p className="text-black/60 dark:text-white/60 text-lg">
                            No products found
                        </p>
                        {hasFilters && (
                            <button 
                                onClick={clearFilters}
                                className="mt-4 text-sm underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                ) : (
                    <ProductGrid products={products} />
                )}
            </div>

            {/* Filter Modal */}
            <FilterModal
                isOpen={showFilter}
                onClose={() => setShowFilter(false)}
                brands={brands}
                categories={categories}
                selectedCategory={selectedCategory}
                selectedBrand={selectedBrand}
                onCategoryChange={handleCategoryChange}
                onBrandChange={handleBrandChange}
                onClear={clearFilters}
            />
        </div>
    );
}