import { jwtVerify, SignJWT } from "jose";

const ALG = "HS256";
const DURACION = "7d";

const secret = () => {
  if (!process.env.JWT_SECRET) throw new Error("Falta JWT_SECRET en el entorno");
  return new TextEncoder().encode(process.env.JWT_SECRET);
};

export function crearToken({ id, user }) {
  return new SignJWT({ user })
    .setProtectedHeader({ alg: ALG })
    .setSubject(id)
    .setIssuedAt()
    .setExpirationTime(DURACION)
    .sign(secret());
}

export async function verificarToken(token) {
  try {
    const { payload } = await jwtVerify(token, secret(), { algorithms: [ALG] });
    return { id: payload.sub, user: payload.user };
  } catch {
    return null;
  }
}
