'use client'

import { useCart } from '@/contexts/cart-context'

interface AddToCartButton {
  productId: number
}

export function AddToCartButton({ productId }: AddToCartButton) {
  const { addToCart } = useCart()

  const handleAddProductToCart = () => {
    addToCart(productId)
  }

  return (
    <button
      type="button"
      onClick={handleAddProductToCart}
      className="bg-emerald-500 rounded-full w-full h-12 flex items-center mt-8 justify-center font-semibold"
    >
      Adicionar ao carrinho
    </button>
  )
}
