import { useRouter, useSearchParams } from "next/navigation";
import { useFilterIngredients } from "./use-filter-ingredients";
import { useSet } from "react-use";
import React from "react";


interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}


interface QueryFilters extends PriceProps {
  sizes: string;
  ingredients: string;
}

export interface Filters{
  sizes:Set<string>,
  selectedIngredients:Set<string>,
  prices:PriceProps,
}

interface ReturnProps extends Filters {
  setPrices: (name: keyof PriceProps, value: number) => void;
  setSizes: (value:string) => void;
  setSelectedIngredients: (value: string) => void;
}


export const useFilters = (): ReturnProps =>{
   const router = useRouter();
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle:toggleIngredients}] = useSet(new Set<string>(searchParams.get("ingredients")?.split(",")));

 

  const [sizes, { toggle: toggleSizes }] = useSet(
      new Set<string>(
        searchParams.has("sizes") ? searchParams.get("sizes")?.split(".") : []
      )
    );


     const [prices, setPrices] = React.useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
      });


      const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrices(prev =>({
      ...prev,
      [name]: value,
    }));
  };
  

      return {
        sizes, 
        selectedIngredients,
        prices,
        setPrices:updatePrice,
        setSizes:toggleSizes,
        setSelectedIngredients:toggleIngredients,
          
      }
}