"use client";

import useCartStore from "@/stores/cartStore";
import { Product } from "@/types";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const ProductInteraction = ({
  product,
  selectedSize,
  selectedColor,
}: {
  product: Product;
  selectedSize: string;
  selectedColor: string;
}) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  const handleTypeChange = (type: "color" | "size", value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(type, value);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    });
    toast.success("Product added to cart")
    router.push("/cart")
  };

  const handleChangeQuantity = (type: "+" | "-") => {
    if (type === "+") {
      setQuantity((prev) => prev + 1);
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* COLORS */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Color:</h3>
        <div className="flex items-center gap-2">
          {product.colors.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300 ${
                selectedColor === color ? "border-gray-800" : ""
              }`}
            >
              <div
                onClick={() => handleTypeChange("color", color)}
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {/* SIZES */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Size:</h3>
        <div className="flex items-center gap-2">
          {product.sizes.map((size) => (
            <div
              onClick={() => handleTypeChange("size", size)}
              key={size}
              className={`px-3 py-1 font-medium border rounded-md cursor-pointer transition-all duration-300 ${
                selectedSize === size
                  ? "border-black bg-gray-800 text-white"
                  : "border-gray-300"
              }`}
            >
              {size.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      {/* QUANTITY */}
      <div className="flex flex-col gap-2">
        <h3 className="font-medium">Quantity:</h3>
        <div className="flex flex-start gap-2">
          <div
            className="w-8 flex items-center justify-center cursor-pointer border round-md border-gray-300"
            onClick={() => handleChangeQuantity("+")}
          >
            +
          </div>
          <div className="px-3 py-1 flex items-center justify-center border round-md border-gray-300">
            {quantity}
          </div>
          <div
            className="w-8 flex items-center justify-center cursor-pointer border round-md border-gray-300"
            onClick={() => handleChangeQuantity("-")}
          >
            -
          </div>
        </div>
      </div>
      {/* ADD TO CART BUTTON */}
      <button
        className="mt-4 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
        onClick={() => handleAddToCart()}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductInteraction;
