import { prisma } from "@/prisma/prisma-client";
import { OrderStatusSelect } from "@/components/ui/shared/admin/order-status-select";
import { DeleteRow } from "@/components/ui/shared/admin/delete-row";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Замовлення</h1>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">№</th>
              <th className="text-left p-3">Клієнт</th>
              <th className="text-left p-3">Контакти</th>
              <th className="text-left p-3">Адреса</th>
              <th className="text-left p-3">Сума</th>
              <th className="text-left p-3">Статус</th>
              <th className="text-left p-3">Дата</th>
              <th className="text-right p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td className="p-4 text-gray-400 text-center" colSpan={8}>
                  Замовлень ще немає
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="p-3 font-bold">#{o.id}</td>
                <td className="p-3">{o.fullName}</td>
                <td className="p-3 text-gray-500">
                  {o.email}
                  <br />
                  {o.phone}
                </td>
                <td className="p-3 text-gray-500">{o.address}</td>
                <td className="p-3 font-bold">{o.totalAmount} ₴</td>
                <td className="p-3">
                  <OrderStatusSelect id={o.id} status={o.status} />
                </td>
                <td className="p-3 text-gray-500 text-xs">
                  {new Date(o.createdAt).toLocaleString("uk-UA")}
                </td>
                <td className="p-3 text-right">
                  <DeleteRow id={o.id} resource="orders" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
