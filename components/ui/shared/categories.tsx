"use client";

import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";
import React from "react";

interface Props {
  className?: string;
}

const categories = [
  { id: 1, name: "М’ясні Бургери" },
  { id: 2, name: "Гострі Бургери" },
  { id: 3, name: "Дабл-бургери" },
  { id: 4, name: "Домашня випічка" },
  { id: 5, name: "Напої" },
  { id: 6, name: "Десерти" },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 rounded-2xl relative -translate-x-[1px] translate-y-[32px] translate-z-[10px]",
        className
      )}
    >
      {categories.map(({ name, id }, index) => (
        <a
          className={cn(
            "flex item-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${name}`}
          key={index}
        >
          <button>{name}</button>
        </a>
      ))}
    </div>
  );
};
