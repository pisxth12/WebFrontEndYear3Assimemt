import { serverFetch } from "../api/server";

interface ContactData {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export async function sendContact(data: ContactData){
    const res = await serverFetch('/contact', {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return res
}