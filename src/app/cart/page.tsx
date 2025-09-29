"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import { CartItem, ShippingFormInputs } from "@/types";
import { ArrowRight, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const steps = [
  {
    id: 1,
    title: "Shopping cart",
  },
  {
    id: 2,
    title: "Shipping address",
  },
  {
    id: 3,
    title: "Payment method",
  },
];

// TEMPORARY
const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Adidas CoreFit T-Shirt",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 39.9,
    sizes: ["s", "m", "l", "xl", "xxl"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
    quantity: 1,
    selectedSize: "m",
    selectedColor: "gray",
  },
  {
    id: 2,
    name: "Puma Ultra Warm Zip",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 59.9,
    sizes: ["s", "m", "l", "xl"],
    colors: ["gray", "green"],
    images: { gray: "/products/2g.png", green: "/products/2gr.png" },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "gray",
  },
  {
    id: 3,
    name: "Nike Air Essentials Pullover",
    shortDescription:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    description:
      "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
    price: 69.9,
    sizes: ["s", "m", "l"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
    quantity: 1,
    selectedSize: "l",
    selectedColor: "black",
  },
];

const CartPage = () => {
  const searchParams = useSearchParams();
  const activeStep = parseInt(searchParams.get("step") || "1");
  const router = useRouter();
  const pathname = usePathname();
  const [total, setTotal] = useState(
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );
  const [shippingFormData, setShippingFormData] = useState<ShippingFormInputs | null>(null);

  const handleStepChange = (step: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("step", step.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-8 items-center mt-12">
      <h1 className="text-2xl font-medium">Your shopping cart</h1>
      {/* Step navigation */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center cursor-pointer gap-2 pb-4 border-b-2 transition-all duration-300 border-gray-300 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            onClick={() => handleStepChange(step.id)}
          >
            <div
              className={`w-10 h-10 flex items-center text-white justify-center rounded-full ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* Details */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* Step */}
        <div className="w-full lg:w-7/12 shadow-lg rounded-lg p-8 border-1 border-gray-100 flex flex-col gap-8">
          {activeStep === 1 ? (
            cartItems.map((item) => (
              <div className="flex justify-between items-center" key={item.id}>
                <div className="flex items-center gap-8">
                  <div className="w-32 h-32 relative overflow-hidden bg-gray-50 rounded-lg">
                    <Image src={item.images[item.selectedColor]} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3>{item.name}</h3>
                    <div className="flex flex-col gap-1 text-sm text-gray-500">
                      <p>Quantity: {item.quantity}</p>
                      <p>Size: {item.selectedSize.toUpperCase()}</p>
                      <p>Color: {item.selectedColor}</p>
                    </div>
                    <p className="text-medium font-medium mt-6">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <button className="cursor-pointer w-8 h-8 bg-red-100 hover:bg-red-200 transition-all duration-300 rounded-full flex items-center justify-center">
                  <X className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm setShippingFormData={setShippingFormData} shippingFormData={shippingFormData}/>
          ) : activeStep === 3 && shippingFormData ? (
              <PaymentForm />
            ) : (
            "please fill shipping form"
          )}
        </div>
        {/* Detail */}
        <div className="w-full lg:w-5/12 shadow-lg rounded-lg p-8 border-1 border-gray-100 flex flex-col gap-8 h-fit">
          <h2 className="text-md font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Discount (10%)</p>
              <p className="text-red-500 font-medium">-$10</p>
            </div>
            <div className="flex justify-between items-center text-sm">
              <p className="text-gray-500">Shipping fee</p>
              <p className="font-medium">$10</p>
            </div>
          </div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="flex justify-between items-center font-semibold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
          {activeStep === 1 && (
            <button
              onClick={() => handleStepChange(2)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center cursor-pointer hover:bg-gray-900 transition-all duration-300s"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
