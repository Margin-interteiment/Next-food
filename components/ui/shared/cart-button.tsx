"use client";

import React from "react";
import Link from "next/link";
import { Button } from "../button";
import { ShoppingCart } from "./ShoppingCart";
import { useCartStore } from "@/store/cart";

export const CartButton: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const total = useCartStore((s) => s.totalAmount());
  const count = useCartStore((s) => s.totalCount());

  return (
    <Link href="/cart">
      <Button className="group relative">
        <b>{mounted ? total : 0} ₴</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1">
          <ShoppingCart className="h-4 w-4" strokeWidth={2} />
          <b>{mounted ? count : 0}</b>
        </div>
      </Button>
    </Link>
  );
};
