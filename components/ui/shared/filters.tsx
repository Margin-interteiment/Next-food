"use client";

import { Dialog, Title } from "@radix-ui/react-dialog";
import { Input } from "../input";
import React from "react";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useQueryFilters, useIngredients, useFilters } from "@/hooks";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices("priceFrom", prices[0]);
    filters.setPrices("priceTo", prices[1]);
  };

  return (
    <div className={className}>
      <Dialog>
        <Title className="mb-5 font-bold text-[22px]">Фільтрація</Title>

        {/* Чекбоксы */}

        {/* <div className="flex flex-col gap-4">
          <FilterCheckbox text="Можна збирати" value="option1"></FilterCheckbox>
          <FilterCheckbox text="Новинки" value="option2"></FilterCheckbox>
        </div> */}

        <CheckboxFiltersGroup
          name="sizes"
          className="mb-5"
          title="Розміри"
          onClickCheckbox={filters.setSizes}
          selected={filters.sizes}
          items={[
            { text: "20 cм", value: "20" },
            { text: "30 cм", value: "30" },
            { text: "40 cм", value: "40" },
          ]}
        />

        {/* Цена */}

        <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
          <p className="font-bold mb-3">Ціна от і до:</p>

          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              placeholder="0"
              min={0}
              max={400}
              value={String(filters.prices.priceFrom)}
              onChange={(e) =>
                filters.setPrices("priceFrom", Number(e.target.value))
              }
            ></Input>
            <Input
              type="number"
              placeholder="400"
              min={100}
              max={400}
              value={String(filters.prices.priceTo)}
              onChange={(e) =>
                filters.setPrices("priceTo", Number(e.target.value))
              }
            ></Input>
          </div>

          <RangeSlider
            min={0}
            max={400}
            step={10}
            value={[
              filters.prices.priceFrom || 0,
              filters.prices.priceTo || 400,
            ]}
            onValueChange={updatePrices}
          />
        </div>

        <CheckboxFiltersGroup
          name="name1"
          title="Інгредієнти"
          className="mt-5"
          limit={6}
          defaultItems={items.slice(0, 6)}
          items={items}
          loading={loading}
          onClickCheckbox={filters.setSelectedIngredients}
          selected={filters.selectedIngredients}
        />
      </Dialog>
    </div>
  );
};
