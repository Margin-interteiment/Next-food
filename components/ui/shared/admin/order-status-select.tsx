"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { OrderStatus } from "@prisma/client";

const OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "PENDING", label: "Очікує" },
  { value: "SUCCEEDED", label: "Виконано" },
  { value: "CANCELLED", label: "Скасовано" },
];

export const OrderStatusSelect: React.FC<{
  id: number;
  status: OrderStatus;
}> = ({ id, status }) => {
  const router = useRouter();
  const [value, setValue] = React.useState<OrderStatus>(status);
  const [busy, setBusy] = React.useState(false);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as OrderStatus;
    setValue(next);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      if (!res.ok) throw new Error("Не вдалося оновити");
      router.refresh();
    } catch (e: any) {
      alert(e.message);
      setValue(status);
    } finally {
      setBusy(false);
    }
  };

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={busy}
      className="border rounded-md px-2 py-1 text-xs"
    >
      {OPTIONS.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
};
