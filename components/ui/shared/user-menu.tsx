"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { User as UserIcon } from "./user";
import { ChevronDown, LogOut, ShieldCheck, Package } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/components/providers/locale-provider";

interface Props {
  fullName: string;
  role: string;
}

export const UserMenu: React.FC<Props> = ({ fullName, role }) => {
  const router = useRouter();
  const { t } = useT();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  const firstName = fullName.split(" ")[0] || fullName;

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1"
      >
        <UserIcon />
        {firstName}
        <ChevronDown className="w-4 h-4 ml-1" />
      </Button>

      <div
        className={cn(
          "absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg z-50 overflow-hidden",
          open ? "block" : "hidden"
        )}
      >
        <Link
          href="/profile"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
        >
          <Package className="w-4 h-4" />
          {t("nav.profile")}
        </Link>
        {role === "ADMIN" && (
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50"
          >
            <ShieldCheck className="w-4 h-4" />
            {t("nav.admin")}
          </Link>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50 w-full text-left text-red-500"
        >
          <LogOut className="w-4 h-4" />
          {t("nav.logout")}
        </button>
      </div>
    </div>
  );
};
