"use client";

import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

/** Empties the cart once Cray confirms the payment. */
export default function ClearCart() {
  const { ready, clearCart } = useCart();
  useEffect(() => {
    if (ready) clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);
  return null;
}
