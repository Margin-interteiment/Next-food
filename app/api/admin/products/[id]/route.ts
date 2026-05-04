import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { requireAdmin } from "@/lib/auth";

const handle = (e: any) => {
  if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") {
    return NextResponse.json({ error: e.message }, { status: 403 });
  }
  console.error(e);
  return NextResponse.json({ error: "Server error" }, { status: 500 });
};

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const productId = Number(id);
    const { name, text, imageUrl, categoryId, price } = await req.json();

    await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        text,
        imageUrl,
        categoryId: Number(categoryId),
      },
    });

    if (price !== undefined && price !== null) {
      const first = await prisma.productItem.findFirst({
        where: { productId },
        orderBy: { id: "asc" },
      });
      if (first) {
        await prisma.productItem.update({
          where: { id: first.id },
          data: { price: Number(price) },
        });
      } else {
        await prisma.productItem.create({
          data: { productId, price: Number(price) },
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return handle(e);
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const productId = Number(id);
    await prisma.productItem.deleteMany({ where: { productId } });
    await prisma.product.delete({ where: { id: productId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return handle(e);
  }
}
