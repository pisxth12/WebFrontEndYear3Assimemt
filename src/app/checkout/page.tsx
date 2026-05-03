import { createOrder } from '@/lib/actions/orders.server';
import { getCart } from '@/lib/actions/cart.server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function CheckoutPage() {
    const cart = await getCart();

    if (cart.length === 0) {
        redirect('/cart');
    }

    const total = cart.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);

    return (
        <div className="min-h-screen bg-white dark:bg-black p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-8">Checkout</h1>
                
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Cart Items - Left */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                        {cart.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b pb-4">
                                <img 
                                    src={item.product_image} 
                                    alt={item.product_name}
                                    className="w-16 h-16 object-cover"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium">{item.product_name}</h3>
                                    <p className="text-sm text-gray-500">
                                        ${item.product_price} x {item.quantity}
                                    </p>
                                </div>
                                <div className="font-bold">
                                    ${(item.product_price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                        <div className="pt-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form - Right */}
                    <div>
                        <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                        <form action={createOrder} className="space-y-4">
                            <div>
                                <label className="block mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    name="customer_name"
                                    required
                                    className="w-full border p-2 rounded dark:bg-black dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="customer_phone"
                                    required
                                    className="w-full border p-2 rounded dark:bg-black dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Shipping Address *</label>
                                <textarea
                                    name="shipping_address"
                                    required
                                    rows={3}
                                    className="w-full border p-2 rounded dark:bg-black dark:border-gray-700"
                                />
                            </div>

                            <div>
                                <label className="block mb-1">Payment Method *</label>
                                <select
                                    name="payment_method"
                                    className="w-full border p-2 rounded dark:bg-black dark:border-gray-700"
                                >
                                    <option value="cod">Cash on Delivery</option>
                                    <option value="bank">Bank Transfer</option>
                                    <option value="aba">ABA Pay</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded-lg mt-4"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}