import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const { name } = await req.json();
    if (!name?.trim()) {
      return NextResponse.json({ error: "Введіть назву" }, { status: 400 });
    }
    const cat = await prisma.category.create({ data: { name: name.trim() } });
    return NextResponse.json(cat);
  } catch (e: any) {
    if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") {
      return NextResponse.json({ error: e.message }, { status: 403 });
    }
    if (String(e.code) === "P2002") {
      return NextResponse.json(
        { error: "Категорія з такою назвою вже існує" },
        { status: 409 }
      );
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
