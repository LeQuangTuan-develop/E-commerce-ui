"use client";

import { shippingFormSchema, ShippingFormInputs } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

const ShippingForm = ({ setShippingFormData, shippingFormData }: { setShippingFormData: (shippingFormData: ShippingFormInputs) => void, shippingFormData: ShippingFormInputs | null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });
  const router = useRouter();

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    console.log(data);
    setShippingFormData(data);
    router.push(`cart?step=3`);
  };


  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(handleShippingForm)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-gray-500 font-medium">
          Name
        </label>
        <input
          className="border-b border-gray-200 outline-none py-2 text-sm focus:border-gray-500 transition-all duration-300"
          type="text"
          id="name"
          placeholder="Enter your name"
          defaultValue={shippingFormData?.name}
          {...register("name")}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm text-gray-500 font-medium">
          Email
        </label>
        <input
          className="border-b border-gray-200 outline-none py-2 text-sm focus:border-gray-500 transition-all duration-300"
          type="email"
          id="email"
          placeholder="tinhbaotaichin@gmail.com"
          defaultValue={shippingFormData?.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm text-gray-500 font-medium">
          Phone
        </label>
        <input
          className="border-b border-gray-200 outline-none py-2 text-sm focus:border-gray-500 transition-all duration-300"
          type="text"
          id="phone"
          placeholder="0866666666"
          defaultValue={shippingFormData?.phone}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm text-gray-500 font-medium">
          Address
        </label>
        <input
          className="border-b border-gray-200 outline-none py-2 text-sm focus:border-gray-500 transition-all duration-300"
          type="text"
          id="address"
          placeholder="123 Main St, Anytown, USA"
          defaultValue={shippingFormData?.address}
          {...register("address")}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-sm text-gray-500 font-medium">
          City
        </label>
        <input
          className="border-b border-gray-200 outline-none py-2 text-sm focus:border-gray-500 transition-all duration-300"
          type="text"
          id="city"
          placeholder="Ho Chi Minh"
          defaultValue={shippingFormData?.city}
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>
      <button
        className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center cursor-pointer hover:bg-gray-900 transition-all duration-300s"
        type="submit"
      >
        Continue
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
};

export default ShippingForm;
