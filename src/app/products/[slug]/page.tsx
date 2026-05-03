import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getProductBySlug } from '@/lib/actions/product.serve';
import { ProductDetail } from '@/types';
import AddToCartButton from '@/src/components/AddToCartButton';

export default async function ProductDetailPage({ 
    params 
}: { 
    params: Promise<{ slug: string }> 
}) {
    const { slug } = await params;
    const product:ProductDetail = await getProductBySlug(slug);
    
    if (!product) notFound();

    const price = product.sale_price || product.price;


    

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                <Link 
                    href="/products" 
                    className="inline-flex items-center gap-2 text-sm sm:text-base text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white mb-6 sm:mb-8"
                >
                    <ChevronLeft size={18} />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                    {/* Image */}
                    <div className="aspect-square bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
                        {product.image ? (
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-black/30">
                                No image
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-3 sm:space-y-4">
                        {product.category && (
                            <p className="text-xs sm:text-sm uppercase text-black/40 dark:text-white/40">
                                {product.category.name}
                            </p>
                        )}
                        
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white">
                            {product.name}
                        </h1>
                        
                        {product.brand && (
                            <p className="text-sm sm:text-base text-black/40 dark:text-white/40">
                                {product.brand.name}
                            </p>
                        )}
                        
                        <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                            ${parseFloat(price).toFixed(2)}
                        </p>
                        
                        {product.description && (
                            <div className="border-t border-black/10 dark:border-white/10 pt-4 sm:pt-6 mt-2 sm:mt-4">
                                <p className="text-sm sm:text-base text-black/60 dark:text-white/60 leading-relaxed break-words">
                                    {product.description}
                                </p>
                            </div>
                        )}
                        
                        <AddToCartButton
                            productId={product.id}
                            productName={product.name}
                            stock={product.stock}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}