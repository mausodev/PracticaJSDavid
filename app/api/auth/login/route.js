import { NextResponse } from "next/server";
import { z } from "zod";
import { COOKIE_SESION, opcionesCookie } from "@/lib/cookie";
import { crearToken } from "@/lib/jwt";
import { verificarCredenciales } from "@/lib/usuarios";


const schema = z.object({
  user: z.string().trim().min(1),
  password: z.string().min(1),
});

export async function POST(request) {
  const datos = schema.safeParse(await request.json().catch(() => null));
  if (!datos.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const usuario = await verificarCredenciales(datos.data.user, datos.data.password);
  if (!usuario) {
    return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 });
  }

  const res = NextResponse.json({ usuario });
  res.cookies.set(COOKIE_SESION, await crearToken(usuario), opcionesCookie);
  return res;
}
