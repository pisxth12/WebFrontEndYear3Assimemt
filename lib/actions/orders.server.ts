"use server"
import { revalidatePath } from "next/cache";
import { serverFetch } from "../api/server";
import { redirect } from "next/navigation";

interface OrderData {
    customer_name: string;
    customer_phone: string;
    shipping_address: string;
    payment_method: string;
}



export async function getOrders() {
    const data = await serverFetch('/orders');
    return data.order || [];
}


export async function getOrderById(id: string) {
    try {
        const response = await serverFetch(`/orders/${id}`);
        console.log(response+ "==============");
        
        return response;

    } catch (error) {
        return null;
    }
}
export async function createOrder(formData: FormData) {
    const data = {
        customer_name: formData.get('customer_name'),
        customer_phone: formData.get('customer_phone'),
        shipping_address: formData.get('shipping_address'),
        payment_method: formData.get('payment_method'),
    };

    const response = await serverFetch('/orders', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    
    if (response.error || response.message === 'Cart is empty') {
        throw new Error(response.message || 'Cart is empty');
    }

    revalidatePath('/cart');
    revalidatePath('/orders');
    
    redirect(`/orders/${response.order.id}`);
}
