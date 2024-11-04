// src/database/Prisma.ts

import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

let prisma: any = null;

export const getPrismaClient = (datasourceUrl: string) => {
    if (!prisma) {
      prisma = new PrismaClient({
        datasourceUrl,
      }).$extends(withAccelerate());
    }
    return prisma;
  };
