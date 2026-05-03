import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import { getFeatuedProducts, getProducts } from '@/lib/actions/product.serve';
import { getCategories } from '@/lib/actions/category.serve';
import { getBanners } from '@/lib/actions/banner.serve';
import FeaturedProducts from '../components/FeaturedProducts';
import TopProduct from '../components/TopProduct';

export default async function HomePage() {

  return (
     <div>
            <Banner />
            <TopProduct/>
            <FeaturedProducts/>
        </div>
  )
}
