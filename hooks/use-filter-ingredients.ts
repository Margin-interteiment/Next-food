import { Api } from '@/services/api-client';
import { Ingredient } from '@prisma/client';
import React from 'react';
import { useSet } from 'react-use';


interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onAddId: (id: string) => void;
}


export const useFilterIngredients = (values: string[] = []): ReturnProps => {




const [selectedIds, { toggle}] = useSet(new Set<string>(values));



const setSelectedIngredients = (ids:string[]) => {
  ids.forEach(selectedIds.add);
}



return { onAddId: toggle, selectedIngredients:selectedIds};


};