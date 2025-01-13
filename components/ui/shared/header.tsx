import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "..";
import { User } from "./user";
import { ShoppingCart } from "./ShoppingCart";
import { SearchInput } from "./search-input";
import Link from "next/link";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border, border-b", className)}>
      <Container className="flex items-center justify-between py-8">
        {/* Левая часть */}

        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={35} height={35} />
          </Link>
          <div>
            <h1 className="text-2xl uppercase font-black">
              <Link href="/">
                Simple
                <span className="text-orange-500">Food</span>
              </Link>
            </h1>
            <Link href="/">
              <p className="text-sm text-gray-400 leading-3">ну дуже смачно</p>
            </Link>
          </div>
        </div>

        {/* Центральная часть */}

        <div className="mx-10 flex-1">
          <SearchInput />
        </div>

        {/* <nav className="flex justify-center gap-6 text-lg font-medium text-gray-600">
          <a href="/" className="hover:text-orange-500 transition">
            Головна
          </a>
          <a href="/menu" className="hover:text-orange-500 transition">
            Меню
          </a>
          <a href="/about" className="hover:text-orange-500 transition">
            Про нас
          </a>
          <a href="/contact" className="hover:text-orange-500 transition">
            Контакти
          </a>
        </nav> */}

        {/* Правая часть */}
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-1">
            <User />
            Вхід
          </Button>

          <div>
            <Button className="group relative">
              <b>0 ₴</b>
              <span className="h-full w-[1px] bg-white/30 mx-3" />

              <div className="flex items-center gap-1 ">
                <ShoppingCart className="h-4 w-4 " strokeWidth={2} />
                <b>3</b>
              </div>
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};
