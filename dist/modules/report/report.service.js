"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
// import calculateIncomeStatus from '../../shared/utils/calculateTotal';
class ReportService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async getReportGlobal(year) {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Setiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const report = {
            Enero: null,
            Febrero: null,
            Marzo: null,
            Abril: null,
            Mayo: null,
            Junio: null,
            Julio: null,
            Agosto: null,
            Setiembre: null,
            Octubre: null,
            Noviembre: null,
            Diciembre: null,
        };
        for (let i = 0; i < 12; i++) {
            const sale = await this.prisma.sale.findMany({
                where: {
                    createdAt: {
                        gte: new Date(year, i, 1),
                        lt: new Date(year, i + 1, 1),
                    },
                },
                select: {
                    totalAmount: true,
                    id: true,
                    codeSale: true,
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
                },
            });
            if (sale.length > 0) {
                const totalSold = sale.reduce((sum, venta) => sum.add(venta.totalAmount), new library_1.Decimal(0));
                report[months[i]] = {
                    totalSold,
                    sale,
                };
            }
        }
        return report;
    }
    async getReportByAdmin(year, adminId) {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Setiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const report = {
            Enero: null,
            Febrero: null,
            Marzo: null,
            Abril: null,
            Mayo: null,
            Junio: null,
            Julio: null,
            Agosto: null,
            Setiembre: null,
            Octubre: null,
            Noviembre: null,
            Diciembre: null,
        };
        for (let i = 0; i < 12; i++) {
            const sale = await this.prisma.sale.findMany({
                where: {
                    createdAt: {
                        gte: new Date(year, i, 1),
                        lt: new Date(year, i + 1, 1),
                    },
                    adminId,
                },
                select: {
                    totalAmount: true,
                },
            });
            if (sale.length > 0) {
                const totalSold = sale.reduce((sum, venta) => sum.add(venta.totalAmount), new library_1.Decimal(0));
                report[months[i]] = {
                    totalSold,
                };
            }
        }
        return report;
    }
    async getReportByClient(year, clientId) {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Setiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const report = {
            Enero: null,
            Febrero: null,
            Marzo: null,
            Abril: null,
            Mayo: null,
            Junio: null,
            Julio: null,
            Agosto: null,
            Setiembre: null,
            Octubre: null,
            Noviembre: null,
            Diciembre: null,
        };
        for (let i = 0; i < 12; i++) {
            const sale = await this.prisma.sale.findMany({
                where: {
                    createdAt: {
                        gte: new Date(year, i, 1),
                        lt: new Date(year, i + 1, 1),
                    },
                    clientId,
                },
                select: {
                    totalAmount: true,
                },
            });
            if (sale.length > 0) {
                const totalSold = sale.reduce((sum, venta) => sum.add(venta.totalAmount), new library_1.Decimal(0));
                report[months[i]] = {
                    totalSold,
                };
            }
        }
        return report;
    }
    async getReportByBusiness(year, businessId) {
        const months = [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Setiembre',
            'Octubre',
            'Noviembre',
            'Diciembre',
        ];
        const report = {
            Enero: null,
            Febrero: null,
            Marzo: null,
            Abril: null,
            Mayo: null,
            Junio: null,
            Julio: null,
            Agosto: null,
            Setiembre: null,
            Octubre: null,
            Noviembre: null,
            Diciembre: null,
        };
        for (let i = 0; i < 12; i++) {
            const sales = await this.prisma.sale.findMany({
                where: {
                    createdAt: {
                        gte: new Date(year, i, 1),
                        lt: new Date(year, i + 1, 1),
                    },
                    saleBusiness: {
                        some: {
                            businessId,
                        },
                    },
                },
                select: {
                    id: true,
                    codeSale: true,
                    totalAmount: true,
                    saleBusiness: {
                        select: {
                            quantity: true,
                            business: {
                                select: {
                                    product: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                    investment: true,
                                    initialStock: true,
                                    stock: true,
                                    statusBusiness: true,
                                },
                            },
                        },
                    },
                },
            });
            if (sales.length > 0) {
                const totalSold = sales.reduce((sum, sale) => sum.add(sale.totalAmount), new library_1.Decimal(0));
                const totalInvested = sales.reduce((sum, sale) => {
                    const investment = sale.saleBusiness.reduce((subSum, sb) => {
                        return subSum.add(sb.business.investment.mul(sb.business.initialStock));
                    }, new library_1.Decimal(0));
                    return sum.add(investment);
                }, new library_1.Decimal(0));
                const incomeStatus = totalSold.greaterThan(totalInvested)
                    ? 'Ganancia'
                    : totalSold.equals(totalInvested)
                        ? 'Recuperado'
                        : 'Perdida';
                report[months[i]] = {
                    totalSold,
                    totalInvested,
                    incomeStatus,
                    sale: sales,
                };
            }
        }
        return report;
    }
    async getReportForDownload(year, month, clientId, adminId, businessId) {
        const whereClause = {
            createdAt: {
                gte: new Date(year, month ? month - 1 : 0, 1),
                lt: new Date(year, month ? month : 12, 1),
            },
        };
        if (clientId) {
            whereClause.clientId = clientId;
        }
        if (adminId) {
            whereClause.adminId = adminId;
        }
        if (businessId) {
            whereClause.saleBusiness = {
                some: {
                    businessId,
                },
            };
        }
        const sales = await this.prisma.sale.findMany({
            where: whereClause,
            select: {
                id: true,
                codeSale: true,
                totalAmount: true,
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
                                        id: true,
                                        name: true,
                                    },
                                },
                                initialStock: true,
                                stock: true,
                                statusBusiness: true,
                            },
                        },
                        quantity: true,
                    },
                },
            },
        });
        const report = {
            totalSold: new library_1.Decimal(0),
            sale: [],
        };
        sales.forEach((sale) => {
            report.totalSold = report.totalSold.add(sale.totalAmount);
            const saleEntry = {
                id: sale.id,
                codeSale: sale.codeSale,
                totalAmount: sale.totalAmount,
                admin: sale.admin,
                client: sale.client,
                saleBusiness: sale.saleBusiness.map((sb) => ({
                    business: sb.business,
                    quantity: sb.quantity,
                })),
            };
            report.sale?.push(saleEntry);
        });
        return report;
    }
    async getReportForDownloadBusiness(businessId) {
        const sales = await this.prisma.sale.findMany({
            where: {
                saleBusiness: {
                    some: {
                        businessId,
                    },
                },
            },
            select: {
                id: true,
                codeSale: true,
                totalAmount: true,
                saleBusiness: {
                    select: {
                        quantity: true,
                        business: {
                            select: {
                                product: {
                                    select: {
                                        id: true,
                                        name: true,
                                    },
                                },
                                investment: true,
                                initialStock: true,
                                stock: true,
                                statusBusiness: true,
                            },
                        },
                    },
                },
            },
        });
        const totalSold = sales.reduce((sum, sale) => sum.add(sale.totalAmount), new library_1.Decimal(0));
        const totalInvested = sales.reduce((sum, sale) => {
            const investment = sale.saleBusiness.reduce((subSum, sb) => {
                return subSum.add(sb.business.investment.mul(sb.business.initialStock));
            }, new library_1.Decimal(0));
            return sum.add(investment);
        }, new library_1.Decimal(0));
        const incomeStatus = totalSold.greaterThan(totalInvested)
            ? 'Ganancia'
            : totalSold.equals(totalInvested)
                ? 'Recuperado'
                : 'Perdida';
        const report = {
            totalSold,
            totalInvested,
            incomeStatus,
            sale: sales,
        };
        return report;
    }
    /* * AREA ADMIN * */
    async getAdminById(id) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id,
                statusUser: 'Activo',
                status: 'Habilitado',
            },
            select: {
                fullName: true,
            },
        });
        return admin ? admin : null;
    }
    /* * AREA CLIENT * */
    async getClientById(id) {
        const client = await this.prisma.client.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
            select: {
                fullName: true,
            },
        });
        return client ? client : null;
    }
    /* * AREA BUSINESS * */
    async getBusinessById(id) {
        const business = await this.prisma.business.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
            select: {
                codeBusiness: true,
            },
        });
        return business ? business : null;
    }
}
exports.default = ReportService;
