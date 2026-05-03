'use client';

import { useState, useTransition } from 'react';
import { addToCart } from '@/lib/actions/cart.server';
import toast from 'react-hot-toast';
import { Minus, Plus, ShoppingCart, Loader2 } from 'lucide-react';

interface AddToCartButtonProps {
    productId: number;
    productName: string;
    stock: number;
}

export default function AddToCartButton({ productId, productName, stock }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();
    const outOfStock = stock === 0;

    const handleAddToCart = () => {
        if (outOfStock) { toast.error('Out of stock'); return; }
        if (quantity > stock) { toast.error(`Only ${stock} available`); return; }

        startTransition(async () => {
            const result = await addToCart(productId, quantity);
            if (result.success) {
                toast.success(`${quantity} × ${productName} added`);
                setQuantity(1);
            } else {
                toast.error('Failed to add');
            }
        });
    };

    return (
        <div className="flex flex-col gap-4">

            {/* Quantity row */}
            <div className="flex items-center gap-4">
                <div className="flex items-center border border-black/15 dark:border-white/15">
                    <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1 || outOfStock}
                        className="w-10 h-10 flex items-center justify-center
                            text-black/50 dark:text-white/50
                            hover:text-black dark:hover:text-white
                            hover:bg-black/5 dark:hover:bg-white/5
                            disabled:opacity-25 disabled:cursor-not-allowed
                            transition-colors duration-150"
                    >
                        <Minus size={13} strokeWidth={2} />
                    </button>

                    <span
                        className="w-10 text-center text-sm font-medium text-black dark:text-white select-none"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {quantity}
                    </span>

                    <button
                        type="button"
                        onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                        disabled={quantity >= stock || outOfStock}
                        className="w-10 h-10 flex items-center justify-center
                            text-black/50 dark:text-white/50
                            hover:text-black dark:hover:text-white
                            hover:bg-black/5 dark:hover:bg-white/5
                            disabled:opacity-25 disabled:cursor-not-allowed
                            transition-colors duration-150"
                    >
                        <Plus size={13} strokeWidth={2} />
                    </button>
                </div>

                <span
                    className="text-xs uppercase tracking-widest text-black/35 dark:text-white/35"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {outOfStock ? 'Unavailable' : `${stock} available`}
                </span>
            </div>

            {/* Add to cart button */}
            <button
                onClick={handleAddToCart}
                disabled={isPending || outOfStock}
                className="group/btn relative w-full h-12 overflow-hidden
                    border border-black dark:border-white
                    text-black dark:text-white
                    disabled:border-black/20 dark:disabled:border-white/20
                    disabled:cursor-not-allowed
                    transition-colors duration-200"
            >
                {/* Hover fill */}
                {!outOfStock && (
                    <span className="absolute inset-0 bg-black dark:bg-white
                        translate-y-full group-hover/btn:translate-y-0
                        transition-transform duration-300 ease-out" />
                )}

                <span className="relative z-10 flex items-center justify-center gap-2.5
                    text-xs uppercase tracking-widest
                    group-hover/btn:text-white dark:group-hover/btn:text-black
                    disabled:text-black/30 dark:disabled:text-white/30
                    transition-colors duration-300"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    {isPending ? (
                        <>
                            <Loader2 size={13} className="animate-spin" />
                            Adding…
                        </>
                    ) : outOfStock ? (
                        'Out of Stock'
                    ) : (
                        <>
                            <ShoppingCart size={13} strokeWidth={1.5} />
                            Add to Cart{quantity > 1 ? ` (${quantity})` : ''}
                        </>
                    )}
                </span>
            </button>
        </div>
    );
}