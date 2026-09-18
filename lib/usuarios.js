import bcrypt from "bcryptjs";
import { prisma } from "./prisma.js";

const ROUNDS = 10;

export async function registrarUsuario(user, password) {
  const existe = await prisma.usuario.findUnique({ where: { user } });
  if (existe) throw new Error("El usuario ya está registrado");

  return prisma.usuario.create({
    data: { user, password: await bcrypt.hash(password, ROUNDS) },
    select: { id: true, user: true, createdAt: true },
  });
}

export async function verificarCredenciales(user, password) {
  const usuario = await prisma.usuario.findUnique({ where: { user } });
  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    return null;
  }

  const { password: _, ...sinPassword } = usuario;
  return sinPassword;
}
