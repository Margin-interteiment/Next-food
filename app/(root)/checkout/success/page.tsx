import Link from "next/link";
import { Container } from "@/components/ui/shared";
import { Button } from "@/components/ui";
import { CheckCircle2 } from "lucide-react";
import { prisma } from "@/prisma/prisma-client";
import { getServerDict } from "@/lib/locale-server";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const t = getServerDict();
  const id = searchParams.id ? Number(searchParams.id) : NaN;
  const order = Number.isFinite(id)
    ? await prisma.order.findUnique({ where: { id } })
    : null;

  return (
    <Container className="my-20 flex flex-col items-center text-center gap-4 max-w-[640px]">
      <CheckCircle2 className="w-16 h-16 text-green-500" />
      <h1 className="text-3xl font-extrabold">{t["success.title"]}</h1>
      {order ? (
        <p className="text-gray-500">
          {order.fullName} — №{order.id} · <b>{order.totalAmount} ₴</b> · {order.phone}
        </p>
      ) : (
        <p className="text-gray-500">{t["success.thanks"]}</p>
      )}
      <div className="flex gap-3 mt-4">
        <Link href="/">
          <Button>{t["success.home"]}</Button>
        </Link>
        <Link href="/profile">
          <Button variant="outline">{t["success.orders"]}</Button>
        </Link>
      </div>
    </Container>
  );
}
