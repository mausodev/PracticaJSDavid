import { NextResponse } from "next/server";
import { obtenerSimilares } from "@/lib/tmdb";

export async function GET(request, { params }) {
  const { id } = await params;
  const page = new URL(request.url).searchParams.get("page");

  try {
    return NextResponse.json(await obtenerSimilares(id, page));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
