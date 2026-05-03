import { getOrders } from '@/lib/actions/orders.server';
import Link from 'next/link';

export default async function OrdersPage() {
    const orders = await getOrders();

    if (orders.length === 0) {
        return (
            <div className="min-h-screen bg-white dark:bg-black">
                <div className="max-w-4xl mx-auto p-8 text-center">
                    <div className="text-6xl mb-4">📦</div>
                    <h1 className="text-2xl font-bold mb-2">No orders yet</h1>
                    <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
                    <Link href="/products" className="inline-block bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black">
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-2">My Orders</h1>
                <p className="text-gray-500 mb-8">View all your order history</p>
                
                <div className="space-y-4">
                    {orders.map((order: any) => (
                        <Link key={order.id} href={`/orders/${order.id}`}>
                            <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:shadow-lg transition">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Order #{order.order_number}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {order.status}
                                    </div>
                                </div>
                                
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="font-medium">{order.customer_name}</p>
                                        <p className="text-sm text-gray-500">{order.customer_phone}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">${order.total}</p>
                                        <p className="text-sm text-gray-500">{order.payment_method}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}