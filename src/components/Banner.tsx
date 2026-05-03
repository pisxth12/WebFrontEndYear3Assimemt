import { getBanners } from '@/lib/actions/banner.serve';
import BannerClient from './BannerClient';

export default async function Banner() {
    const banners = await getBanners();
    
    if (!banners || banners.length === 0) return null;
    
    return <BannerClient banners={banners} />;
}