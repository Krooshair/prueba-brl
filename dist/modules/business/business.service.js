"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class BusinessService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Consulta para obtener todos los negocios existentes
     * @returns Retorna la lista de negocios existentes
     */
    async getBusiness() {
        const business = await this.prisma.business.findMany({
            where: {
                status: 'Habilitado',
            },
            select: {
                id: true,
                codeBusiness: true,
                investment: true,
                price: true,
                priceOffer: true,
                stock: true,
                quantityDrawer: true,
                statusBusiness: true,
            },
        });
        return business;
    }
    /**
     * Consultar para listar los negocios existentes con estado Activo y En cola de un producto
     * @param productId Identificador del producto para ubicar los negocios buscados
     * @returns Retorna la lista de negocios buscados
     */
    async getBusinessByProductId(productId) {
        const business = await this.prisma.business.findMany({
            where: {
                productId,
                statusBusiness: {
                    in: ['Activo', 'En_cola'],
                },
                status: 'Habilitado',
            },
            orderBy: {
                position: 'asc',
            },
        });
        return business;
    }
    /**
     * Consultar para buscar un negocio existente por su id
     * @param id Identificador para ubicar el negocio buscado
     * @returns Retorna el negocio encontrado o un valor nulo
     */
    async getBusinessById(id) {
        const business = await this.prisma.business.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
            select: {
                id: true,
                codeBusiness: true,
                investment: true,
                price: true,
                priceOffer: true,
                stock: true,
                quantityDrawer: true,
                barCode: true,
                bill: true,
                statusBusiness: true,
                product: {
                    select: {
                        name: true,
                        thumbnail: true,
                    },
                },
                supplier: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
        return business ? business : null;
    }
    /**
     * Consulta para buscar un negocio existente por su codigo
     * @param codeBusiness Codigo para ubicar el negocio buscado
     * @returns Retorna el negocio encontrado o un valor nulo
     */
    async getBusinessByCode(codeBusiness) {
        const business = await this.prisma.business.findUnique({
            where: {
                codeBusiness,
                status: 'Habilitado',
            },
            select: {
                id: true,
                codeBusiness: true,
                investment: true,
                price: true,
                priceOffer: true,
                stock: true,
                quantityDrawer: true,
                barCode: true,
                bill: true,
                statusBusiness: true,
                product: {
                    select: {
                        name: true,
                        thumbnail: true,
                    },
                },
                supplier: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
                createdAt: true,
                updatedAt: true,
            },
        });
        return business ? business : null;
    }
    /**
     * Consulta para crear un nuevo negocio
     * @param business Cojunto de datos que necesita la consulta
     * @returns Retorna el negocio creado
     */
    async postBusiness(business) {
        const lastBusiness = await this.prisma.business.findFirst({
            where: {
                productId: business.productId,
            },
            orderBy: {
                position: 'desc',
            },
            select: {
                position: true,
            },
        });
        const newPosition = lastBusiness ? lastBusiness.position + 1 : 1;
        const statusBusiness = newPosition > 1 ? 'En_cola' : 'Activo';
        const newBusiness = await this.prisma.business.create({
            data: {
                position: newPosition,
                codeBusiness: business.codeBusiness,
                investment: business.investment,
                price: business.price,
                priceOffer: business.priceOffer,
                initialStock: business.stock,
                stock: business.stock,
                quantityDrawer: business.quantityDrawer,
                barCode: business.barCode || '',
                bill: business.bill,
                statusBusiness,
                productId: business.productId || 0,
                supplierId: business.supplierId || 0,
            },
            select: {
                id: true,
                position: true,
                codeBusiness: true,
                investment: true,
                price: true,
                priceOffer: true,
                stock: true,
                quantityDrawer: true,
                barCode: true,
                bill: true,
                statusBusiness: true,
                product: {
                    select: {
                        name: true,
                        thumbnail: true,
                    },
                },
                supplier: {
                    select: {
                        id: true,
                        fullName: true,
                    },
                },
            },
        });
        return newBusiness;
    }
    /**
     * Consulta para actualizar un comprobante
     * @param id Identificador para ubicar negocio buscado
     * @param bill Url del comprobante
     * @returns Retorna el negocio actualizado
     */
    async putBill(id, bill) {
        const business = await this.prisma.business.update({
            where: {
                id,
            },
            data: {
                bill,
            },
        });
        return business;
    }
    /**
     * Consulta para actualizar el stock de un negocio por su id
     * @param id Identificador para ubicar el negocio existente
     * @param stock Stock del negocio a actualizar
     * @returns Retorna el negocio actualizado
     */
    async patchStockById(id, stock) {
        const business = await this.prisma.business.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                stock,
            },
        });
        return business;
    }
    /**
     * Consulta para incrementear el stock de un negocio por codigo
     * @param codeBusiness Codigo para ubicar el negocio existente
     * @param stock Stock del negocio a incrementear
     * @returns Retorna el negocio actualizado
     */
    async patchStockByCode(codeBusiness, stock) {
        const business = await this.prisma.business.update({
            where: {
                codeBusiness,
                status: 'Habilitado',
            },
            data: {
                stock: {
                    increment: stock,
                },
            },
        });
        return business;
    }
    /**
     * Consulta para modificar las posiciones de una lista de negocios
     * @param positions Lista de las nuevas posiciones
     * @returns Retorna un mensaje confirmando la actualizacion
     */
    async patchPosition(positions) {
        await this.prisma.$transaction(async (prisma) => {
            // Obtener todos los negocios implicados en la actualización
            const businessIds = positions.map(({ id }) => id);
            const businesses = await prisma.business.findMany({
                where: { id: { in: businessIds } },
                select: { id: true, statusBusiness: true },
            });
            // Crear un mapa para acceder rápidamente al estado de cada negocio
            const businessMap = new Map(businesses.map((b) => [b.id, b.statusBusiness]));
            // Actualizar las posiciones y los estados
            const updatePromises = positions.map(({ id, position }) => {
                const currentStatus = businessMap.get(id);
                let newStatus = currentStatus;
                // Determinar el nuevo estado
                if (position === 1 && currentStatus !== 'Culminado') {
                    newStatus = 'Activo';
                }
                else if (currentStatus !== 'Culminado') {
                    newStatus = 'En_cola';
                }
                return prisma.business.update({
                    where: { id },
                    data: { position, statusBusiness: newStatus },
                });
            });
            await Promise.all(updatePromises);
        });
        return 'Posiciones modificadas exitosamente!';
    }
    /**
     * Consulta para culminar un negocio
     * @param id Identificador para ubicar el negocio buscado
     * @returns Retorna un mensaje confirmando la culminancion
     */
    async deleteBusiness(id) {
        await this.prisma.$transaction(async (prisma) => {
            // Encuentra el negocio que se desea culminar
            const business = await prisma.business.findUnique({
                where: { id },
            });
            if (!business ||
                !['Activo', 'En_cola'].includes(business.statusBusiness)) {
                throw new Error('Negocio no encontrado o no está en un estado válido');
            }
            // Actualiza el negocio actual a "Culminado" y cambia su posición a -1
            await prisma.business.update({
                where: { id },
                data: {
                    statusBusiness: 'Culminado',
                    position: -1,
                },
            });
            // Encuentra todos los negocios restantes ordenados por posición ascendente
            const remainingBusinesses = await prisma.business.findMany({
                where: {
                    productId: business.productId,
                    statusBusiness: {
                        in: ['Activo', 'En_cola'],
                    },
                    status: 'Habilitado',
                },
                orderBy: {
                    position: 'asc',
                },
            });
            // Bandera para asegurarse de que solo un negocio se marque como 'Activo'
            let hasActive = false;
            // Actualiza las posiciones de los negocios restantes secuencialmente
            for (let i = 0; i < remainingBusinesses.length; i++) {
                const newStatus = !hasActive
                    ? 'Activo'
                    : 'En_cola';
                hasActive = hasActive || newStatus === 'Activo';
                await prisma.business.update({
                    where: { id: remainingBusinesses[i].id },
                    data: {
                        position: i + 1,
                        statusBusiness: newStatus, // El primer negocio en la lista se pone en 'Activo'
                    },
                });
            }
        });
        return 'Negocio culminado!';
    }
    /* * AREA PRODUCTO * */
    /**
     * Consulta para validar si existe un producto por su id
     * @param id Identificador para ubicar el producto buscado
     * @returns Retorna un booleano dependiendo si encuentra o no al producto
     */
    async getProductById(id) {
        const product = await this.prisma.product.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
        });
        return product ? true : false;
    }
    /* * AREA PROVEEDOR * */
    /**
     * Consulta para validar si existe un proveedor por su id
     * @param id Identificador para ubicar el proveedor buscado
     * @returns Retorna un booleano dependiendo si encuentra o no al proveedor
     */
    async getSupplierById(id) {
        const product = await this.prisma.supplier.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
        });
        return product ? true : false;
    }
}
exports.default = BusinessService;
