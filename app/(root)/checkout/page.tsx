"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/shared";
import { Button, Input } from "@/components/ui";
import { useCartStore } from "@/store/cart";
import { useT } from "@/components/providers/locale-provider";

export default function CheckoutPage() {
  const router = useRouter();
  const { t } = useT();
  const items = useCartStore((s) => s.items);
  const total = useCartStore((s) => s.totalAmount());
  const clear = useCartStore((s) => s.clear);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [form, setForm] = React.useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName || !form.email || !form.phone || !form.address) {
      setError("Заповніть усі обовʼязкові поля");
      return;
    }
    if (items.length === 0) {
      setError("Кошик порожній");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, items, totalAmount: total }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Не вдалось оформити замовлення");
      }
      const data = await res.json();
      clear();
      router.push(`/checkout/success?id=${data.id}`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted) {
    return <Container className="my-10">{t("common.loading")}</Container>;
  }

  return (
    <Container className="my-10">
      <h1 className="text-3xl font-extrabold mb-6">{t("checkout.title")}</h1>

      <form
        onSubmit={submit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8"
      >
        <div className="bg-white border rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-xl font-bold">{t("checkout.contact")}</h2>
          <Input
            placeholder={t("checkout.fullname")}
            value={form.fullName}
            onChange={onChange("fullName")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="email"
              placeholder={t("checkout.email")}
              value={form.email}
              onChange={onChange("email")}
            />
            <Input
              placeholder={t("checkout.phone")}
              value={form.phone}
              onChange={onChange("phone")}
            />
          </div>

          <h2 className="text-xl font-bold mt-4">{t("checkout.address")}</h2>
          <Input
            placeholder={t("checkout.address.placeholder")}
            value={form.address}
            onChange={onChange("address")}
          />
          <textarea
            className="w-full min-h-[80px] rounded-md border border-input px-3 py-2 text-sm"
            placeholder={t("checkout.comment")}
            value={form.comment}
            onChange={onChange("comment")}
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        <aside className="bg-white border rounded-xl p-6 h-fit sticky top-4">
          <h2 className="text-xl font-bold mb-4">{t("checkout.summary")}</h2>
          <ul className="flex flex-col gap-2 mb-4 max-h-[260px] overflow-auto">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between text-sm">
                <span className="truncate pr-2">
                  {i.name} × {i.quantity}
                </span>
                <span className="font-bold">{i.price * i.quantity} ₴</span>
              </li>
            ))}
          </ul>
          <div className="border-t my-3"></div>
          <div className="flex justify-between text-2xl font-extrabold mb-5">
            <span>{t("cart.total")}</span>
            <span>{total} ₴</span>
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-[52px] text-base rounded-xl"
          >
            {submitting ? t("checkout.submitting") : t("checkout.submit")}
          </Button>
        </aside>
      </form>
    </Container>
  );
}
