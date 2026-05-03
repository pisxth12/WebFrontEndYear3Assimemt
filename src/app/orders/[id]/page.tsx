import { getOrderById } from '@/lib/actions/orders.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, MapPin, Phone, User, Package } from 'lucide-react';
import { OrderDetail } from '@/types';

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
    pending:    { label: 'Pending',    dot: 'bg-amber-400',   text: 'text-amber-600 dark:text-amber-400' },
    processing: { label: 'Processing', dot: 'bg-blue-400',    text: 'text-blue-600 dark:text-blue-400' },
    completed:  { label: 'Completed',  dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
    cancelled:  { label: 'Cancelled',  dot: 'bg-red-400',     text: 'text-red-500 dark:text-red-400' },
};

const paymentLabel: Record<string, { label: string; note: string }> = {
    cod:  { label: 'Cash on Delivery', note: 'Pay when you receive the order' },
    bank: { label: 'Bank Transfer',    note: 'Transfer before shipment' },
    aba:  { label: 'ABA Pay',          note: 'Paid via ABA mobile' },
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order: OrderDetail = await getOrderById(id);

    if (!order) notFound();

    const status = statusConfig[order.status] ?? { label: order.status, dot: 'bg-zinc-400', text: 'text-zinc-500' };
    const payment = paymentLabel[order.payment_method] ?? { label: order.payment_method, note: '' };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

                {/* Back + heading */}
                <Link
                    href="/orders"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest
                        text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white
                        transition-colors duration-200 mb-10 group"
                    style={{ fontFamily: "'Georgia', serif" }}
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
                    Back to Orders
                </Link>

                {/* Title row */}
                <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
                    <div>
                        <h1
                            className="text-3xl sm:text-4xl font-bold text-black dark:text-white"
                            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.025em' }}
                        >
                            #{order.order_number}
                        </h1>
                        <p className="text-xs text-black/35 dark:text-white/35 mt-1">
                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </p>
                    </div>
                    <span
                        className={`flex items-center gap-2 text-xs uppercase tracking-widest ${status.text}`}
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                        {status.label}
                    </span>
                </div>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

                    {/* ── Left: Order items ── */}
                    <div>
                        <h2
                            className="text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-6"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Order Items
                        </h2>

                        <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8 border-t border-black/8 dark:border-white/8">
                            {order.items?.map((item: any) => (
                                <Link href={`/products/${item.product.slug}`} key={item.id} className="flex items-center gap-5 py-5">
                                    {/* Image */}
                                    <div className="w-16 h-16 shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-black/8 dark:border-white/8">
                                        {item.product?.image ? (
                                            <img
                                                src={item.product.image}
                                                alt={item.product?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <Package size={16} className="text-black/20 dark:text-white/20" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name + unit */}
                                    <div className="flex-1 min-w-0">
                                        <p
                                            className="text-sm font-semibold text-black dark:text-white truncate"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            {item.product?.name}
                                        </p>
                                        <p
                                            className="text-[11px] uppercase tracking-widest text-black/35 dark:text-white/35 mt-0.5"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            ${parseFloat(item.price).toFixed(2)} × {item.quantity}
                                        </p>
                                    </div>

                                    {/* Line total */}
                                    <p
                                        className="text-sm font-bold text-black dark:text-white shrink-0"
                                        style={{ fontFamily: "'Georgia', serif" }}
                                    >
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </Link>
                            ))}
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-baseline pt-6 border-t border-black/10 dark:border-white/10 mt-2">
                            <span
                                className="text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Order Total
                            </span>
                            <span
                                className="text-2xl font-bold text-black dark:text-white"
                                style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                            >
                                ${order.total}
                            </span>
                        </div>
                    </div>

                    {/* ── Right: Customer + Payment ── */}
                    <div className="flex flex-col gap-6 lg:sticky lg:top-24">

                        {/* Customer info */}
                        <div className="border border-black/10 dark:border-white/10 p-6">
                            <h2
                                className="text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-5"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Customer
                            </h2>
                            <div className="flex flex-col gap-3.5">
                                <div className="flex items-center gap-3">
                                    <User size={13} strokeWidth={1.5} className="text-black/30 dark:text-white/30 shrink-0" />
                                    <span className="text-sm text-black dark:text-white">{order.customer_name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={13} strokeWidth={1.5} className="text-black/30 dark:text-white/30 shrink-0" />
                                    <span className="text-sm text-black/70 dark:text-white/70">{order.customer_phone}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPin size={13} strokeWidth={1.5} className="text-black/30 dark:text-white/30 shrink-0 mt-0.5" />
                                    <span className="text-sm text-black/70 dark:text-white/70 leading-relaxed">{order.shipping_address}</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment info */}
                        <div className="border border-black/10 dark:border-white/10 p-6">
                            <h2
                                className="text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40 mb-5"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                Payment
                            </h2>
                            <p
                                className="text-sm font-semibold text-black dark:text-white mb-1"
                                style={{ fontFamily: "'Georgia', serif" }}
                            >
                                {payment.label}
                            </p>
                            <p className="text-xs text-black/40 dark:text-white/40">{payment.note}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}