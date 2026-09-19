import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sesionActual } from "@/lib/sesion";

const schema = z.object({
  tmdbId: z.number().int().positive(),
  title: z.string().trim().min(1),
  posterPath: z.string().nullish(),
  year: z.number().int().min(1878).max(2100).nullish(),
  watchedDate: z.coerce
    .date()
    .refine((d) => d <= new Date(), "No puedes registrar una fecha futura"),
  rating: z.number().min(0.5).max(5).multipleOf(0.5).nullish(),
  review: z.string().trim().max(5000).nullish(),
  rewatch: z.boolean().default(false),
});

export async function GET(request) {
  const params = new URL(request.url).searchParams;
  const user = params.get("user")?.trim();
  const tmdbId = params.get("tmdbId");

  // Al menos un filtro: sin esto sería un volcado de toda la tabla.
  if (!user && !tmdbId) {
    return NextResponse.json({ error: "Falta el parámetro user o tmdbId" }, { status: 400 });
  }

  const entradas = await prisma.entrada.findMany({
    where: {
      ...(user && { user: { user } }),
      ...(tmdbId && { tmdbId: Number(tmdbId) }),
    },
    orderBy: [{ watchedDate: "desc" }, { createdAt: "desc" }],
    include: { user: { select: { user: true } } },
  });

  return NextResponse.json({ entradas });
}

export async function POST(request) {
  const sesion = await sesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const datos = schema.safeParse(await request.json().catch(() => null));
  if (!datos.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: z.flattenError(datos.error).fieldErrors },
      { status: 400 },
    );
  }

  const entrada = await prisma.entrada.create({
    data: { ...datos.data, userId: sesion.id },
  });

  return NextResponse.json({ entrada }, { status: 201 });
}
