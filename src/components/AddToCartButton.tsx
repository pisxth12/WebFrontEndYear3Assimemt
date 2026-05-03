'use client';

import { useState, useTransition } from 'react';
import { addToCart } from '@/lib/actions/cart.server';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
    productId: number;
    productName: string;
    stock: number;
}

export default function AddToCartButton({ productId, productName, stock }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const [isPending, startTransition] = useTransition();

    const handleAddToCart = () => {
        if (stock === 0) {
            toast.error('Out of stock');
            return;
        }

        if (quantity > stock) {
            toast.error(`Only ${stock} available`);
            return;
        }

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
        <div>
            {/* Quantity selector */}
            <div className="flex items-center gap-3 mb-4">
                <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 border rounded"
                >
                    -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                    type="button"
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    className="px-3 py-1 border rounded"
                >
                    +
                </button>
                <span className="text-sm text-gray-500">({stock} available)</span>
            </div>

            <button
                onClick={handleAddToCart}
                disabled={isPending || stock === 0}
                className="w-full py-3 bg-black text-white rounded-lg"
            >
                {isPending ? 'Adding...' : `Add ${quantity > 1 ? `(${quantity})` : ''}`}
            </button>
        </div>
    );
}