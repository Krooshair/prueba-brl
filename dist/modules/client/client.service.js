"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class ClientService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Consulta para obtener todos los clientes existentes
     * @returns Retorna la lista de clientes existentes
     */
    async getClient() {
        const client = await this.prisma.client.findMany({
            where: {
                status: 'Habilitado',
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
            },
        });
        return client;
    }
    /**
     * Consulta para buscar un cliente existente por su id
     * @param id Identificador para ubicar al cliente buscado
     * @returns Retorna al cliente buscado o un valor nulo
     */
    async getClientById(id) {
        const client = await this.prisma.client.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
        });
        return client ? client : null;
    }
    /**
     * Consulta para buscar un cliente existente por su numero de documento
     * @param documentNumber Numero de documento para ubicar al cliente buscado
     * @returns Retorna al cliente buscado o un valor nulo
     */
    async getClientByDocumentNumber(documentNumber) {
        const client = await this.prisma.client.findFirst({
            where: {
                documentNumber,
                status: 'Habilitado',
            },
        });
        return client ? client : null;
    }
    /**
     * Consulta para crear un nuevo cliente
     * @param client Conjunto de datos que necesita la consulta
     * @returns Retorna al cliente creado
     */
    async postClient(client) {
        const newClient = await this.prisma.client.create({
            data: {
                fullName: client.fullName,
                documentType: client.documentType,
                documentNumber: client.documentNumber,
                email: client.email,
                phone: client.phone,
                createdAt: new Date()
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
        return newClient;
    }
    /**
     * Consulta para actualizar datos de un cliente existente
     * @param id Identificador para ubicar al cliente buscado
     * @param client Conjunto de datos que necesita la consulta
     * @returns Retorna al cliente actualizado
     */
    async putClient(id, client) {
        const updClient = await this.prisma.client.update({
            where: {
                id,
                status: 'Habilitado'
            },
            data: {
                fullName: client.fullName,
                documentType: client.documentType,
                documentNumber: client.documentNumber,
                email: client.email,
                phone: client.phone
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
        return updClient;
    }
    /**
     * Consulta para borrar un cliente existente
     * @param id Identificador para ubicar al cliente buscado
     * @returns Retorna un mensaje confirmando la eliminacion
     */
    async deleteClient(id) {
        await this.prisma.client.update({
            where: {
                id,
                status: 'Habilitado'
            },
            data: {
                status: 'Deshabilitado'
            }
        });
        return 'Cliente eliminado exitosamente!';
    }
}
exports.default = ClientService;
