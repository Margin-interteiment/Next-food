import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/ui/shared/header";
import { Footer } from "@/components/ui/shared/footer";

export const metadata: Metadata = {
  title: "SimpleFood",
  description: "Інтернет-магазин доставки їжі",
};

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
      {modal}
    </main>
  );
}
