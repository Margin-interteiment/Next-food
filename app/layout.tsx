import { Nunito } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { getLocale } from "@/lib/locale-server";
import { getDict } from "@/lib/i18n";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();
  const dict = getDict(locale);

  return (
    <html lang={locale}>
      <head>
        <link data-rh="true" rel="icon" href="/logo.png"></link>
      </head>
      <body className={nunito.className}>
        <LocaleProvider locale={locale} dict={dict}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
