"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const ShoppingCartIcon = () => {
  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="w-4 h-4 text-gray-600" />
      <span className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs w-4 h-4 flex items-center justify-center">0</span>
    </Link>
  );
};

export default ShoppingCartIcon;