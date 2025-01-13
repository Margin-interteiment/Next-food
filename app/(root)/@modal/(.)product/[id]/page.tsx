import { Container } from "@/components/ui/shared";
import { GroupVariants } from "@/components/ui/shared/group-variants";
import { ChooseProductModal } from "@/components/ui/shared/modals";
import { ProductImage } from "@/components/ui/shared/product-image";
import { prisma } from "@/prisma/prisma-client";
import { Dialog, Title } from "@radix-ui/react-dialog";
import { notFound } from "next/navigation";

export default async function ProductModalPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
