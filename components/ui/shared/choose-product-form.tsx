import React from "react";
import { ProductImage } from "./product-image";
import { cn } from "@/lib/utils";
import { Title } from "@radix-ui/react-dialog";
import { Button } from "../button";

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  className?: string;
  onClickAdd?: VoidFunction;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const textDetails = "30 см товщина та 50 см висота";
  const totalPrice = 250;

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        ></img>
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title className="font-extrabold mb-1 md">{name}</Title>

        <p className="text-gray-400"> {textDetails}</p>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Додати до кошика за {totalPrice} ₴
        </Button>
      </div>
    </div>
  );
};
