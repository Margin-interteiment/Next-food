"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "@radix-ui/react-dialog";
import { Button } from "../button";
import { Ingredient, ProductItem } from "@prisma/client";
import { GroupVariants } from "./group-variants";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import { useT } from "@/components/providers/locale-provider";

interface Props {
  productId: number;
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductItem[];
  className?: string;
  onSubmitted?: () => void;
}

export const ChooseProductForm: React.FC<Props> = ({
  productId,
  name,
  items,
  imageUrl,
  ingredients,
  onSubmitted,
  className,
}) => {
  const router = useRouter();
  const { t } = useT();
  const addItem = useCartStore((s) => s.addItem);

  const sizes = Array.from(
    new Set(items.map((i) => i.size).filter((s): s is number => !!s))
  ).sort((a, b) => a - b);

  const [activeSize, setActiveSize] = React.useState<number | null>(
    sizes[0] ?? null
  );
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    Set<number>
  >(new Set());

  const activeItem = React.useMemo(() => {
    if (activeSize == null) return items[0];
    return items.find((i) => i.size === activeSize) ?? items[0];
  }, [activeSize, items]);

  const ingredientsPrice = ingredients
    .filter((ing) => selectedIngredients.has(ing.id))
    .reduce((sum, ing) => sum + ing.price, 0);

  const totalPrice = (activeItem?.price ?? 0) + ingredientsPrice;

  const toggleIngredient = (id: number) => {
    setSelectedIngredients((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAdd = () => {
    if (!activeItem) return;
    const chosen = ingredients.filter((i) => selectedIngredients.has(i.id));
    addItem({
      productId,
      productItemId: activeItem.id,
      name,
      imageUrl,
      price: totalPrice,
      size: activeItem.size,
      burgerType: activeItem.burgerType,
      ingredientIds: chosen.map((i) => i.id),
      ingredientNames: chosen.map((i) => i.name),
    });
    onSubmitted?.();
    router.push("/cart");
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7 flex flex-col">
        <Title className="font-extrabold text-[26px] mb-1">{name}</Title>
        <p className="text-gray-400 mb-4">
          {activeItem?.size
            ? `${activeItem.size} см · ${activeItem.burgerType ?? "—"}`
            : t("product.recipe")}
        </p>

        {sizes.length > 1 && (
          <div className="mb-5">
            <GroupVariants
              selectedValue={String(activeSize)}
              onClick={(v) => setActiveSize(Number(v))}
              items={sizes.map((s) => ({ name: `${s} см`, value: String(s) }))}
            />
          </div>
        )}

        {ingredients.length > 0 && (
          <div className="bg-white p-3 rounded-md mb-5 max-h-[260px] overflow-auto">
            <p className="font-semibold mb-2">{t("product.add_ingredients")}</p>
            <div className="grid grid-cols-3 gap-3">
              {ingredients.map((ing) => {
                const active = selectedIngredients.has(ing.id);
                return (
                  <button
                    type="button"
                    key={ing.id}
                    onClick={() => toggleIngredient(ing.id)}
                    className={cn(
                      "flex flex-col items-center text-center border rounded-md p-2 transition",
                      active
                        ? "border-orange-500 ring-1 ring-orange-500"
                        : "border-transparent hover:border-gray-200"
                    )}
                  >
                    <img
                      src={ing.imageUrl}
                      alt={ing.name}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/logo.png";
                        (e.currentTarget as HTMLImageElement).style.opacity =
                          "0.3";
                      }}
                      className="w-14 h-14 object-contain"
                    />
                    <span className="text-xs mt-1">{ing.name}</span>
                    <span className="text-xs text-orange-500 font-bold">
                      {ing.price} ₴
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <Button
          onClick={handleAdd}
          disabled={!activeItem || totalPrice <= 0}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-auto"
        >
          {activeItem
            ? `${t("product.add_btn")} ${totalPrice} ₴`
            : t("product.unavailable")}
        </Button>
      </div>
    </div>
  );
};
