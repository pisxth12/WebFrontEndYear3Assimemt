import { getRelatedProduct } from '@/lib/actions/product.serve'
import React from 'react'
import RelatedProductsClient from './RelatedProductsClient';

interface relatedProductsProps{
    productId:number
}

export default async function RelatedProducts({productId}: relatedProductsProps) {
    
    const relatedProducts = await getRelatedProduct(productId);

  return <RelatedProductsClient relatedProducts={relatedProducts}/>
}
