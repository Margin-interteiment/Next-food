import React from "react";
import { Filters } from "./use-filters";
import qs from "qs";
import router from "next/router";
import { useRouter } from "next/navigation";

export const useQueryFilters=(filters:Filters)=>{
   const router = useRouter();


  React.useEffect(() => {
    const params = {
      ...filters.prices,
      sizes: Array.from(filters.sizes),
      ingredients: Array.from(filters.selectedIngredients),
    };
    const query = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${query}`, { scroll: false });
  }, [filters, router]);
}