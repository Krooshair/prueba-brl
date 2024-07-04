import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getSecretKey = async(id: number): Promise<string | null> => {
  const admin = await prisma.admin.findUnique({
    where: {
      id,
      status: 'Habilitado',
    },
    select: {
      secretKey: true,
    },
  });

  if (!admin) return null;

  return admin.secretKey;
};