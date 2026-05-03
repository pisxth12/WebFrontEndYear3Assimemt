"use server"
import { clearCart, removeFromCart } from "@/lib/actions/cart.server";
import { revalidatePath } from "next/cache";

export async function removeCartItem(formData: FormData) {
    const id = Number(formData.get('id'));
    await removeFromCart(id);
        revalidatePath('/cart');       
}

export async function clearCartItems(formData: FormData) {
    await clearCart();
        revalidatePath('/cart');       

}