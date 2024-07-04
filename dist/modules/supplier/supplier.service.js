"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class SupplierService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getSupplier() {
        const supplier = await this.prisma.supplier.findMany({
            where: {
                status: 'Habilitado'
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true
            }
        });
        return supplier;
    }
    async getSupplierById(id) {
        const supplier = await this.prisma.supplier.findUnique({
            where: {
                id,
                status: 'Habilitado'
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                business: {
                    select: {
                        id: true,
                        codeBusiness: true
                    }
                }
            }
        });
        return supplier ? supplier : null;
    }
    async getSupplierByDocument(documentNumber) {
        const supplier = await this.prisma.supplier.findFirst({
            where: {
                documentNumber,
                status: 'Habilitado'
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                business: {
                    select: {
                        id: true,
                        codeBusiness: true
                    }
                }
            }
        });
        return supplier ? supplier : null;
    }
    async getSupplierByEmail(email) {
        const supplier = await this.prisma.supplier.findFirst({
            where: {
                email,
                status: 'Habilitado'
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                business: {
                    select: {
                        id: true,
                        codeBusiness: true
                    }
                }
            }
        });
        return supplier ? supplier : null;
    }
    async postSupplier(supplier) {
        const newSupplier = await this.prisma.supplier.create({
            data: {
                fullName: supplier.fullName,
                documentType: supplier.documentType,
                documentNumber: supplier.documentNumber,
                email: supplier.email,
                phone: supplier.phone
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true
            }
        });
        return newSupplier;
    }
    async putSupplier(id, supplier) {
        const updSupplier = await this.prisma.supplier.update({
            where: {
                id,
                status: 'Habilitado'
            },
            data: {
                fullName: supplier.fullName,
                documentType: supplier.documentType,
                documentNumber: supplier.documentNumber,
                email: supplier.email,
                phone: supplier.phone
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true
            }
        });
        return updSupplier;
    }
    async deleteSupplier(id) {
        await this.prisma.supplier.update({
            where: {
                id,
                status: 'Habilitado'
            },
            data: {
                status: 'Deshabilitado'
            }
        });
        return 'Proveedor borrado exitosamente!';
    }
}
exports.default = SupplierService;
