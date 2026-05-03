'use server';



import { serverFetch } from "../api/server"

interface ProductParams {
    category_id?: number,
    brand_id?: number,
    search?: string
}

export async function getProducts(params?: ProductParams) {
    
    const q = new URLSearchParams()
    if(params?.category_id !== undefined) q.append('category_id', params.category_id.toString());
    if(params?.brand_id !== undefined) q.append('brand_id', params.brand_id.toString());
    if(params?.search) q.append('search', params.search);

    const url = `/products${q.toString() ? `?${q}` : ''}`;
    
    const data = await serverFetch(url);
        return data;
}

export async function getFeatuedProducts() {
    const data = await serverFetch('/featured');
    return data.data;
}

export async function getProductBySlug(slug: string) {
    const data = await serverFetch(`/products/${slug}`);
    return data;
}
