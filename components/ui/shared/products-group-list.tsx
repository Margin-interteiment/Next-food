"use client";

import { Dialog, Title } from "@radix-ui/react-dialog";
import * as React from "react";
import { ProductCard } from "./product-card";
import { useIntersection } from "react-use";
import { cn } from "@/lib/utils";
import { useCategoryStore } from "@/store/category";

export interface Props {
  title: string;
  items: any[];
  categoryId: number;
  listClassName?: string;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  title,
  items,
  categoryId,
  listClassName,
  className,
}) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting, title]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Dialog>
        <h1 className="mb-5 font-extrabold" style={{ fontSize: "22px" }}>
          {title}
        </h1>
      </Dialog>

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            price={item.items?.[0]?.price || 150}
            imageUrl={item.imageUrl}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};
