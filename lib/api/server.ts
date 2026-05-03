import { cookies } from "next/headers";

export async function serverFetch(endpoint: string, options?: RequestInit){
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("laravel-session")?.value

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Cookie: `laravel-session=${sessionCookie || ''}`,
            ...options?.headers,
        },
        cache: 'no-store'
    });
    return res.json()
}