// src/config/prisma.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["error", "warn", "query"], // útil para debug
});

export default prisma;