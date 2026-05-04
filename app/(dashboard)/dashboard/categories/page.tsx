import { prisma } from "@/prisma/prisma-client";
import { CategoriesAdmin } from "@/components/ui/shared/admin/categories-admin";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { id: "asc" },
  });
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6">Категорії</h1>
      <CategoriesAdmin
        categories={categories.map((c) => ({
          id: c.id,
          name: c.name,
          productCount: c._count.products,
        }))}
      />
    </div>
  );
}
