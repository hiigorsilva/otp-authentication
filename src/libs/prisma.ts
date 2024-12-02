import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
const prisma = globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
export const db = prisma

/* 
Esse código cria uma única instância do PrismaClient e a reutiliza,
evitando múltiplas instâncias durante o desenvolvimento, especialmente em
com hot reloading
*/
