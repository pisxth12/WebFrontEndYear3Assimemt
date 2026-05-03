'use client';

import { X } from 'lucide-react';

interface FilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    brands: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    selectedCategory: number | string;
    selectedBrand: number | string;
    onCategoryChange: (value: number | string) => void;
    onBrandChange: (value: number | string) => void;
    onClear: () => void;
}

export default function FilterModal({
    isOpen,
    onClose,
    brands,
    categories,
    selectedCategory,
    selectedBrand,
    onCategoryChange,
    onBrandChange,
    onClear,
}: FilterModalProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-black border-l border-black/10 dark:border-white/10 z-50 shadow-xl overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-black/10 dark:border-white/10">
                    <h2 className="text-xl font-semibold text-black dark:text-white">Filters</h2>
                    <button 
                        onClick={onClose}
                        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Categories */}
                    <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Category
                        </label>
                        <select
                            value={selectedCategory}
                            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : '')}
                            className="w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        >
                            <option value="">All Categories</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Brands */}
                    <div>
                        <label className="block text-sm font-medium text-black dark:text-white mb-2">
                            Brand
                        </label>
                        <select
                            value={selectedBrand}
                            onChange={(e) => onBrandChange(e.target.value ? Number(e.target.value) : '')}
                            className="w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white"
                        >
                            <option value="">All Brands</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-white dark:bg-black p-6 border-t border-black/10 dark:border-white/10">
                    <div className="flex gap-3">
                        <button
                            onClick={onClear}
                            className="flex-1 px-4 py-2 border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 transition"
                        >
                            Clear All
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}