import { getCart } from '@/lib/actions/cart.server';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { clearCartItems, removeCartItem } from './actions';

export default async function CartPage() {
    const cart = await getCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
                <div className="text-center flex flex-col items-center gap-6">
                    <ShoppingBag size={40} strokeWidth={1} className="text-black/20 dark:text-white/20" />
                    <div>
                        <h1
                            className="text-2xl font-bold text-black dark:text-white mb-2"
                            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                        >
                            Your cart is empty
                        </h1>
                        <p className="text-sm text-black/40 dark:text-white/40">
                            Looks like you haven't added anything yet.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="group/btn relative inline-flex items-center gap-3 overflow-hidden
                            border border-black dark:border-white
                            text-black dark:text-white
                            text-xs uppercase tracking-widest px-8 py-3
                            transition-colors duration-200"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        <span className="absolute inset-0 bg-black dark:bg-white
                            translate-y-full group-hover/btn:translate-y-0
                            transition-transform duration-300 ease-out" />
                        <span className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors duration-300">
                            Browse Products
                        </span>
                        <ArrowRight size={13} className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors duration-300 group-hover/btn:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        );
    }

    const subtotal = cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

                {/* Page heading */}
                <div className="flex items-baseline justify-between mb-10">
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-black dark:text-white"
                        style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.025em' }}
                    >
                        Cart
                        <span className="ml-2 text-lg font-normal text-black/30 dark:text-white/30">
                            ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                        </span>
                    </h1>
                    <form action={clearCartItems}>
                        <button
                            type="submit"
                            className="text-[11px] uppercase tracking-widest text-black/35 dark:text-white/35
                                hover:text-red-500 dark:hover:text-red-400
                                transition-colors duration-200"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Clear all
                        </button>
                    </form>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">

                    {/* ── Left: Cart items ── */}
                    <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8 border-t border-black/8 dark:border-white/8">
                        {cart.map((item) => (
                            <Link href={`/products/${item.slug}`} key={item.id} className="flex gap-5 py-6 items-start">

                                {/* Image */}
                                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/8 dark:border-white/8">
                                    {item.product_image ? (
                                        <img
                                            src={item.product_image}
                                            alt={item.product_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-black/20 dark:text-white/20 text-lg">✦</div>
                                    )}
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h3
                                        className="text-sm sm:text-base font-semibold text-black dark:text-white leading-snug mb-1 truncate"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        {item.product_name}
                                    </h3>
                                    <p
                                        className="text-xs uppercase tracking-widest text-black/35 dark:text-white/35 mb-3"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        ${item.product_price} × {item.quantity}
                                    </p>
                                </div>

                                {/* Right: subtotal + delete */}
                                <div className="flex flex-col items-end gap-3 shrink-0">
                                    <span
                                        className="text-sm sm:text-base font-bold text-black dark:text-white"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        ${(item.product_price * item.quantity).toFixed(2)}
                                    </span>
                                    <form action={removeCartItem}>
                                        <input type="hidden" name="id" value={item.id} />
                                        <button
                                            type="submit"
                                            className="text-black/25 dark:text-white/25 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                                            aria-label="Remove item"
                                        >
                                            <Trash2 size={15} strokeWidth={1.5} />
                                        </button>
                                    </form>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* ── Right: Order summary ── */}
                    <div className="border border-black/10 dark:border-white/10 p-6 lg:sticky lg:top-24">
                        <h2
                            className="text-xs uppercase tracking-widest text-black/40 dark:text-white/40 mb-6"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Order Summary
                        </h2>

                        <div className="flex flex-col gap-3 mb-6">
                            <div className="flex justify-between text-sm text-black/60 dark:text-white/60">
                                <span>Subtotal ({itemCount} items)</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-black/60 dark:text-white/60">
                                <span>Shipping</span>
                                <span className="text-black/35 dark:text-white/35 italic">At checkout</span>
                            </div>
                        </div>

                        <div className="border-t border-black/10 dark:border-white/10 pt-4 mb-6 flex justify-between items-baseline">
                            <span
                                className="text-xs uppercase tracking-widest text-black/50 dark:text-white/50"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Total
                            </span>
                            <span
                                className="text-2xl font-bold text-black dark:text-white"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                            >
                                ${subtotal.toFixed(2)}
                            </span>
                        </div>

                        <Link href="/checkout">
                            <button
                                className="group/btn relative w-full h-12 overflow-hidden
                                    border border-black dark:border-white
                                    text-black dark:text-white
                                    transition-colors duration-200"
                            >
                                <span className="absolute inset-0 bg-black dark:bg-white
                                    translate-y-full group-hover/btn:translate-y-0
                                    transition-transform duration-300 ease-out" />
                                <span
                                    className="relative z-10 flex items-center justify-center gap-2
                                        text-xs uppercase tracking-widest
                                        group-hover/btn:text-white dark:group-hover/btn:text-black
                                        transition-colors duration-300"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    Checkout
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                                </span>
                            </button>
                        </Link>

                        <Link
                            href="/products"
                            className="block text-center mt-4 text-[11px] uppercase tracking-widest
                                text-black/35 dark:text-white/35 hover:text-black dark:hover:text-white
                                transition-colors duration-200"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Continue Shopping
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}