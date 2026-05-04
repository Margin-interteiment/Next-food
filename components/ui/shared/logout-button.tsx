"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { LogOut } from "lucide-react";

export const LogoutButton: React.FC = () => {
  const router = useRouter();
  const [busy, setBusy] = React.useState(false);

  const onClick = async () => {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={onClick} disabled={busy}>
      <LogOut className="w-4 h-4 mr-2" />
      Вийти
    </Button>
  );
};
