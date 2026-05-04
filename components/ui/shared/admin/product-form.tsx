"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import type { Category, Product, ProductItem } from "@prisma/client";

interface Props {
  categories: Category[];
  product?: Product & { items: ProductItem[] };
}

export const ProductForm: React.FC<Props> = ({ categories, product }) => {
  const router = useRouter();
  const [form, setForm] = React.useState({
    name: product?.name ?? "",
    text: product?.text ?? "",
    imageUrl: product?.imageUrl ?? "",
    categoryId: product?.categoryId ?? categories[0]?.id ?? 1,
    price: product?.items?.[0]?.price ?? 150,
  });
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const url = product
        ? `/api/admin/products/${product.id}`
        : `/api/admin/products`;
      const method = product ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          categoryId: Number(form.categoryId),
          price: Number(form.price),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Помилка збереження");
      }
      router.push("/dashboard/products");
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white border rounded-xl p-6 max-w-[640px] flex flex-col gap-4"
    >
      <Input
        placeholder="Назва"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <textarea
        placeholder="Опис"
        className="w-full min-h-[80px] rounded-md border px-3 py-2 text-sm"
        value={form.text}
        onChange={(e) => setForm({ ...form, text: e.target.value })}
      />
      <Input
        placeholder="URL зображення (наприклад /burger-1.png)"
        value={form.imageUrl}
        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
      />

      <label className="text-sm">
        <span className="block mb-1 text-gray-500">Категорія</span>
        <select
          className="w-full h-9 rounded-md border px-2"
          value={form.categoryId}
          onChange={(e) =>
            setForm({ ...form, categoryId: Number(e.target.value) })
          }
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="block mb-1 text-gray-500">
          {product ? "Ціна базового варіанта" : "Базова ціна (створить ProductItem)"}
        </span>
        <Input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
      </label>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? "Збереження..." : "Зберегти"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Скасувати
        </Button>
      </div>
    </form>
  );
};
