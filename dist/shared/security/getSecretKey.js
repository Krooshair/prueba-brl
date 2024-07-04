"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecretKey = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getSecretKey = async (id) => {
    const admin = await prisma.admin.findUnique({
        where: {
            id,
            status: 'Habilitado',
        },
        select: {
            secretKey: true,
        },
    });
    if (!admin)
        return null;
    return admin.secretKey;
};
exports.getSecretKey = getSecretKey;
