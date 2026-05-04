import { prisma } from "@/prisma/prisma-client";
import { ProductForm } from "@/components/ui/shared/admin/product-form";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { id: "asc" } });
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Новий товар</h1>
      <ProductForm categories={categories} />
    </div>
  );
}
