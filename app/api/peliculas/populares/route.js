import { NextResponse } from "next/server";
import { obtenerPopulares } from "@/lib/tmdb";

export async function GET(request) {
  const page = new URL(request.url).searchParams.get("page");

  try {
    return NextResponse.json(await obtenerPopulares(page));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
