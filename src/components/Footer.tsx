import { getSettings } from '@/lib/actions/settings.server';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Settings } from '@/types';

export default async function Footer() {
    const settings:Settings = await getSettings();

    return (
        <footer className="bg-white dark:bg-black border-t border-black/10 dark:border-white/10 pt-12 pb-6 mt-auto">
            <div className=" mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                        {settings.site_name || 'Mongkol Store'}
                        </h3>
                        <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed">
                            Quality products with best prices.
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
                            Contact
                        </h3>
                        <div className="space-y-2">
                            {settings.phone && (
                                <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                                    <Phone size={14} />
                                    <span>{settings.phone}</span>
                                </div>
                            )}
                            {settings.email && (
                                <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                                    <Mail size={14} />
                                    <span>{settings.email}</span>
                                </div>
                            )}
                            {settings.address && (
                                <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
                                    <MapPin size={14} />
                                    <span>{settings.address}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider mb-4">
                            Follow Us
                        </h3>
                        <div className="space-y-2">
                            <a href={settings.facebook || "#"} className="block text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition">
                                Facebook
                            </a>
                            <a href={settings.telegram} className="block text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition">
                                Telegram
                            </a>
                            <a 
                                href={`tel:${settings.phone}`} 
                                className="block text-sm text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition"
                            >
                                {settings.phone}
                            </a>
                            
                
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-black/10 dark:border-white/10 mt-8 pt-6 text-center">
                    <p className="text-xs text-black/50 dark:text-white/50">
                        {settings.copyright || `© ${new Date().getFullYear()} ${settings.site_name || 'Your Store'}. All rights reserved.`}
                    </p>
                </div>
            </div>
        </footer>
    );
}