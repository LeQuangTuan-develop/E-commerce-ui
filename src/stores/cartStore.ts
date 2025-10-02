import { CartItem, CartStoreActions, CartStoreState } from "@/types"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const useCartStore = create(
    persist<CartStoreState & CartStoreActions>((set) => ({
        cartItems: [],
        isHydrated: false,
        addToCart: (product: CartItem) => {
            set((state) => {
                const isExistIndex = state.cartItems.findIndex((item) => (item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize))
                if (isExistIndex !== -1) {
                    const newCartItems = [...state.cartItems]
                    newCartItems[isExistIndex].quantity += product.quantity
                    return { cartItems: newCartItems }
                }
                return { cartItems: [...state.cartItems, product] }
            })
        },
        removeFromCart: (product: CartItem) => {
            set((state) => ({ cartItems: state.cartItems.filter((item) => !(item.id === product.id && item.selectedColor === product.selectedColor && item.selectedSize === product.selectedSize)) }))
        },
        clearCart: () => {
            set({ cartItems: [] })
        },
    }), {
        name: "cart-items",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
            if (state) {
                state.isHydrated = true
            }
        }
    }
    )
)

export default useCartStore