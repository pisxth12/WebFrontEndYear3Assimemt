import { getOrders } from '@/lib/actions/orders.server';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';

const statusConfig: Record<string, { label: string; dot: string; text: string }> = {
    pending:   { label: 'Pending',   dot: 'bg-amber-400',  text: 'text-amber-600 dark:text-amber-400' },
    completed: { label: 'Completed', dot: 'bg-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
    cancelled: { label: 'Cancelled', dot: 'bg-red-400',     text: 'text-red-500 dark:text-red-400' },
};

const paymentLabel: Record<string, string> = {
    cod:  'Cash on Delivery',
    bank: 'Bank Transfer',
    aba:  'ABA Pay',
};

export default async function OrdersPage() {
    const orders = await getOrders();

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
                <div className="text-center flex flex-col items-center gap-6">
                    <Package size={40} strokeWidth={1} className="text-black/20 dark:text-white/20" />
                    <div>
                        <h1
                            className="text-2xl font-bold text-black dark:text-white mb-2"
                            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                        >
                            No orders yet
                        </h1>
                        <p className="text-sm text-black/40 dark:text-white/40">
                            Start shopping to see your order history here.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="group/btn relative inline-flex items-center gap-3 overflow-hidden
                            border border-black dark:border-white
                            text-black dark:text-white
                            text-xs uppercase tracking-widest px-8 py-3"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        <span className="absolute inset-0 bg-black dark:bg-white
                            translate-y-full group-hover/btn:translate-y-0
                            transition-transform duration-300 ease-out" />
                        <span className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-black transition-colors duration-300">
                            Browse Products
                        </span>
                        <ArrowRight size={13} className="relative z-10 group-hover/btn:text-white dark:group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all duration-300" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Heading */}
                <div className="mb-10">
                    <h1
                        className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-1"
                        style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.025em' }}
                    >
                        My Orders
                    </h1>
                    <p
                        className="text-xs uppercase tracking-widest text-black/35 dark:text-white/35"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        {orders.length} {orders.length === 1 ? 'order' : 'orders'} total
                    </p>
                </div>

                {/* Order list */}
                <div className="flex flex-col divide-y divide-black/8 dark:divide-white/8 border-t border-black/8 dark:border-white/8">
                    {orders.map((order: any) => {
                        const status = statusConfig[order.status] ?? {
                            label: order.status,
                            dot: 'bg-zinc-400',
                            text: 'text-zinc-500',
                        };

                        return (
                            <Link
                                key={order.id}
                                href={`/orders/${order.id}`}
                                className="group flex flex-col sm:flex-row sm:items-center gap-4 py-6
                                    hover:bg-black/[0.02] dark:hover:bg-white/[0.02]
                                    transition-colors duration-200 -mx-4 px-4"
                            >
                                {/* Order number + date */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <p
                                            className="text-sm font-semibold text-black dark:text-white"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            #{order.order_number}
                                        </p>
                                        {/* Status pill */}
                                        <span className={`flex items-center gap-1.5 text-[10px] uppercase tracking-widest ${status.text}`}
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`} />
                                            {status.label}
                                        </span>
                                    </div>
                                    <p className="text-xs text-black/35 dark:text-white/35 mb-2">
                                        {new Date(order.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric', month: 'long', day: 'numeric'
                                        })}
                                    </p>
                                    <p className="text-sm text-black/60 dark:text-white/60 truncate">
                                        {order.customer_name}
                                        <span className="text-black/30 dark:text-white/30 mx-1.5">·</span>
                                        {order.customer_phone}
                                    </p>
                                </div>

                                {/* Total + payment + arrow */}
                                <div className="flex items-center gap-6 shrink-0">
                                    <div className="text-right">
                                        <p
                                            className="text-lg font-bold text-black dark:text-white"
                                            style={{ fontFamily: "'Georgia', serif", letterSpacing: '-0.02em' }}
                                        >
                                            ${parseFloat(order.total).toFixed(2)}
                                        </p>
                                        <p
                                            className="text-[10px] uppercase tracking-widest text-black/35 dark:text-white/35"
                                            style={{ fontFamily: "'Georgia', serif" }}
                                        >
                                            {paymentLabel[order.payment_method] ?? order.payment_method}
                                        </p>
                                    </div>
                                    <ArrowRight
                                        size={16}
                                        strokeWidth={1.5}
                                        className="text-black/20 dark:text-white/20 group-hover:text-black dark:group-hover:text-white
                                            group-hover:translate-x-0.5 transition-all duration-200"
                                    />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}