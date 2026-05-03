'use server';

import { serverFetch } from '../api/server';
import { revalidatePath } from 'next/cache';

export interface CartItem{
    id: number;
    product_name: string;
    quantity: number;
    product_id: number;
    product_price: number;
    product_image: string;
}
export interface Cart{
    cart: CartItem[];
    total: number;
    count: number;
}

export async function addToCart(productId: number, quantity: number = 1) {
    try {
        const response = await serverFetch('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, quantity })
        });

         if (response.error) {
            return { success: false, error: response.error };
        }
        
        revalidatePath('/cart');
        revalidatePath('/products/[slug]');
        
        return { success: true, data: response };
    } catch (error) {
        return { success: false, error: 'Failed to add to cart' };
    }
}

export async function getCartCount(): Promise<number> {
    try {
        const data = await serverFetch('/cart/count');
        
        return data || 0;

    } catch (error) {
        return 0;
    }
}

export async function getCart(): Promise<CartItem[]> {
    try {
        const data = await serverFetch('/cart');
        return data.cart || [];
    } catch (error) {
        return [];
    }
}

export async function updateCartItem(itemId: number, quantity: number) {
    try {
        const response = await serverFetch('/cart/update', {
            method: 'PUT',
            body: JSON.stringify({ item_id: itemId, quantity })
        });
        
        revalidatePath('/cart');
        return { success: true, data: response };
    } catch (error) {
        return { success: false, error: 'Failed to update cart' };
    }
}

export async function removeFromCart(itemId: number) {
    try {
        const response = await serverFetch(`/cart/${itemId}`, {
            method: 'DELETE',
            body: JSON.stringify({ item_id: itemId })
        });
        
        revalidatePath('/cart');
        return { success: true, data: response };
    } catch (error) {
        return { success: false, error: 'Failed to remove from cart' };
    }
}

export async function clearCart() {
    try {
        const response = await serverFetch(`/cart`, {
            method: 'DELETE',
        });
        revalidatePath('/cart');
        return { success: true, data: response };
    } catch (error) {
        return { success: false, error: 'Failed to remove from cart' };
    }
}

