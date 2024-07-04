"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
class AdminService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    /**
     * Consulta para obtener todos los administradores existentes
     * @returns Retorna la lista de administradores existentes
     */
    async getAdmin() {
        const admin = await this.prisma.admin.findMany({
            where: {
                status: 'Habilitado',
                roleAdmin: {
                    in: ['Empleado', 'Administrador']
                }
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                username: true,
                isVerify: true,
                statusUser: true,
                status: true,
                roleAdmin: true,
            },
        });
        return admin;
    }
    /**
     * Consulta para buscar un administrador existente por su id
     * @param id Identificador para ubicar al administrador buscado
     * @returns Retorna al administrador buscado o un valor nulo
     */
    async getAdminById(id) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                username: true,
                password: true,
                isVerify: true,
                statusUser: true,
                status: true,
                roleAdmin: true,
                secretKey: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!admin)
            return null;
        return admin;
    }
    /**
     * Consulta para validar si existe un administrador registrado con el correo recibido
     * @param email Correo para validar existencia del administrador
     * @returns Returna un booleano dependiendo si encuentra o no un administrador
     */
    async getAdminByEmail(email) {
        const admin = await this.prisma.admin.findFirst({
            where: {
                email,
                status: 'Habilitado',
            },
        });
        return admin ? admin : null;
    }
    /**
     * Consulta para validar si existe un gerente registrado
     * @returns Retorna un booleano dependiendo si encuentra o no un gerente
     */
    async getAdminOwner() {
        const admin = await this.prisma.admin.findFirst({
            where: {
                roleAdmin: 'Gerente'
            }
        });
        return admin ? true : false;
    }
    /**
     * Consulta para buscar un administrador registrado con el nombre de usuario recibido
     * @param username Nombre de usuario para validar existencia del administrador
     * @returns Returna al administrador buscado o un valor nulo
     */
    async getAdminByUsername(username) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                username,
            },
        });
        return admin ? admin : null;
    }
    /**
     * Consulta para obtener el hash password de un administrador existente
     * @param id Identificador para ubicar al administrador buscado
     * @returns Retorna la constraseña del administrador buscado o un valor nulo
     */
    async getAdminHashPassword(id) {
        const admin = await this.prisma.admin.findUnique({
            where: {
                id,
                status: 'Habilitado',
            },
            select: {
                password: true,
            },
        });
        if (!admin)
            return null;
        return admin.password;
    }
    /**
     * Consulta para crear un nuevo administrador
     * @param admin Conjunto de datos que necesita la consulta
     * @returns Retorna al administrador creado o un valor nulo
     */
    async postAdmin(admin) {
        if (!admin.password)
            return null;
        const secretKey = (0, crypto_1.randomBytes)(64).toString('hex');
        const newAdmin = await this.prisma.admin.create({
            data: {
                fullName: admin.fullName,
                documentType: admin.documentType,
                documentNumber: admin.documentNumber,
                email: admin.email,
                phone: admin.phone,
                username: admin.username,
                password: admin.password,
                roleAdmin: admin.roleAdmin,
                secretKey,
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                username: true,
                isVerify: true,
                statusUser: true,
                roleAdmin: true,
                secretKey: true
            },
        });
        return newAdmin;
    }
    /**
     * Consulta para actualizar datos de un administrador existente
     * @param id Identificador para ubicar al administrador buscado
     * @param admin Conjunto de datos que necesita la consulta
     * @returns Retorna al administrador actualizado
     */
    async putAdmin(id, admin) {
        const updAdmin = await this.prisma.admin.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                fullName: admin.fullName,
                documentType: admin.documentType,
                documentNumber: admin.documentNumber,
                email: admin.email,
                phone: admin.phone,
                roleAdmin: admin.roleAdmin,
            },
            select: {
                id: true,
                fullName: true,
                documentType: true,
                documentNumber: true,
                email: true,
                phone: true,
                username: true,
                isVerify: true,
                statusUser: true,
                roleAdmin: true,
            },
        });
        return updAdmin;
    }
    /**
     * Consulta para modificar el estado de un administrador existente
     * @param id Identificador para ubicar al administrador buscado
     * @param statusUser Estado que necesita la consulta
     * @returns Retorna un mensaje confirmando la modificación
     */
    async putStatusAdmin(id, statusUser) {
        await this.prisma.admin.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                statusUser,
            },
        });
        return 'Estado modificado exitosamente!';
    }
    /**
     * Consulta para modificar la verificacion de un administrador
     * @param id Identificador para ubicar al administrador buscado
     * @returns Retorna un mensaje confirmando la modificación
     */
    async putVerifyAdmin(id) {
        await this.prisma.admin.update({
            where: {
                id,
                statusUser: 'Activo',
                status: 'Habilitado'
            },
            data: {
                isVerify: true
            }
        });
        return 'Cuenta verificada!';
    }
    /**
     * Consulta para modificar la contraseña de un administrador existente
     * @param id Identificador para ubicar al administrador buscado
     * @param password Contraseña que necesita la consulta
     * @returns Retorna un mensaje confirmando la modificación
     */
    async putPasswordAdmin(id, password) {
        await this.prisma.admin.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                password,
            },
        });
        return 'Contraseña modificada exitosamente!';
    }
    /**
     * Consulta para borrar un administrador existente
     * @param id Identificador para ubicar al administrador buscado
     * @returns Retorna un mensaje confirmando la eliminacion
     */
    async deleteAdmin(id) {
        await this.prisma.admin.update({
            where: {
                id,
                status: 'Habilitado',
            },
            data: {
                status: 'Deshabilitado',
            },
        });
        return 'Administrador eliminado exitosamente!';
    }
}
exports.default = AdminService;
