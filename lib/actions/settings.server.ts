'use server';

import { serverFetch } from '@/lib/api/server';

export async function getSettings() {
    const data = await serverFetch('/settings');
    return data;
}

export async function getSpecificSetting(key: string) {
    const data = await serverFetch(`/settings/${key}`);
    return data;
}