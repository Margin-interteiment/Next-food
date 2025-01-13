"use client";

import { Dialog } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { Title } from "@radix-ui/react-dialog";
import { DialogContent } from "@/components/ui/dialog";

import React from "react";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={[]}
        />
      </DialogContent>
    </Dialog>
  );
};
