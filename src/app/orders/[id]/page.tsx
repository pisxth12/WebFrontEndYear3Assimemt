import { getOrderById } from '@/lib/actions/orders.server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Package, MapPin, CreditCard, Calendar } from 'lucide-react';

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const order = await getOrderById(id);
    
    if (!order || order.error) {
        notFound();
    }

    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        processing: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <Link 
                        href="/orders" 
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white mb-4"
                    >
                        <ArrowLeft size={18} />
                        Back to Orders
                    </Link>
                    
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-black dark:text-white">
                                Order #{order.order_number}
                            </h1>
                            <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                                <Calendar size={14} />
                                {new Date(order.created_at).toLocaleDateString()}
                            </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status as keyof typeof statusColors] || statusColors.pending}`}>
                            {order.status}
                        </div>
                    </div>
                </div>

                <div className="grid gap-6">
                    {/* Customer Info */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Package size={18} className="text-gray-500" />
                            <h2 className="font-semibold text-black dark:text-white">Customer Information</h2>
                        </div>
                        <div className="space-y-2 pl-6">
                            <p className="text-black dark:text-white">{order.customer_name}</p>
                            <p className="text-gray-600 dark:text-gray-400">{order.customer_phone}</p>
                            <div className="flex items-start gap-2">
                                <MapPin size={14} className="text-gray-400 mt-0.5" />
                                <p className="text-gray-600 dark:text-gray-400">{order.shipping_address}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <h2 className="font-semibold text-black dark:text-white mb-4">Order Items</h2>
                        <div className="space-y-3">
                            {order.items?.map((item: any) => (
                                <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                    <div className="flex-1">
                                        <p className="font-medium text-black dark:text-white">{item.product?.name}</p>
                                        <p className="text-sm text-gray-500">
                                            ${item.price} × {item.quantity}
                                        </p>
                                    </div>
                                    <p className="font-semibold text-black dark:text-white">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        
                        {/* Total */}
                        <div className="flex justify-between items-center pt-4 mt-2 border-t border-gray-200 dark:border-gray-800">
                            <span className="font-semibold text-black dark:text-white">Total</span>
                            <span className="text-xl font-bold text-black dark:text-white">${order.total}</span>
                        </div>
                    </div>

                    {/* Payment Info */}
                    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <CreditCard size={18} className="text-gray-500" />
                            <h2 className="font-semibold text-black dark:text-white">Payment Information</h2>
                        </div>
                        <div className="pl-6">
                            <p className="text-black dark:text-white capitalize">{order.payment_method}</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {order.payment_method === 'cod' ? 'Pay when you receive the order' : 'Bank transfer'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}