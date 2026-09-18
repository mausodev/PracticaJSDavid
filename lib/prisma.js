import { PrismaClient } from "@prisma/client";

// Next dev recarga módulos: sin esto se acumulan conexiones.
const globalForPrisma = globalThis;

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
