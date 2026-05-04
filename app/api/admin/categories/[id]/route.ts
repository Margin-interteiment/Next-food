import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { requireAdmin } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const catId = Number(id);
    const count = await prisma.product.count({ where: { categoryId: catId } });
    if (count > 0) {
      return NextResponse.json(
        { error: "Не можна видалити категорію з товарами" },
        { status: 400 }
      );
    }
    await prisma.category.delete({ where: { id: catId } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") {
      return NextResponse.json({ error: e.message }, { status: 403 });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
