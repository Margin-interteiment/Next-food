import Link from "next/link";
import { prisma } from "@/prisma/prisma-client";
import { DeleteRow } from "@/components/ui/shared/admin/delete-row";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { category: true, items: true },
    orderBy: { id: "asc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-extrabold">Товари</h1>
        <Link
          href="/dashboard/products/new"
          className="bg-orange-500 text-white px-4 py-2 rounded-md text-sm hover:bg-orange-600"
        >
          + Додати товар
        </Link>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Зображення</th>
              <th className="text-left p-3">Назва</th>
              <th className="text-left p-3">Категорія</th>
              <th className="text-left p-3">Варіантів</th>
              <th className="text-left p-3">Ціна від</th>
              <th className="text-right p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-bold">{p.id}</td>
                <td className="p-3">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-12 h-12 object-contain"
                  />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-gray-500">{p.category?.name ?? "—"}</td>
                <td className="p-3">{p.items.length}</td>
                <td className="p-3">
                  {p.items[0]?.price ? `${p.items[0].price} ₴` : "—"}
                </td>
                <td className="p-3 text-right flex justify-end gap-3">
                  <Link
                    href={`/dashboard/products/${p.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Редагувати
                  </Link>
                  <DeleteRow id={p.id} resource="products" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
