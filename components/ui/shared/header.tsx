import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { Button } from "..";
import { User as UserIcon } from "./user";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { UserMenu } from "./user-menu";
import { LocaleSwitcher } from "./locale-switcher";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { getServerDict } from "@/lib/locale-server";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = async ({ className }) => {
  const user = await getCurrentUser();
  const t = getServerDict();

  return (
    <header className={cn("border-b", className)}>
      <Container className="flex items-center justify-between gap-6 py-6">
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
              <p className="text-sm text-gray-400 leading-3">{t["tagline"]}</p>
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-[480px]">
          <SearchInput />
        </div>

        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium text-gray-600">
          <Link href="/promotions" className="hover:text-orange-500">
            {t["nav.promotions"]}
          </Link>
          <Link href="/delivery" className="hover:text-orange-500">
            {t["nav.delivery"]}
          </Link>
          <Link href="/about" className="hover:text-orange-500">
            {t["nav.about"]}
          </Link>
          <Link href="/faq" className="hover:text-orange-500">
            {t["nav.faq"]}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          {user ? (
            <UserMenu fullName={user.fullName} role={user.role} />
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" className="flex items-center gap-1">
                <UserIcon />
                {t["nav.login"]}
              </Button>
            </Link>
          )}
          <CartButton />
        </div>
      </Container>
    </header>
  );
};
