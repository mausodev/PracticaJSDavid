import { cookies } from "next/headers";
import { COOKIE_SESION } from "./cookie";
import { verificarToken } from "./jwt";

export async function sesionActual() {
  const token = (await cookies()).get(COOKIE_SESION)?.value;
  return token ? verificarToken(token) : null;
}
