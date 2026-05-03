import { createOrder } from '@/lib/actions/orders.server';
import { getCart } from '@/lib/actions/cart.server';
import { redirect } from 'next/navigation';
import { ArrowRight, Package } from 'lucide-react';

export default async function CheckoutPage() {
    const cart = await getCart();

    if (cart.length === 0) redirect('/cart');

    const subtotal = cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

                {/* Heading */}
                <h1
                    className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-10"
                    style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.025em' }}
                >
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

                    {/* ── Left: Shipping form ── */}
                    <div>
                        <h2
                            className="text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-8"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Shipping Information
                        </h2>

                        <form action={createOrder} className="flex flex-col gap-6">

                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="customer_name"
                                    className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    Full Name <span className="text-black/30 dark:text-white/30">*</span>
                                </label>
                                <input
                                    id="customer_name"
                                    type="text"
                                    name="customer_name"
                                    required
                                    placeholder="John Doe"
                                    className="w-full border-b border-black/20 dark:border-white/20
                                        bg-transparent
                                        text-sm text-black dark:text-white
                                        placeholder:text-black/20 dark:placeholder:text-white/20
                                        py-2.5 outline-none
                                        focus:border-black dark:focus:border-white
                                        transition-colors duration-200"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="customer_phone"
                                    className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    Phone Number <span className="text-black/30 dark:text-white/30">*</span>
                                </label>
                                <input
                                    id="customer_phone"
                                    type="tel"
                                    name="customer_phone"
                                    required
                                    placeholder="+855 12 345 678"
                                    className="w-full border-b border-black/20 dark:border-white/20
                                        bg-transparent
                                        text-sm text-black dark:text-white
                                        placeholder:text-black/20 dark:placeholder:text-white/20
                                        py-2.5 outline-none
                                        focus:border-black dark:focus:border-white
                                        transition-colors duration-200"
                                />
                            </div>

                            {/* Address */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="shipping_address"
                                    className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    Shipping Address <span className="text-black/30 dark:text-white/30">*</span>
                                </label>
                                <textarea
                                    id="shipping_address"
                                    name="shipping_address"
                                    required
                                    rows={3}
                                    placeholder="Street, City, Province"
                                    className="w-full border-b border-black/20 dark:border-white/20
                                        bg-transparent resize-none
                                        text-sm text-black dark:text-white
                                        placeholder:text-black/20 dark:placeholder:text-white/20
                                        py-2.5 outline-none
                                        focus:border-black dark:focus:border-white
                                        transition-colors duration-200"
                                />
                            </div>

                            {/* Payment method */}
                            <div className="flex flex-col gap-3">
                                <label
                                    className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50"
                                    style={{ fontFamily: "'Georgia', serif" }}
                                >
                                    Payment Method <span className="text-black/30 dark:text-white/30">*</span>
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { value: 'cod', label: 'Cash on\nDelivery' },
                                        { value: 'bank', label: 'Bank\nTransfer' },
                                        { value: 'aba', label: 'ABA\nPay' },
                                    ].map(({ value, label }) => (
                                        <label
                                            key={value}
                                            className="relative flex flex-col items-center justify-center
                                                border border-black/15 dark:border-white/15
                                                hover:border-black dark:hover:border-white
                                                cursor-pointer py-3 px-2 gap-1
                                                transition-colors duration-200
                                                has-[:checked]:border-black dark:has-[:checked]:border-white
                                                has-[:checked]:bg-black/5 dark:has-[:checked]:bg-white/5"
                                        >
                                            <input
                                                type="radio"
                                                name="payment_method"
                                                value={value}
                                                defaultChecked={value === 'cod'}
                                                className="sr-only"
                                            />
                                            {label.split('\n').map((line, i) => (
                                                <span
                                                    key={i}
                                                    className="text-[10px] uppercase tracking-widest text-black/60 dark:text-white/60 text-center leading-tight"
                                                    style={{ fontFamily: "'Georgia', serif" }}
                                                >
                                                    {line}
                                                </span>
                                            ))}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="group/btn relative w-full h-12 overflow-hidden mt-2
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
                                    Place Order
                                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                                </span>
                            </button>

                        </form>
                    </div>

                    {/* ── Right: Order summary ── */}
                    <div className="border border-black/10 dark:border-white/10 p-6 lg:sticky lg:top-24">

                        <h2
                            className="text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-6"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Order Summary · {itemCount} {itemCount === 1 ? 'item' : 'items'}
                        </h2>

                        {/* Items list */}
                        <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8 mb-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 py-4 items-center">
                                    <div className="w-14 h-14 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/8 dark:border-white/8">
                                        {item.product_image ? (
                                            <img
                                                src={item.product_image}
                                                alt={item.product_name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package size={16} className="text-black/20 dark:text-white/20" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className="text-sm font-medium text-black dark:text-white truncate"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            {item.product_name}
                                        </p>
                                        <p className="text-[11px] uppercase tracking-wider text-black/35 dark:text-white/35 mt-0.5"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            ${item.product_price} × {item.quantity}
                                        </p>
                                    </div>
                                    <span
                                        className="text-sm font-semibold text-black dark:text-white shrink-0"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        ${(item.product_price * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="flex flex-col gap-3 border-t border-black/10 dark:border-white/10 pt-5">
                            <div className="flex justify-between text-sm text-black/50 dark:text-white/50">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-black/50 dark:text-white/50">
                                <span>Shipping</span>
                                <span className="italic text-black/30 dark:text-white/30">TBD</span>
                            </div>
                            <div className="flex justify-between items-baseline pt-3 border-t border-black/10 dark:border-white/10">
                                <span
                                    className="text-[11px] uppercase tracking-widest text-black/50 dark:text-white/50"
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
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}