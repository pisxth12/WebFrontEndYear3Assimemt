import React from 'react'
import ProductGrid from './ProductGrid'
import { Product } from '@/types'

interface relatedProductProps{
    relatedProducts: any[]
}
const RelatedProductsClient = ({ relatedProducts }: relatedProductProps) => {

    if (!relatedProducts || relatedProducts.length === 0) {
        return null;
    }

  return (
    <div>
      <ProductGrid products={relatedProducts}  cols={4} />
    </div>
  )
}

export default RelatedProductsClient
