import { Product } from '@/types';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[];
    title?: string;
    cols?: 2 | 3 | 4;
}

export default function ProductGrid({ products, title, cols = 4 }: ProductGridProps) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-black dark:text-white">No products found</p>
            </div>
        );
    }

    const colClasses = {
        2: 'grid-cols-2 sm:grid-cols-2',
        3: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    };

    return (
        <div className=" mx-auto md:px-4  py-12">
            {title && (
                <h2 className="text-2xl text-center font-bold text-black dark:text-white mb-6">
                    {title}
                </h2>
            )}
            <div className={`grid ${colClasses[cols]} gap-4`}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}