import { NextResponse } from "next/server";
import { COOKIE_SESION } from "@/lib/cookie";

export async function POST() {
  const res = new NextResponse(null, { status: 204 });
  res.cookies.delete(COOKIE_SESION);
  return res;
}
