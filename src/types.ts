import { z } from "zod";

export type Product = {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type CartItem = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string()
    .min(7, "Phone number must be between 7 and 10 digits")
    .max(10, "Phone number must be between 7 and 10 digits")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

export type CartStoreState = {
  cartItems: CartItem[]
  isHydrated: boolean
}

export type CartStoreActions = {
  addToCart: (product: CartItem) => void
  removeFromCart: (product: CartItem) => void
  clearCart: () => void
}