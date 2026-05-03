'use server';

import { serverFetch } from "../api/server"

export async function getBanners() {
    const data = await serverFetch('/banners');
    return data;
}