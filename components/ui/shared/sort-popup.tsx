import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer ml-[481px] relative translate-x-[571px] -translate-y-[21px] translate-z-[10px]",
        className
      )}
    >
      <ArrowUpDown size={20} />
      <b>Сортування:</b>
      <b className="text-primary">популярне</b>
    </div>
  );
};
