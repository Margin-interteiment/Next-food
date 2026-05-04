import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/ui/shared/logout-button";
import {
  LayoutDashboard,
  Package,
  Tag,
  ShoppingBag,
  Users,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "SimpleFood — Адмінка",
};

const NAV = [
  { href: "/dashboard", label: "Огляд", Icon: LayoutDashboard },
  { href: "/dashboard/products", label: "Товари", Icon: Package },
  { href: "/dashboard/categories", label: "Категорії", Icon: Tag },
  { href: "/dashboard/orders", label: "Замовлення", Icon: ShoppingBag },
  { href: "/dashboard/users", label: "Користувачі", Icon: Users },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  if (user.role !== "ADMIN") redirect("/");

  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="text-xl font-black uppercase">
            Simple<span className="text-orange-500">Food</span>
          </Link>
          <p className="text-xs text-gray-400 mt-1">Адмін-панель</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-sm"
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t flex flex-col gap-2">
          <p className="text-xs text-gray-400">
            {user.fullName}
            <br />
            {user.email}
          </p>
          <Link
            href="/"
            className="text-sm text-gray-500 flex items-center gap-1 hover:text-orange-500"
          >
            <ArrowLeft className="w-4 h-4" /> На сайт
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
