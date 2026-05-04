import Link from "next/link";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui";
import { prisma } from "@/prisma/prisma-client";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/ui/shared/logout-button";
import { getServerDict, getLocale } from "@/lib/locale-server";

const LOCALE_TAG: Record<string, string> = {
  uk: "uk-UA",
  en: "en-GB",
  pl: "pl-PL",
  de: "de-DE",
};

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");

  const t = getServerDict();
  const locale = getLocale();

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <Container className="my-10">
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-extrabold">{t["profile.title"]}</h1>
          <p className="text-gray-500">
            {user.fullName} · {user.email}
          </p>
          {user.role === "ADMIN" && (
            <Link href="/dashboard" className="text-orange-500 text-sm">
              {t["profile.go_admin"]}
            </Link>
          )}
        </div>
        <LogoutButton />
      </div>

      <h2 className="text-2xl font-bold mb-4">{t["profile.my_orders"]}</h2>

      {orders.length === 0 ? (
        <div className="bg-white border rounded-xl p-8 text-center text-gray-500">
          {t["profile.no_orders"]}
          <div className="mt-3">
            <Link href="/">
              <Button variant="outline">{t["profile.start_ordering"]}</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((o) => (
            <div
              key={o.id}
              className="bg-white border rounded-xl p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-bold">{t["profile.order"]} №{o.id}</p>
                <p className="text-sm text-gray-500">
                  {new Date(o.createdAt).toLocaleString(LOCALE_TAG[locale] ?? "uk-UA")} · {o.address}
                </p>
              </div>
              <div className="text-right">
                <p className="font-extrabold">{o.totalAmount} ₴</p>
                <p className="text-xs text-gray-500">
                  {t[`profile.status.${o.status}`] ?? o.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
