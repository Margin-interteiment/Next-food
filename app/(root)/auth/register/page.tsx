"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/shared";
import { Button, Input } from "@/components/ui";
import { useT } from "@/components/providers/locale-provider";

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useT();
  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Помилка реєстрації");
      router.push("/");
      router.refresh();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Container className="my-20 max-w-[420px]">
      <h1 className="text-3xl font-extrabold mb-6 text-center">{t("auth.register.title")}</h1>
      <form
        onSubmit={submit}
        className="bg-white border rounded-xl p-6 flex flex-col gap-4"
      >
        <Input
          placeholder={t("auth.fullname")}
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <Input
          type="email"
          placeholder={t("auth.email")}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder={t("auth.password")}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" disabled={busy} className="h-[44px]">
          {busy ? t("auth.register.busy") : t("auth.register.submit")}
        </Button>
        <p className="text-sm text-gray-500 text-center">
          {t("auth.register.have_account")}{" "}
          <Link href="/auth/login" className="text-orange-500 font-medium">
            {t("auth.login.submit")}
          </Link>
        </p>
      </form>
    </Container>
  );
}
