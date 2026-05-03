'use server';

import { sendContact } from '@/lib/actions/contact.server';
import { redirect } from 'next/navigation';

export async function handleSubmit(formData: FormData) {
    const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        phone: (formData.get('phone') as string) || '',
        message: formData.get('message') as string,
    };

    await sendContact(data);
    redirect('/contact?success=true');
    
}