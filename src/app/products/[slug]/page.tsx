import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { getProductBySlug } from '@/lib/actions/product.serve';
import { ProductDetail } from '@/types';
import AddToCartButton from '@/src/components/AddToCartButton';
import RelatedProducts from '@/src/components/RelatedProducts';

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product: ProductDetail = await getProductBySlug(slug);

    if (!product) notFound();

    const price = product.sale_price || product.price;
    const hasDiscount = product.sale_price && product.sale_price !== product.price;

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className=" mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-16">

                {/* Back link */}
                <Link
                    href="/products"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest
                        text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white
                        transition-colors duration-200 mb-10 group"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    <ChevronLeft
                        size={14}
                        className="transition-transform duration-200 group-hover:-translate-x-0.5"
                    />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20">

                    {/* ── Image column ── */}
                    <div className="relative">
                        {/* Subtle background accent */}
                        <div className="absolute -inset-3 bg-black/[0.02] dark:bg-white/[0.03] -z-10" />

                        <div className="aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/8 dark:border-white/8">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-black/20 dark:text-white/20">
                                    <span className="text-4xl">✦</span>
                                    <span className="text-xs uppercase tracking-widest">No image</span>
                                </div>
                            )}
                        </div>

                        {/* Sale badge */}
                        {hasDiscount && (
                            <div className="absolute top-4 left-4 bg-black dark:bg-white text-white dark:text-black
                                text-[10px] uppercase tracking-widest px-3 py-1"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Sale
                            </div>
                        )}
                    </div>

                    {/* ── Info column ── */}
                    <div className="flex flex-col gap-0 pt-2">

                        {/* Category + Brand breadcrumb */}
                        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-black/35 dark:text-white/35 mb-5"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            {product.category && <span>{product.category.name}</span>}
                            {product.category && product.brand && <span>·</span>}
                            {product.brand && <span>{product.brand.name}</span>}
                        </div>

                        {/* Product name */}
                        <h1
                            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white leading-tight mb-6"
                            style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: '-0.025em' }}
                        >
                            {product.name}
                        </h1>

                        {/* Divider */}
                        <div className="w-12 h-px bg-black/20 dark:bg-white/20 mb-6" />

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-8">
                            <span
                                className="text-3xl sm:text-4xl font-bold text-black dark:text-white"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                            >
                                ${parseFloat(price).toFixed(2)}
                            </span>
                            {hasDiscount && (
                                <span className="text-base text-black/30 dark:text-white/30 line-through">
                                    ${parseFloat(product.price).toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Stock status */}
                        <div className="flex items-center gap-2 mb-8">
                            <span className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-400'}`} />
                            <span className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>

                        {/* Description */}
                        {product.description && (
                            <div className="border-t border-black/8 dark:border-white/8 pt-6 mb-8">
                                <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed break-words">
                                    {product.description}
                                </p>
                            </div>
                        )}

                        {/* Add to cart */}
                        <div className="mt-auto">
                            <AddToCartButton
                                productId={product.id}
                                productName={product.name}
                                stock={product.stock}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Related */}
            <div className="border-t  border-black/8 dark:border-white/8">
                <h2 className='mt-5 px-4'>You may also like...</h2>
                <RelatedProducts productId={product.id} />
            </div>
        </div>
    );
}