"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  type Dict,
  type Locale,
  getDict,
} from "@/lib/i18n";

interface Ctx {
  locale: Locale;
  dict: Dict;
  t: (key: string) => string;
  setLocale: (next: Locale) => void;
}

const LocaleCtx = React.createContext<Ctx>({
  locale: DEFAULT_LOCALE,
  dict: getDict(DEFAULT_LOCALE),
  t: (k) => k,
  setLocale: () => {},
});

export const LocaleProvider: React.FC<{
  locale: Locale;
  dict: Dict;
  children: React.ReactNode;
}> = ({ locale, dict, children }) => {
  const router = useRouter();

  const setLocale = React.useCallback(
    (next: Locale) => {
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
      router.refresh();
    },
    [router]
  );

  const t = React.useCallback(
    (key: string) => dict[key] ?? key,
    [dict]
  );

  return (
    <LocaleCtx.Provider value={{ locale, dict, t, setLocale }}>
      {children}
    </LocaleCtx.Provider>
  );
};

export const useT = () => React.useContext(LocaleCtx);
