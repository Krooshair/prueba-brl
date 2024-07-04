"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class SaleService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Consulta para obtener todos las ventas existentes
     * @returns Retorna la lista de ventas existentes
     */
    async getSale(statusSale) {
        const sale = await this.prisma.sale.findMany({
            where: {
                statusSale,
                status: 'Habilitado',
            },
            select: {
                id: true,
                codeSale: true,
                deliveryType: true,
                bills: true,
                totalAmount: true,
                statusSale: true,
            },
        });
        return sale;
    }
    /**
     * Consulta para buscar una venta existente por su id
     * @param id Identificador para ubicar la venta buscada
     * @returns Retorna la venta buscada o un valor nulo
     */
    async getSaleById(id) {
        const sale = await this.prisma.sale.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
            select: {
                id: true,
                codeSale: true,
                deliveryType: true,
                agency: true,
                region: true,
                province: true,
                district: true,
                direction: true,
                reference: true,
                bills: true,
                guide: true,
                totalAmount: true,
                statusSale: true,
                status: true,
                admin: {
                    select: {
                        id: true,
                        fullName: true,
                        documentType: true,
                        documentNumber: true,
                        email: true,
                        phone: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        fullName: true,
                        documentType: true,
                        documentNumber: true,
                        email: true,
                        phone: true,
                    },
                },
                saleBusiness: {
                    select: {
                        business: {
                            select: {
                                id: true,
                                codeBusiness: true,
                                product: {
                                    select: {
                                        name: true,
                                        thumbnail: true,
                                    },
                                },
                                stock: true,
                                price: true,
                                priceOffer: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });
        return sale ? sale : null;
    }
    /**
     * Consulta para buscar una venta existente por su codigo
     * @param id Identificador para ubicar la venta buscada
     * @returns Retorna la venta buscada o un valor nulo
     */
    async getSaleByCode(codeSale) {
        const sale = await this.prisma.sale.findUnique({
            where: {
                codeSale,
                status: 'Habilitado',
            },
            select: {
                id: true,
                codeSale: true,
                deliveryType: true,
                agency: true,
                region: true,
                province: true,
                district: true,
                direction: true,
                reference: true,
                bills: true,
                guide: true,
                totalAmount: true,
                statusSale: true,
                status: true,
                admin: {
                    select: {
                        id: true,
                        fullName: true,
                        documentType: true,
                        documentNumber: true,
                        email: true,
                        phone: true,
                    },
                },
                client: {
                    select: {
                        id: true,
                        fullName: true,
                        documentType: true,
                        documentNumber: true,
                        email: true,
                        phone: true,
                    },
                },
                saleBusiness: {
                    select: {
                        business: {
                            select: {
                                id: true,
                                codeBusiness: true,
                                product: {
                                    select: {
                                        name: true,
                                        thumbnail: true,
                                    },
                                },
                                stock: true,
                                price: true,
                                priceOffer: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });
        return sale ? sale : null;
    }
    /**
     * Consulta para crear una nueva venta
     * @param sale Conjunto de datos que necesita la consulta
     * @returns Retorna la venta creada
     */
    async postSale(sale) {
        return await this.prisma.$transaction(async (prisma) => {
            // Crear la venta
            const newSale = await prisma.sale.create({
                data: {
                    codeSale: sale.codeSale,
                    deliveryType: sale.deliveryType,
                    agency: sale.agency,
                    region: sale.region,
                    province: sale.province,
                    district: sale.district,
                    direction: sale.direction,
                    reference: sale.reference,
                    bills: sale.bills,
                    guide: sale.guide,
                    totalAmount: sale.totalAmount,
                    adminId: sale.adminId || 0,
                    clientId: sale.clientId || 0,
                    saleBusiness: {
                        create: sale.business &&
                            sale.business.map((business) => ({
                                businessId: business.businessId,
                                quantity: business.quantity,
                                createdAt: new Date()
                            })),
                    },
                    createdAt: new Date()
                },
                select: {
                    id: true,
                    codeSale: true,
                    deliveryType: true,
                    agency: true,
                    region: true,
                    province: true,
                    district: true,
                    direction: true,
                    reference: true,
                    bills: true,
                    guide: true,
                    totalAmount: true,
                    statusSale: true,
                    status: true,
                    admin: {
                        select: {
                            id: true,
                            fullName: true,
                            documentType: true,
                            documentNumber: true,
                            email: true,
                            phone: true,
                        },
                    },
                    client: {
                        select: {
                            id: true,
                            fullName: true,
                            documentType: true,
                            documentNumber: true,
                            email: true,
                            phone: true,
                        },
                    },
                    saleBusiness: {
                        select: {
                            business: {
                                select: {
                                    id: true,
                                    codeBusiness: true,
                                    product: {
                                        select: {
                                            name: true,
                                            thumbnail: true,
                                        },
                                    },
                                    stock: true,
                                    price: true,
                                    priceOffer: true,
                                },
                            },
                            quantity: true,
                        },
                    },
                },
            });
            // Actualizar el stock de cada negocio
            if (sale.business && sale.business.length > 0) {
                for (const business of sale.business) {
                    await prisma.business.update({
                        where: { id: business.businessId },
                        data: {
                            stock: {
                                decrement: business.quantity,
                            },
                        },
                    });
                }
            }
            return newSale;
        });
    }
    /**
     * Consulta para actualizar el estado de una venta
     * @param id Identificador de la venta buscada
     * @param statusSale Nuevo estado de la venta
     * @returns Retorna un mensaje confirmando la actualizacion
     */
    async putSaleStatus(id, statusSale) {
        await this.prisma.sale.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                statusSale,
            },
        });
        return 'Estado de venta actualizado exitosamente!';
    }
    /* * AREA NEGOCIO * */
    /**
     * Consulta para validar si existe un negocio activo
     * @param id Identificador para ubicar el negocio buscado
     * @returns Retorna un booleano dependiendo si encuentre o no el negocio
     */
    async getBusinessByStatus(id) {
        const business = await this.prisma.business.findUnique({
            where: {
                id,
                statusBusiness: 'Activo',
            },
        });
        return business ? true : false;
    }
    async getBusinessByStock(businessId, quantity) {
        // Buscar el negocio por ID y obtener su stock actual
        const business = await this.prisma.business.findUnique({
            where: { id: businessId },
            select: { stock: true },
        });
        // Si el negocio no se encuentra, puedes manejarlo como prefieras
        if (!business) {
            throw new Error('Negocio no encontrado');
        }
        // Comparar la cantidad solicitada con el stock disponible
        return quantity <= business.stock;
    }
}
exports.default = SaleService;
