import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sesionActual } from "@/lib/sesion";

export async function DELETE(_request, { params }) {
  const sesion = await sesionActual();
  if (!sesion) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { id } = await params;

  // si la entrada es de otro, no borra nada
  const { count } = await prisma.entrada.deleteMany({
    where: { id, userId: sesion.id },
  });

  if (!count) {
    return NextResponse.json({ error: "Entrada no encontrada" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
