"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_META, type Locale } from "@/lib/i18n";
import { useT } from "@/components/providers/locale-provider";
import { cn } from "@/lib/utils";

export const LocaleSwitcher: React.FC = () => {
  const { locale, setLocale } = useT();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const meta = LOCALE_META[locale];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="h-9 px-3 rounded-md border bg-white hover:bg-gray-50 flex items-center gap-1 text-sm"
        aria-label="Language"
      >
        <span className="text-base leading-none">{meta.flag}</span>
        <span className="hidden md:inline uppercase font-semibold text-gray-600">
          {locale}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </button>

      <div
        className={cn(
          "absolute right-0 mt-2 w-44 bg-white border rounded-xl shadow-lg z-50 overflow-hidden",
          open ? "block" : "hidden"
        )}
      >
        {LOCALES.map((l) => {
          const m = LOCALE_META[l];
          const active = l === locale;
          return (
            <button
              key={l}
              onClick={() => {
                setLocale(l as Locale);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-2 w-full text-left text-sm hover:bg-gray-50",
                active && "bg-orange-50 text-orange-600"
              )}
            >
              <span className="text-base">{m.flag}</span>
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
