"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  resource: "products" | "categories" | "orders" | "users";
}

export const DeleteRow: React.FC<Props> = ({ id, resource }) => {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);

  const onClick = async () => {
    if (!confirm("Видалити запис?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/${resource}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Не вдалось видалити");
      }
      router.refresh();
    } catch (e: any) {
      alert(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="text-red-500 hover:underline disabled:opacity-50"
    >
      {busy ? "..." : "Видалити"}
    </button>
  );
};
