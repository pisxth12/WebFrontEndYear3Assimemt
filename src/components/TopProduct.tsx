import React from 'react'
import TopProductClient from './TopProductClient'
import { getTopProduct } from '@/lib/actions/product.serve'
import { TopProducts } from '@/types';

export default async function TopProduct(){
    const topProducts:TopProducts = await getTopProduct();
  return <TopProductClient topProducts={topProducts}/>
}

