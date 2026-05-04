import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { requireAdmin } from "@/lib/auth";
import type { OrderStatus } from "@prisma/client";

const VALID: OrderStatus[] = ["PENDING", "SUCCEEDED", "CANCELLED"];

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const { status } = await req.json();
    if (!VALID.includes(status)) {
      return NextResponse.json({ error: "Невірний статус" }, { status: 400 });
    }
    await prisma.order.update({
      where: { id: Number(id) },
      data: { status },
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") {
      return NextResponse.json({ error: e.message }, { status: 403 });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    await prisma.order.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e.message === "UNAUTHORIZED" || e.message === "FORBIDDEN") {
      return NextResponse.json({ error: e.message }, { status: 403 });
    }
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
