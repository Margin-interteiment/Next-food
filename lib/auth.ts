import "server-only";
import { cookies } from "next/headers";
import {
  createHmac,
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "crypto";
import { prisma } from "@/prisma/prisma-client";
import type { User } from "@prisma/client";

const SECRET = process.env.AUTH_SECRET || "dev-secret-change-me";
const COOKIE_NAME = "sf_session";
const SESSION_TTL_DAYS = 30;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const expected = Buffer.from(hash, "hex");
  const got = scryptSync(password, salt, 64);
  if (expected.length !== got.length) return false;
  return timingSafeEqual(expected, got);
}

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("hex");
}

interface SessionPayload {
  uid: number;
  exp: number;
}

export function createSessionToken(userId: number): string {
  const exp = Date.now() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1000;
  const body: SessionPayload = { uid: userId, exp };
  const json = Buffer.from(JSON.stringify(body)).toString("base64url");
  const sig = sign(json);
  return `${json}.${sig}`;
}

export function readSessionToken(token: string): SessionPayload | null {
  const [json, sig] = token.split(".");
  if (!json || !sig) return null;
  if (sign(json) !== sig) return null;
  try {
    const body = JSON.parse(
      Buffer.from(json, "base64url").toString("utf8")
    ) as SessionPayload;
    if (body.exp < Date.now()) return null;
    return body;
  } catch {
    return null;
  }
}

export async function setSessionCookie(userId: number) {
  const token = createSessionToken(userId);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60,
  });
}

export function clearSessionCookie() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export async function getCurrentUser(): Promise<User | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  const payload = readSessionToken(token);
  if (!payload) return null;
  return prisma.user.findUnique({ where: { id: payload.uid } });
}

export async function requireUser(): Promise<User> {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireAdmin(): Promise<User> {
  const user = await requireUser();
  if (user.role !== "ADMIN") throw new Error("FORBIDDEN");
  return user;
}
