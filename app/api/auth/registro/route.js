import { NextResponse } from "next/server";
import { z } from "zod";
import { COOKIE_SESION, opcionesCookie } from "@/lib/cookie";
import { crearToken } from "@/lib/jwt";
import { registrarUsuario } from "@/lib/usuarios";

const schema = z.object({
  user: z
    .string()
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres"),
  password: z.string().min(8, "Mínimo 8 caracteres").max(22),
});

export async function POST(request) {
  const datos = schema.safeParse(await request.json().catch(() => null));
  if (!datos.success) {
    return NextResponse.json(
      { error: "Datos inválidos", detalles: z.flattenError(datos.error).fieldErrors },
      { status: 400 },
    );
  }

  let usuario;
  try {
    usuario = await registrarUsuario(datos.data.user, datos.data.password);
  } catch {
    return NextResponse.json({ error: "El usuario ya está registrado" }, { status: 409 });
  }

  const res = NextResponse.json({ usuario }, { status: 201 });
  res.cookies.set(COOKIE_SESION, await crearToken(usuario), opcionesCookie);
  return res;
}
