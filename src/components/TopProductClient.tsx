import { TopProducts } from '@/types'
import Link from 'next/link'

interface Props{
    topProducts: TopProducts
}

const TopProductClient = ({ topProducts }: Props) => {
    if (!topProducts || topProducts.length === 0) {
        return null;
    }

    return (
        <div className=" mx-auto md:px-4 py-12">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Top Products
                </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {topProducts.map((product) => (
                    <Link 
                        key={product.id} 
                        href={`/products/${product.slug}`}
                        className="group"
                    >
                        <div className="bg-gray-100 relative dark:bg-zinc-950 overflow-hidden">
                            <div className="aspect-square overflow-hidden">
                                {product.image ? (
                                    <img 
                                        src={product.image} 
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                        No image
                                    </div>
                                )}
                            </div>
                            <div className="p-2 text-center absolute bottom-0 mx-auto w-full  ">
                                <p className="text-xs dark:bg-black dark:text-white px-4 font-semibold bg-black text-white  w-fit mx-auto p-1 px-3text-gray-400 line-clamp-1">
                                    {product.name}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default TopProductClient