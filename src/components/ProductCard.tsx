"use client";

import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/stores/cartStore";
import { toast } from "react-toastify";

const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const [type, setType] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleTypeChange = (type: "color" | "size", value: string) => {
    setType((prev) => ({ ...prev, [type]: value }));
  };
  
  const handleAddToCart = () => {
    addToCart({ ...product, quantity: 1, selectedSize: type.size, selectedColor: type.color })
    toast.success("Product added to cart")
  }

  return (
    <div className="rounded-lg shadow-lg overflow-hidden">
      <Link href={`/products/${product.id}`}>
        {/* Product Image */}
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[type.color]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-300"
          />
        </div>
      </Link>
      {/* Product Details */}
      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* Product Types */}
        <div className="flex gap-4 items-center text-xs">
          {/* Product Size */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
              onChange={(e) => handleTypeChange("size", e.target.value)}
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* Product Color */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  key={color}
                  className={`cursor-pointer border-1 rounded-full p-[1.2px] ${type.color === color ? "border-gray-500" : "border-gray-300"}`}
                  onClick={() => handleTypeChange("color", color)}
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Product Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button
            className="flex items-center gap-2 ring ring-gray-200 px-4 py-2 text-sm shadow-md rounded-md hover:bg-gray-800 hover:text-white transition-all duration-300 cursor-pointer"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
