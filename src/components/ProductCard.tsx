import { Product } from '@/types';
import Link from 'next/link';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link 
            href={`/products/${product.slug || product.id}`}
            className="block bg-white dark:bg-black border border-black dark:border-white group"
        >
            <div className="relative aspect-square overflow-hidden bg-white dark:bg-black">
                <img
                    src={product.image || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {product.sale_price && (
                    <span className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1">
                        SALE
                    </span>
                )}
            </div>
            
            <div className="p-4">
                <h3 className="font-medium text-base mb-1 text-black dark:text-white">
                    {product.name}
                </h3>
                
                <div className="flex items-center gap-2">
                    {product.sale_price ? (
                        <>
                            <span className="text-black dark:text-white font-bold">
                                ${product.sale_price}
                            </span>
                            <span className="text-black/50 dark:text-white/50 line-through text-sm">
                                ${product.price}
                            </span>
                        </>
                    ) : (
                        <span className="text-black dark:text-white font-bold">
                            ${product.price}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}