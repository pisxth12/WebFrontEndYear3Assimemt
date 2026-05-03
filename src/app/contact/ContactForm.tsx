'use client';

import { sendContact } from '@/lib/actions/contact.server';
import { useState } from 'react';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        const result = await sendContact(formData);
        
        if (result.success) {
            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }
        
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-xl p-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-black dark:text-white mb-2">Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                    />
                </div>
                
                <div>
                    <label className="block text-black dark:text-white mb-2">Email *</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                    />
                </div>
                
                <div>
                    <label className="block text-black dark:text-white mb-2">Phone</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                    />
                </div>
                
                <div>
                    <label className="block text-black dark:text-white mb-2">Message *</label>
                    <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-white"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-lg hover:opacity-80 transition disabled:opacity-50"
                >
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitted && (
                    <div className="text-center text-green-500 pt-2">
                        Thank you! We'll get back to you soon.
                    </div>
                )}
            </div>
        </form>
    );
}