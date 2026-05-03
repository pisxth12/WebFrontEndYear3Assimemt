'use server';

import { serverFetch } from "../api/server"

export async function getCategories() {
    const data = await serverFetch('/categories');
    return data;
}