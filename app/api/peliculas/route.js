import { NextResponse } from "next/server";
import { buscarPeliculas } from "@/lib/tmdb";
import { sesionActual } from "@/lib/sesion";

export async function GET(request) {
  if (!(await sesionActual())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();
  if (!q) {
    return NextResponse.json({ error: "Falta el parámetro q" }, { status: 400 });
  }

  try {
    return NextResponse.json(await buscarPeliculas(q, searchParams.get("page")));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
