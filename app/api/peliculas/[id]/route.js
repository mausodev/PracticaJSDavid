import { NextResponse } from "next/server";
import { obtenerPelicula } from "@/lib/tmdb";

export async function GET(_request, { params }) {
  const { id } = await params;

  try {
    return NextResponse.json(await obtenerPelicula(id));
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }
}
