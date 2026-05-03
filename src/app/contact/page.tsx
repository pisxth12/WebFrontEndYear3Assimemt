import { ToastHandler } from '@/src/components/toast-handler';
import { handleSubmit } from './actions';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { getSettings } from '@/lib/actions/settings.server';

export default async function ContactPage() {
    const settings = await getSettings();

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <ToastHandler />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-3">
                        Contact Us
                    </h1>
                    <p className="text-black/60 dark:text-white/60 max-w-2xl mx-auto">
                        Have questions? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="border border-black/10 dark:border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Get in Touch
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-black/60 dark:text-white/60">
                                    <MapPin size={18} />
                                    <span>{settings.address || '123 Main St, City, Country'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-black/60 dark:text-white/60">
                                    <Phone size={18} />
                                    <a href={`tel:${settings.phone || '+1234567890'}`} className="hover:text-black dark:hover:text-white">
                                        {settings.phone || '+1234567890'}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3 text-black/60 dark:text-white/60">
                                    <Mail size={18} />
                                    <a href={`mailto:${settings.email || 'hello@example.com'}`} className="hover:text-black dark:hover:text-white">
                                        {settings.email || 'hello@example.com'}
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="border border-black/10 dark:border-white/10 p-6">
                            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                                Business Hours
                            </h3>
                            <div className="space-y-2 text-black/60 dark:text-white/60">
                                <div className="flex justify-between">
                                    <span>Monday - Friday</span>
                                    <span>9am - 6pm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Saturday</span>
                                    <span>10am - 4pm</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Sunday</span>
                                    <span>Closed</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <form
                        action={handleSubmit}
                        className="border border-black/10 dark:border-white/10 p-6"
                    >
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                                    Name *
                                </label>
                                <input
                                    name="name"
                                    required
                                    className="w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                                    Phone
                                </label>
                                <input
                                    name="phone"
                                    className="w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black dark:text-white mb-1">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full px-3 py-2 border border-black/20 dark:border-white/20 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 bg-black dark:bg-white text-white dark:text-black hover:opacity-80 transition font-medium"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}