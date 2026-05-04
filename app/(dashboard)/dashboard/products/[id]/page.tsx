import { notFound } from "next/navigation";
import { prisma } from "@/prisma/prisma-client";
import { ProductForm } from "@/components/ui/shared/admin/product-form";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const productId = Number(id);
  if (!Number.isFinite(productId)) return notFound();

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
      include: { items: true },
    }),
    prisma.category.findMany({ orderBy: { id: "asc" } }),
  ]);

  if (!product) return notFound();

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Редагувати товар</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  );
}
