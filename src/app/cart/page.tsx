import { getCart, removeFromCart } from '@/lib/actions/cart.server';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { clearCartItems, removeCartItem } from './actions';

export default async function CartPage() {
    const cart = await getCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl mb-4">Cart is empty</h1>
                    <Link href="/products" className="bg-black text-white px-6 py-2 rounded-lg">
                        Shop Now
                    </Link>
                </div>
            </div>
        );
    }

    const total = cart.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <div className="max-w-4xl mx-auto p-8">
                <div className='flex justify-between items-center mb-6'>
                    <h1 className="text-2xl font-bold">Cart ({cart.length})</h1>
                    <form action={clearCartItems}>
                        <button type="submit" className="text-red-500 text-sm hover:text-red-600">
                            Clear Cart
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-white dark:bg-black border rounded-lg p-4 items-center">
                            {item.product_image && (
                                <img 
                                    src={item.product_image} 
                                    alt={item.product_name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            )}
                            <div className="flex-1">
                                <h3 className="font-medium">{item.product_name}</h3>
                                <p className="text-sm text-gray-500">
                                    ${item.product_price} x {item.quantity}
                                </p>
                            </div>
                            <div className="font-bold">
                                ${(item.product_price * item.quantity).toFixed(2)}
                            </div>
                            <form action={removeCartItem}>
                                <input type="hidden" name="id" value={item.id} />
                                <button type="submit" className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </form>
                        </div>
                    ))}
                </div>

                {/* Order Summary & Checkout */}
                <div className="mt-8 bg-white dark:bg-black border rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                    </div>
                    <Link href="/checkout">
                        <button className="w-full bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:opacity-90 transition">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}