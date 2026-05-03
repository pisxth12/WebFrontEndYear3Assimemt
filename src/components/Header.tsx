// Header.tsx
import { getSettings } from '@/lib/actions/settings.server';
import { getCartCount } from '@/lib/actions/cart.server';
import HeaderClient from './HeaderClient';

export const dynamic = 'force-dynamic';

export default async function Header() {
    const [count, settings] = await Promise.all([
        getCartCount(),
        getSettings(),
    ]);

    return (
        <HeaderClient
            siteName={settings.site_name || 'Mongkol Store'}
            count={count}
        />
    );
}