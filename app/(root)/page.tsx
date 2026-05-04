import React from "react";
import { Button } from "@/components/ui";
import { Container } from "@/components/ui/shared";
import Image from "next/image";
import { Dialog, Title } from "@radix-ui/react-dialog";
import { Categories } from "@/components/ui/shared/categories";
import { SortPopup } from "@/components/ui/shared/sort-popup";
import { Filters } from "@/components/ui/shared/filters";
import { ProductsGroupList } from "@/components/ui/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";
import { getServerDict } from "@/lib/locale-server";

export default async function Home() {
  const t = getServerDict();
  return (
    <div>
      {/* Первая секция */}
      <Container className="mt-5 py-8">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-black text-[58px] leading-[1]">
              {t["hero.title.1"]}
              <span className="text-[#FF6838] ml-[10px]">{t["hero.title.2"]}</span>
            </h1>

            <p className="text-2xl text-black max-w-[450px] mt-[15px]">
              {t["hero.subtitle"]}
            </p>

            <div className="flex items-center gap-3 mt-[15px]">
              <a href="#menu">
                <Button>{t["hero.cta"]}</Button>
              </a>
              <a href="/about" className="underline text-black ml-[15px]">
                {t["hero.more"]}
              </a>
            </div>
          </div>

          <Image
            className="ml-[224px]"
            src="/Scooter.png"
            alt="photo"
            width={560}
            height={660}
          />
        </div>
      </Container>

      <InformationOfBurgers />
    </div>
  );
}

async function InformationOfBurgers() {
  const t = getServerDict();
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return (
    <div>
      <div id="menu" className="mt-[100px]">
        <Container className="block mt-[100px]">
          <Dialog>
            <Title className="font-extrabold text-[43px]">{t["menu.title"]}</Title>
            <Categories />
            <SortPopup />
          </Dialog>
        </Container>
      </div>

      <div className="mt-[100px] ">
        <Container className="">
          {/* Общий Див для 2 частей */}
          <div className="flex gap-[80px] ">
            {/* Фильтрация */}
            <div className="w-[250px]">
              <Filters />
            </div>

            {/* Список товаров */}

            <div className="flex-1">
              <div className="flex flex-col gap-16">
                {categories.map(
                  (category) =>
                    category.products.length > 0 && (
                      <ProductsGroupList
                        key={category.id}
                        title={category.name}
                        categoryId={category.id}
                        items={category.products}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
