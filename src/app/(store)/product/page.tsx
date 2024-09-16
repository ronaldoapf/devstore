import { api } from '@/data/api'
import { Product } from '@/data/types/product'
import Image from 'next/image'
import Link from 'next/link'

async function getProducts(): Promise<Product[]> {
  const response = await api('/products/featured', {
    next: {
      revalidate: 60 * 60, // 1 hour
    },
  })
  const products = await response.json()

  return products
}

export default async function Products() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-3 gap-6">
      {products.map((product) => {
        return (
          <Link
            key={product.slug}
            href={`/products/${product.id}`}
            className="group relative flex rounded-lg bg-zinc-900 overflow-hidden justify-center items-start h-[384px]"
          >
            <Image
              className="duration-500 group-hover:scale-105 transition-transform"
              width={980}
              height={980}
              quality={100}
              src={product.image}
              alt={product.description}
            />
            <div className="absolute bottom-28 right-28 h-12 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="text-sm truncate">{product.title}</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {product.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
