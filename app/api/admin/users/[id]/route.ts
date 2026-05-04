import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
import type { UserRole } from "@prisma/client";

const VALID: UserRole[] = ["USER", "ADMIN"];

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await requireAdmin();
    const { role } = await req.json();
    if (!VALID.includes(role)) {
      return NextResponse.json({ error: "Невірна роль" }, { status: 400 });
    }
    await prisma.user.update({
      where: { id: Number(id) },
      data: { role },
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
    const me = await getCurrentUser();
    if (!me || me.role !== "ADMIN") {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }
    const userId = Number(id);
    if (userId === me.id) {
      return NextResponse.json(
        { error: "Не можна видалити власний акаунт" },
        { status: 400 }
      );
    }
    await prisma.order.deleteMany({ where: { userId } });
    await prisma.cart.deleteMany({ where: { userId } });
    await prisma.verificationCode.deleteMany({ where: { userId } });
    await prisma.user.delete({ where: { id: userId } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
