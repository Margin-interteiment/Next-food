import { Container } from "@/components/ui/shared";
import { ChooseProductForm } from "@/components/ui/shared/choose-product-form";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: { ingredients: true, items: true },
  });

  if (!product) return notFound();

  return (
    <Container className="my-10">
      <div className="flex bg-white rounded-2xl overflow-hidden shadow-sm border">
        <ChooseProductForm
          productId={product.id}
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.items}
        />
      </div>
    </Container>
  );
}
