"use client";

import CartSidebar from "./CartSidebar";
import { useCart } from "../context/CartContext";

export default function CartUI() {
  const { isOpen, closeCart, items, updateQuantity, removeItem } = useCart();
  return (
    <CartSidebar
      isOpen={isOpen}
      onClose={closeCart}
      items={items}
      onUpdateQuantity={updateQuantity}
      onRemoveItem={removeItem}
    />
  );
}
