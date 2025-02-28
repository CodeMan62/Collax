import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();
const PrismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof PrismaClientSingleton>;
}

const prisma = globalThis.prisma ?? PrismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
