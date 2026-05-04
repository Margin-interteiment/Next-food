import { prisma } from "@/prisma/prisma-client";
import { Package, Tag, ShoppingBag, Users, TrendingUp } from "lucide-react";

export default async function DashboardOverview() {
  const [products, categories, orders, users, revenueAgg] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: "SUCCEEDED" },
    }),
  ]);

  const recent = await prisma.order.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
  });

  const cards = [
    { label: "Товарів", value: products, Icon: Package },
    { label: "Категорій", value: categories, Icon: Tag },
    { label: "Замовлень", value: orders, Icon: ShoppingBag },
    { label: "Користувачів", value: users, Icon: Users },
    {
      label: "Виручка",
      value: `${revenueAgg._sum.totalAmount ?? 0} ₴`,
      Icon: TrendingUp,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Огляд</h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {cards.map(({ label, value, Icon }) => (
          <div
            key={label}
            className="bg-white border rounded-xl p-5 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <p className="text-xl font-extrabold">{value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-3">Останні замовлення</h2>
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">№</th>
              <th className="text-left p-3">Клієнт</th>
              <th className="text-left p-3">Сума</th>
              <th className="text-left p-3">Статус</th>
              <th className="text-left p-3">Дата</th>
            </tr>
          </thead>
          <tbody>
            {recent.length === 0 && (
              <tr>
                <td className="p-4 text-gray-400 text-center" colSpan={5}>
                  Замовлень ще немає
                </td>
              </tr>
            )}
            {recent.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3 font-bold">#{o.id}</td>
                <td className="p-3">{o.fullName}</td>
                <td className="p-3">{o.totalAmount} ₴</td>
                <td className="p-3">{o.status}</td>
                <td className="p-3 text-gray-500">
                  {new Date(o.createdAt).toLocaleString("uk-UA")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
