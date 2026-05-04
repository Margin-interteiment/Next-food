"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { DeleteRow } from "./delete-row";

interface Cat {
  id: number;
  name: string;
  productCount: number;
}

export const CategoriesAdmin: React.FC<{ categories: Cat[] }> = ({
  categories,
}) => {
  const router = useRouter();
  const [name, setName] = React.useState("");
  const [busy, setBusy] = React.useState(false);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Помилка");
      }
      setName("");
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Назва</th>
              <th className="text-left p-3">Товарів</th>
              <th className="text-right p-3">Дії</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="p-3 font-bold">{c.id}</td>
                <td className="p-3">{c.name}</td>
                <td className="p-3 text-gray-500">{c.productCount}</td>
                <td className="p-3 text-right">
                  <DeleteRow id={c.id} resource="categories" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={create}
        className="bg-white border rounded-xl p-5 h-fit flex flex-col gap-3"
      >
        <p className="font-bold">Нова категорія</p>
        <Input
          placeholder="Назва"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit" disabled={busy}>
          {busy ? "..." : "Додати"}
        </Button>
      </form>
    </div>
  );
};
