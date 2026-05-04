import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { getCurrentUser } from "@/lib/auth";
import { randomBytes } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, address, comment, items, totalAmount } =
      body ?? {};

    if (!fullName || !email || !phone || !address) {
      return NextResponse.json(
        { error: "Невірні дані замовлення" },
        { status: 400 }
      );
    }
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "Кошик порожній" }, { status: 400 });
    }

    const user = await getCurrentUser();

    const order = await prisma.order.create({
      data: {
        ...(user ? { userId: user.id } : {}),
        token: randomBytes(16).toString("hex"),
        totalAmount: Number(totalAmount) || 0,
        status: "PENDING",
        items: items as any,
        fullName,
        email,
        address,
        phone,
        comment: comment || null,
      } as any,
    });

    return NextResponse.json({ id: order.id });
  } catch (e: any) {
    console.error("checkout error", e);
    return NextResponse.json(
      { error: "Внутрішня помилка сервера" },
      { status: 500 }
    );
  }
}
