"use client";

import useCartStore from "@/stores/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const isHydrated = useCartStore((state) => state.isHydrated)

  if (!isHydrated) return null

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs w-4 h-4 flex items-center justify-center">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
    </Link>
  );
};

export default ShoppingCartIcon;