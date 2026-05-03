import React from 'react'
import ProductGrid from './ProductGrid'
import { getFeatuedProducts } from '@/lib/actions/product.serve';

export default async  function  FeaturedProducts () {
    const products = await getFeatuedProducts();
  return (
    <ProductGrid
            products={products} 
            title="Featured Products"
            cols={4}
        />
  )
}
