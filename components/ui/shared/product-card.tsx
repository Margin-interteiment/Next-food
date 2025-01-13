import Link from "next/link";
import React from "react";
import { Dialog, Title } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { Button } from "../button";

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  className?: string;
  text: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
  text,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name}></img>
        </div>

        <Dialog>
          <Title className="mb-1 mt-3 font-bold sm">{name}</Title>
        </Dialog>

        <p className="text-sm text-gray-400">{text}</p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            від <b>{price} ₴</b>
          </span>

          <Button variant="secondary">
            <Plus className="w-5 h-5 mr-1"></Plus> Додати
          </Button>
        </div>
      </Link>
    </div>
  );
};
