"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui";
import { useCartStore } from "@/store/cart";
import { Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { useT } from "@/components/providers/locale-provider";

export default function CartPage() {
  const { t } = useT();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const total = useCartStore((s) => s.totalAmount());

  if (!mounted) {
    return <Container className="my-10">{t("common.loading")}</Container>;
  }

  if (items.length === 0) {
    return (
      <Container className="my-20 flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl font-extrabold">{t("cart.empty.title")}</h1>
        <p className="text-gray-500">{t("cart.empty.text")}</p>
        <Link href="/">
          <Button className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> {t("cart.empty.cta")}
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-10">
      <h1 className="text-3xl font-extrabold mb-6">
        {t("cart.title")} ({items.length})
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="flex flex-col gap-4">
          {items.map((line) => (
            <div
              key={line.id}
              className="flex items-center gap-4 bg-white border rounded-xl p-4"
            >
              <img
                src={line.imageUrl}
                alt={line.name}
                className="w-20 h-20 object-contain"
              />
              <div className="flex-1">
                <p className="font-semibold">{line.name}</p>
                <p className="text-sm text-gray-400">
                  {line.size ? `${line.size} см` : ""}
                  {line.ingredientNames.length
                    ? `${line.size ? ", " : ""}+ ${line.ingredientNames.join(", ")}`
                    : ""}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    updateQuantity(line.id, line.quantity - 1)
                  }
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  aria-label="Зменшити"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="min-w-[24px] text-center font-bold">
                  {line.quantity}
                </span>
                <button
                  onClick={() =>
                    updateQuantity(line.id, line.quantity + 1)
                  }
                  className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
                  aria-label="Збільшити"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="w-24 text-right font-bold">
                {line.price * line.quantity} ₴
              </div>

              <button
                onClick={() => removeItem(line.id)}
                className="text-gray-400 hover:text-red-500"
                aria-label="Видалити"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <aside className="bg-white border rounded-xl p-6 h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4">{t("cart.summary")}</h2>
          <div className="flex justify-between text-gray-500 mb-2">
            <span>{t("cart.items")}</span>
            <span>{items.reduce((s, i) => s + i.quantity, 0)}</span>
          </div>
          <div className="flex justify-between text-gray-500 mb-2">
            <span>{t("cart.delivery")}</span>
            <span>{t("cart.delivery.free")}</span>
          </div>
          <div className="border-t my-3"></div>
          <div className="flex justify-between text-2xl font-extrabold mb-5">
            <span>{t("cart.total")}</span>
            <span>{total} ₴</span>
          </div>
          <Link href="/checkout">
            <Button className="w-full h-[52px] text-base rounded-xl">
              {t("cart.checkout")}
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full h-[44px] mt-3">
              {t("cart.continue")}
            </Button>
          </Link>
        </aside>
      </div>
    </Container>
  );
}
