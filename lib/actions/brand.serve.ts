'use server';

import { serverFetch } from "../api/server"

export async function getBrands() {
    const data = await serverFetch('/brands');
    return data;
}