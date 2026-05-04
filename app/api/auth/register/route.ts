import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { hashPassword, setSessionCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { fullName, email, password } = await req.json();
    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Усі поля обовʼязкові" },
        { status: 400 }
      );
    }
    if (String(password).length < 6) {
      return NextResponse.json(
        { error: "Пароль має містити щонайменше 6 символів" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "Користувач з таким email вже існує" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashPassword(password),
        verified: new Date(),
      },
    });

    await setSessionCookie(user.id);
    return NextResponse.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json({ error: "Помилка сервера" }, { status: 500 });
  }
}
