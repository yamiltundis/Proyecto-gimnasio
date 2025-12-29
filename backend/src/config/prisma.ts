// src/config/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import 'dotenv/config'

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
   port: 3307,             
  connectionLimit: 10,
});

const prisma = new PrismaClient({
  adapter,
  log: ["error", "warn", "query"], // útil para debug
});

export default prisma;