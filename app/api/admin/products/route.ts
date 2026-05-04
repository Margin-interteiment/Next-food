import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { name, text, imageUrl, categoryId, price } = await req.json();
    if (!name || !imageUrl || !categoryId) {
      return NextResponse.json({ error: "Невірні дані" }, { status: 400 });
    }
    const product = await prisma.product.create({
      data: {
        name,
        text: text ?? "",
        imageUrl,
        categoryId: Number(categoryId),
        items: price
          ? { create: [{ price: Number(price) }] }
          : undefined,
      },
    });
    return NextResponse.json(product);
  } catch (e: any) {
    if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") {
      return NextResponse.json({ error: e.message }, { status: 403 });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
