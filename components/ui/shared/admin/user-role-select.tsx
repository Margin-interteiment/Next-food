"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@prisma/client";

export const UserRoleSelect: React.FC<{
  id: number;
  role: UserRole;
  disabled?: boolean;
}> = ({ id, role, disabled }) => {
  const router = useRouter();
  const [value, setValue] = React.useState<UserRole>(role);
  const [busy, setBusy] = React.useState(false);

  const onChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as UserRole;
    setValue(next);
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: next }),
      });
      if (!res.ok) throw new Error("Не вдалося оновити");
      router.refresh();
    } catch (e: any) {
      alert(e.message);
      setValue(role);
    } finally {
      setBusy(false);
    }
  };

  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled || busy}
      className="border rounded-md px-2 py-1 text-xs disabled:opacity-50"
    >
      <option value="USER">USER</option>
      <option value="ADMIN">ADMIN</option>
    </select>
  );
};
